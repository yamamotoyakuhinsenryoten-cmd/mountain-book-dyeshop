import type { DevelopmentLog } from "../types";

export const mbdyeshop001 = {
  slug: "mb-dyeshop-001",
  type: "development",
  createdAt: "2026-08-22",

  title: "サイト用画像・動画のダウンロード＆配置の自動化",
  category: "Webサイト構築",

  purpose: `スマホからGoogle Driveにアップロードした画像・動画を、Webサイトのプロジェクトへ配置する作業を簡単にする。
これまでは、スマホからGoogle Driveへアップロードした後、PCへのダウンロード、ログ用フォルダへの配置、スクリプトの実行、mediaへのパス追加を手動で行っていた。
このメディア追加の作業を自動化し、ログ作成時の手間を減らす。`,

  policy: `Google Drive APIとサービスアカウントを利用し、slugを共通のキーとしてGoogle Drive上の対象フォルダを特定する。
Google Drive側ではログをカテゴリごとにフォルダ分けしているが、カテゴリを指定せずslugから対象フォルダを探す方式にする。
既存のgenerate-log-media.jsとは役割を分け、ダウンロードと配置の処理は別スクリプトとして実装する。`,

  steps: [
    "Google Drive APIを使ってslugから対象フォルダを探す",
    "Google Driveから画像・動画をプロジェクトへ配置する",
    "既存のメディア生成処理と組み合わせてワークフローを整理する",
  ],

  execution: [
    {
      title: "Google Drive APIを使ってslugから対象フォルダを探す",
      body: `Google Drive APIとサービスアカウントを使い、slugを指定すると対応するGoogle Driveフォルダを探せるようにした。
Google Driveではログをカテゴリごとにフォルダ分けしているが、カテゴリを指定せずslugから対象フォルダを探す方式にした。`,
    },
    {
      title: "Google Driveから画像・動画をプロジェクトへ配置する",
      body: `Google Driveから対象ログのメディアを取得し、プロジェクト内のログフォルダに配置するスクリプトを作った。
\`node scripts/download-log-media.js [slug]\` を実行すると、画像を\`img\`、動画を\`vid\`へ配置できるようになった。`,
    },
    {
      title: "既存のメディア生成処理と組み合わせてワークフローを整理する",
      body: `既存の\`generate-log-media.js\`とは分け、それぞれ別の役割として残した。

メディア追加の流れを、

1. スマホからGoogle Driveへアップロード
2. \`node scripts/download-log-media.js [slug]\` を実行
3. \`node scripts/generate-log-media.js [slug]\` を実行
4. パスを\`media\`へ追加

という形にした。
また、GitHub Copilotの補完機能も試した。`,
    },
  ],

  result: `Google Driveから対象ログのメディアを取得し、プロジェクト内の\`img\`と\`vid\`へ配置できるようになった。
Google Driveのフォルダ構成とプロジェクト側の構成を無理に合わせなくても、slugを共通のキーにすれば扱えることが分かった。

また、Copilotはコードをゼロから作るより、既存コードを参考に補完させるような使い方のほうが向いていそう。
メディア追加の手順をスクリプト化できたことで、ログ追加時の作業を簡略化できた。`,

  next: [
    "実際のログ追加で使ってみる",
    "必要になったら画像変換を追加する",
    "必要になったら2つのスクリプトの統合を検討する",
  ],

  media: [],

  source: {
    title: "Webサイト構築 part6",
    url: "https://chatgpt.com/g/g-p-6a44366d52488191bd77c3428f4029ba/c/6a88c641-b80c-83e8-b710-89a9bd7d0e1c",
  },

  related: [],
} satisfies DevelopmentLog;
