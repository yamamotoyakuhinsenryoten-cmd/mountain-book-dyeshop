import type { DevelopmentLog } from "../types";

export const mbdyeshop002 = {
  slug: "mb-dyeshop-002",
  type: "development",
  createdAt: "2026-09-02",
  title: "ログ生成を自動化する",
  category: "Webサイト構築",

  media: [],

  purpose: `Webサイトのログ作成を自動化したい。
現在は、
1. 自作アプリでプロンプト生成
2. ChatGPTに貼り付け
3. 回答をコピー
4. TSファイルを作成して貼り付け
という流れになっている。`,

  policy: `ChatGPTの操作にはPlaywrightを使う。
座標で操作するRPAではChatGPTのデザイン変更によって動かなくなる可能性があるため、今回はTSで扱えるPlaywrightを試す。`,

  steps: [
    "PlaywrightでChatGPTを操作できるか確認する",
    "Next.jsのAPIからPlaywrightを実行する",
    "ChatGPTの回答をTSファイルとして保存する",
    "Chromeの自動起動を実装する",
  ],

  execution: [
    {
      title: "PlaywrightでChatGPTを操作できるか確認する",
      body: `test-playwright.jsを作成し、ChatGPTを開いてテキスト入力できるか確認した。`,
    },
    {
      title: "Next.jsのAPIからPlaywrightを実行する",
      body: `Next.jsのAPIからPlaywrightを実行し、ChatGPTへの入力から回答取得までできるようにした。`,
    },
    {
      title: "ChatGPTの回答をTSファイルとして保存する",
      body: `ChatGPTから取得した回答をTSファイルとして保存できるようにした。
保存先：
data/logs/{type}/{slug}.ts`,
    },
    {
      title: "Chromeの自動起動を実装する",
      body: `専用Chromeが起動していなければ、APIからChromeを起動するようにした。`,
    },
  ],

  result: `ログ生成画面からChatGPTを実行して、TSファイルまで自動生成できるようになった。
PlaywrightからChatGPTを操作できることを確認できた。
また、回答の完了判定には「回答を停止」ボタンを利用できた。`,

  next: ["data/logs/index.tsへの追加を自動化する", "メディア追加を自動化する"],

  source: {
    title: "生成元チャット",
    service: "ChatGPT",
    url: "https://chatgpt.com/g/g-p-6a44366d52488191bd77c3428f4029ba/c/6a89d907-c81c-83ee-ae91-eb7d55755f11",
  },

  related: [],
} satisfies DevelopmentLog;
