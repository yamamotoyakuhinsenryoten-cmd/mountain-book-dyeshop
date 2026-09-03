import type { DevelopmentLog } from "../types";

export const mbdyeshop003 = {
  slug: "mb-dyeshop-003",
  type: "development",
  createdAt: "2026-09-04",
  title: "ログ生成時のindex.ts自動更新",
  category: "Webサイト構築",

  media: [],

  markdown: `
# ログ生成時のindex.ts自動更新

## やりたいこと

前回、アプリからslugとChatGPTのURLを入力してボタンを押下することで、WebサイトのログTSファイルを自動生成できた。
今回は、index.tsにも対象のログのimportやlogs配列への追加し、自動化をもう1歩すすめる。

## 試したこと

- data/logs/index.tsの現在の構造を確認した。
- ログTSファイルを保存した後に、index.tsを更新する処理をroute.tsへ追加した。
- 生成したログのexport名を取得し、index.tsにimportを追加するようにした。
- logs配列にも作成したログを追加するようにした。
- 既に記載されているログがある場合は重複して追加しないようにした。
- import追加時に不要な空行が入ったため、空行が入らないように修正した。

## 結果

index.tsにも対象のログのimportやlogs配列への追加を自動で行えるようになった。
これまでログを追加するたびにindex.tsを手動で編集する必要があったが、その作業をしなくてよくなった。

## 分かったこと

特になし。

## 次に試すこと

運用してみて、さらに改善できる点がないか確認する。
`,

  source: {
    title: "Index自動追加",
    url: "https://chatgpt.com/g/g-p-6a44366d52488191bd77c3428f4029ba/c/6a976f99-a470-83e8-ba44-9cb8bfebf32a",
  },

  related: [],
} satisfies DevelopmentLog;
