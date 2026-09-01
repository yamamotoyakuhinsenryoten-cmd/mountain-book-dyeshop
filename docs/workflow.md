# 更新ワークフロー

## 制作ログ追加

1. http://localhost:3000/seeds/generate-log でログを生成する
2. data/logs/{type}/{slug}.ts が自動生成される
3. data/logs/index.ts に追加
4. npm run build で確認

## メディア追加

1. スマホからGoogle Driveへアップロード
2. スクリプト実行 node scripts/download-log-media.js [slug]
3. スクリプト実行 node scripts/generate-log-media.js [slug]
4. パスをmediaへ追加

## 開発環境

npm run dev

## 型チェック

npx tsc --noEmit
