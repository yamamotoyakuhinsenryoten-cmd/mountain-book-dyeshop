const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials/mountain-book-dyeshop-8fa756f38c7c.json",
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

async function main() {
  const drive = google.drive({
    version: "v3",
    auth,
  });

  // コマンドライン引数からslugを取得する
  const slug = process.argv[2];

  if (!slug) {
    console.log("slugを指定してください");
    console.log("例: node scripts/download-log-media.js baisen-012");
    process.exit(1);
  }

  // Google Driveからslugと同じ名前のフォルダを探す
  const response = await drive.files.list({
    q: `trashed = false and mimeType = 'application/vnd.google-apps.folder' and name = '${slug}'`,
    fields: "files(id, name)",
    pageSize: 100,
  });

  const folders = response.data.files;

  if (folders.length === 0) {
    console.log(`フォルダ '${slug}' が見つかりません`);
    process.exit(1);
  }

  if (folders.length > 1) {
    console.log(`フォルダ '${slug}' が複数見つかりました`);

    folders.forEach((folder) => {
      console.log(`${folder.name} (${folder.id})`);
    });

    process.exit(1);
  }

  const logFolder = folders[0];

  console.log(`ログフォルダ: ${logFolder.name} (${logFolder.id})`);

  // ログフォルダ内のファイル一覧を取得する
  const fileResponse = await drive.files.list({
    q: `'${logFolder.id}' in parents and trashed = false`,
    fields: "files(id, name, mimeType, size)",
    orderBy: "name",
  });

  const files = fileResponse.data.files;

  if (files.length === 0) {
    console.log("ファイルがありません");
    return;
  }

  // ローカルの保存先を作成する
  const imgDir = path.join("public", "logs", slug, "img");
  const vidDir = path.join("public", "logs", slug, "vid");

  fs.mkdirSync(imgDir, { recursive: true });
  fs.mkdirSync(vidDir, { recursive: true });

  // ファイルをダウンロードする
  for (const file of files) {
    let outputDir;

    if (file.mimeType.startsWith("image/")) {
      outputDir = imgDir;
    } else if (file.mimeType.startsWith("video/")) {
      outputDir = vidDir;
    } else {
      console.log(`スキップ: ${file.name} (${file.mimeType})`);
      continue;
    }

    const outputPath = path.join(outputDir, file.name);

    // すでに存在するファイルはスキップ
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

    await new Promise((resolve, reject) => {
      response.data.pipe(dest).on("finish", resolve).on("error", reject);
    });
  }

  console.log("\nダウンロード完了");
}

main().catch((error) => {
  console.error("エラー:", error.message);
  process.exit(1);
});
