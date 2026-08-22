import type { DevelopmentLog } from "../types";

export const mbdyeshop001 = {
  slug: "mb-dyeshop-001",
  type: "development",
  createdAt: "2026-08-22",
  title: "Google Driveからログメディアを取り込む仕組みを作る",
  category: "Webサイト構築",

  media: [],

  markdown: `
# Google Driveからログメディアを取り込む仕組みを作る

## やりたいこと

スマホからGoogle Driveにアップロードした画像を、
Webサイトのプロジェクトへ配置する作業を簡単にしたい。

これまでは、

1. スマホからGoogle Driveへアップロード
2. PCへダウンロード
3. プロジェクト内にログ用のフォルダを作成して画像を配置
4. \`node scripts/generate-log-media.js [slug]\` を実行
5. パスを\`media\`へ追加

という流れだった。

## 試したこと

Google Drive APIとサービスアカウントを使って、
slugを指定すると対応するGoogle Driveフォルダを探し、
プロジェクト内へ画像・動画を配置するスクリプトを作った。

Google Driveではログをカテゴリごとにフォルダ分けしているが、
カテゴリを指定せずslugから対象フォルダを探す方式にした。

GitHub Copilotの補完機能も試した。

## 結果

\`node scripts/download-log-media.js [slug]\` を実行すると、
Google Driveから対象ログのメディアを取得して、
プロジェクト内の\`img\`と\`vid\`へ配置できるようになった。

既存の\`generate-log-media.js\`とは分けて、
それぞれ別の役割として残した。

メディア追加のワークフローも、

1. スマホからGoogle Driveへアップロード
2. \`node scripts/download-log-media.js [slug]\` を実行
3. \`node scripts/generate-log-media.js [slug]\` を実行
4. パスを\`media\`へ追加

という形になった。

## 分かったこと

Google Driveのフォルダ構成とプロジェクト側の構成を
無理に合わせなくても、slugを共通のキーにすれば扱える。

また、Copilotはコードをゼロから作るより、
既存コードを参考に補完させるような使い方のほうが向いていそう。

## 次に試すこと

まずは実際のログ追加で使ってみる。

必要になったら、画像変換や2つのスクリプトの統合を検討する。
`,
  source: {
    title: "Webサイト構築 part6",
    url: "https://chatgpt.com/g/g-p-6a44366d52488191bd77c3428f4029ba/c/6a88c641-b80c-83e8-b710-89a9bd7d0e1c",
  },

  related: [],
} satisfies DevelopmentLog;
