# 庭 更新Workflow

## 制作ログ追加

1. ChatGPTとの会話からログ生成プロンプトを実行
2. TypeScriptファイルを作成
3. data/logs/index.ts に追加
4. npm run build で確認

## 画像追加

1. スマホからGoogle Driveへアップロード
2. PCへダウンロード
3. 画像をlogs/[slug]/imgへ配置
4. パスをmediaへ追加

## 開発環境

npm run dev

## 型チェック

npx tsc --noEmit