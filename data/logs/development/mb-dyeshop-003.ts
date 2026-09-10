import type { DevelopmentLog } from "../types";

export const mbdyeshop003 = {
  slug: "mb-dyeshop-003",
  type: "development",
  createdAt: "2026-09-04",
  title: "ログ生成時のindex.ts自動更新",
  category: "Webサイト構築",

  media: [],

  purpose: `前回、アプリからslugとChatGPTのURLを入力してボタンを押下することで、WebサイトのログTSファイルを自動生成できるようにした。
今回は、index.tsへの対象ログのimportとlogs配列への追加も自動化し、ログ生成の自動化をもう一歩進める。`,

  policy: `ログTSファイルの生成後にindex.tsを自動更新する。
生成したログのexport名を利用してimportを追加し、logs配列にも対象ログを追加する。
既に記載されているログは重複して追加しないようにする。`,

  steps: [
    "data/logs/index.tsの現在の構造を確認する",
    "ログTSファイルの保存後にindex.tsを更新する処理を追加する",
    "生成したログのimportとlogs配列への追加を自動化する",
    "重複追加を防止する",
    "import追加時の不要な空行を修正する",
  ],

  execution: [
    {
      title: "data/logs/index.tsの現在の構造を確認する",
      body: `data/logs/index.tsの現在の構造を確認した。`,
    },
    {
      title: "ログTSファイルの保存後にindex.tsを更新する処理を追加する",
      body: `ログTSファイルを保存した後に、index.tsを更新する処理をroute.tsへ追加した。`,
    },
    {
      title: "生成したログのimportとlogs配列への追加を自動化する",
      body: `生成したログのexport名を取得し、index.tsにimportを追加するようにした。
logs配列にも作成したログを追加するようにした。`,
    },
    {
      title: "重複追加を防止する",
      body: `既に記載されているログがある場合は、importやlogs配列へ重複して追加しないようにした。`,
    },
    {
      title: "import追加時の不要な空行を修正する",
      body: `import追加時に不要な空行が入ったため、空行が入らないように修正した。`,
    },
  ],

  result: `index.tsへの対象ログのimportとlogs配列への追加を自動で行えるようになった。
これまでログを追加するたびにindex.tsを手動で編集する必要があったが、その作業をしなくてよくなった。`,

  next: ["運用してみて、さらに改善できる点がないか確認する"],

  source: {
    title: "Index自動追加",
    url: "https://chatgpt.com/g/g-p-6a44366d52488191bd77c3428f4029ba/c/6a976f99-a470-83e8-ba44-9cb8bfebf32a",
  },

  related: [],
} satisfies DevelopmentLog;
