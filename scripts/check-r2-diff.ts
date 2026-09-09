import dotenv from "dotenv";
dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local" });

import fs from "fs";
import path from "path";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_BUCKET_NAME;

if (!accountId || !accessKeyId || !secretAccessKey || !bucketName) {
  throw new Error("R2の環境変数が設定されていません");
}

const client = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const localDir = path.resolve(process.cwd(), "public", "logs");

async function getLocalFiles() {
  const files: string[] = [];

  async function walk(dir: string) {
    const entries = await fs.promises.readdir(dir, {
      withFileTypes: true,
    });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
      } else {
        const relativePath = path
          .relative(localDir, fullPath)
          .split(path.sep)
          .join("/");

        files.push(`logs/${relativePath}`);
      }
    }
  }

  await walk(localDir);

  return files;
}

async function getR2Files() {
  const files: string[] = [];
  let continuationToken: string | undefined;

  do {
    const result = await client.send(
      new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: "logs/",
        ContinuationToken: continuationToken,
      }),
    );

    for (const object of result.Contents ?? []) {
      if (object.Key) {
        files.push(object.Key);
      }
    }

    continuationToken = result.NextContinuationToken;
  } while (continuationToken);

  return files;
}

async function main() {
  console.log("Checking logs/...");
  console.log("");

  const [localFiles, r2Files] = await Promise.all([
    getLocalFiles(),
    getR2Files(),
  ]);

  const localSet = new Set(localFiles);
  const r2Set = new Set(r2Files);

  const onlyInLocal = localFiles.filter((file) => !r2Set.has(file));
  const onlyInR2 = r2Files.filter((file) => !localSet.has(file));

  console.log(`Local : ${localFiles.length}`);
  console.log(`R2    : ${r2Files.length}`);
  console.log("");

  console.log(`--- Local only (${onlyInLocal.length}) ---`);

  for (const file of onlyInLocal) {
    console.log(file);
  }

  console.log("");

  console.log(`--- R2 only (${onlyInR2.length}) ---`);

  for (const file of onlyInR2) {
    console.log(file);
  }

  console.log("");

  if (onlyInLocal.length === 0 && onlyInR2.length === 0) {
    console.log("✓ Local and R2 are identical.");
  } else {
    console.log("⚠ Difference detected.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
