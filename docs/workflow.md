# 更新ワークフロー

## 制作ログ追加

1. 専用Chromeを起動
   & "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir="C:\chrome-playwright"
2. /seeds/generate-log でログを生成する
3. data/logs/{type}/{slug}.ts が自動生成される
4. data/logs/index.ts に追加
5. npm run build で確認

## メディア追加

1. スマホからGoogle Driveへアップロード
2. スクリプト実行 node scripts/download-log-media.js [slug]
3. スクリプト実行 node scripts/generate-log-media.js [slug]
4. パスをmediaへ追加

## 開発環境

npm run dev

## 型チェック

npx tsc --noEmit
