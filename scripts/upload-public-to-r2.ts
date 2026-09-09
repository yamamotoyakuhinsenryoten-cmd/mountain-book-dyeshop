import fs from "fs";
import path from "path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { lookup } from "mime-types";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local" });

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_BUCKET_NAME;

if (!accountId || !accessKeyId || !secretAccessKey || !bucketName) {
  throw new Error(
    "R2_ACCOUNT_ID / R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY / R2_BUCKET_NAME が設定されていません",
  );
}

const client = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const publicDir = path.resolve(process.cwd(), "public");

async function uploadDirectory(dir: string) {
  const entries = await fs.promises.readdir(dir, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await uploadDirectory(fullPath);
      continue;
    }

    const relativePath = path
      .relative(publicDir, fullPath)
      .split(path.sep)
      .join("/");

    const contentType = lookup(fullPath) || "application/octet-stream";

    console.log(`Uploading: ${relativePath}`);

    await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: relativePath,
        Body: await fs.promises.readFile(fullPath),
        ContentType: contentType,
      }),
    );
  }
}

async function main() {
  console.log("=== Upload public/ to R2 ===");
  console.log(`Bucket: ${bucketName}`);
  console.log(`Source: ${publicDir}`);
  console.log("");

  await uploadDirectory(publicDir);

  console.log("");
  console.log("=== Upload complete ===");
}

main().catch((error) => {
  console.error("Upload failed:");
  console.error(error);
  process.exit(1);
});
