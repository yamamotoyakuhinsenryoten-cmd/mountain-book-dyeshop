const { google } = require("googleapis");

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
    console.log("例: node test-drive.js baisen-012");
    process.exit(1);
  }

  // Google Driveからslugと同じ名前のフォルダを探す
  const response = await drive.files.list({
    q: `trashed = false and mimeType = 'application/vnd.google-apps.folder' and name = '${slug}'`,
    fields: "files(id, name)",
    pageSize: 100,
  });

  const folders = response.data.files;

  // フォルダが見つからない場合
  if (folders.length === 0) {
    console.log(`フォルダ '${slug}' が見つかりません`);
    process.exit(1);
  }

  // 同じslugのフォルダが複数ある場合
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

  console.log("\nファイル一覧:");

  if (files.length === 0) {
    console.log("ファイルがありません");
    return;
  }

  files.forEach((file) => {
    console.log(`${file.name} | ${file.mimeType} | ${file.id}`);
  });
}

main().catch((error) => {
  console.error("エラー:", error.message);
  process.exit(1);
});
