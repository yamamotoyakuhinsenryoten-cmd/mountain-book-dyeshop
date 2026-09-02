import { google } from "googleapis";
import fs from "fs";
import path from "path";

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials/mountain-book-dyeshop-8fa756f38c7c.json",
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

export async function downloadLogMedia(slug: string) {
  if (!slug) {
    throw new Error("slugを指定してください");
  }

  const drive = google.drive({
    version: "v3",
    auth,
  });

  const response = await drive.files.list({
    q: `trashed = false and mimeType = 'application/vnd.google-apps.folder' and name = '${slug}'`,
    fields: "files(id, name)",
    pageSize: 100,
  });

  const folders = response.data.files;

  if (!folders || folders.length === 0) {
    throw new Error(`フォルダ '${slug}' が見つかりません`);
  }

  if (folders.length > 1) {
    const folderList = folders
      .map(
        (folder) =>
          `${folder.name ?? "(名前なし)"} (${folder.id ?? "(IDなし)"})`,
      )
      .join(", ");

    throw new Error(`フォルダ '${slug}' が複数見つかりました: ${folderList}`);
  }

  const logFolder = folders[0];

  if (!logFolder.id || !logFolder.name) {
    throw new Error("ログフォルダの情報を取得できませんでした");
  }

  console.log(`ログフォルダ: ${logFolder.name} (${logFolder.id})`);

  const fileResponse = await drive.files.list({
    q: `'${logFolder.id}' in parents and trashed = false`,
    fields: "files(id, name, mimeType, size)",
    orderBy: "name",
  });

  const files = fileResponse.data.files;

  if (!files || files.length === 0) {
    console.log("ファイルがありません");
    return;
  }

  const imgDir = path.join("public", "logs", slug, "img");
  const vidDir = path.join("public", "logs", slug, "vid");

  fs.mkdirSync(imgDir, { recursive: true });
  fs.mkdirSync(vidDir, { recursive: true });

  for (const file of files) {
    if (!file.id || !file.name || !file.mimeType) {
      console.log("スキップ: ファイル情報が不足しています");
      continue;
    }

    let outputDir: string;

    if (file.mimeType.startsWith("image/")) {
      outputDir = imgDir;
    } else if (file.mimeType.startsWith("video/")) {
      outputDir = vidDir;
    } else {
      console.log(`スキップ: ${file.name} (${file.mimeType})`);
      continue;
    }

    const outputPath = path.join(outputDir, file.name);

    if (fs.existsSync(outputPath)) {
      console.log(`スキップ（既存）: ${file.name}`);
      continue;
    }

    console.log(`ダウンロード: ${file.name}`);

    const response = await drive.files.get(
      {
        fileId: file.id,
        alt: "media",
      },
      {
        responseType: "stream",
      },
    );

    const dest = fs.createWriteStream(outputPath);

    await new Promise<void>((resolve, reject) => {
      response.data.pipe(dest).on("finish", resolve).on("error", reject);
    });
  }

  console.log("\nダウンロード完了");
}
