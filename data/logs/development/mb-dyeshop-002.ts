import type { DevelopmentLog } from "../types";

export const mbdyeshop002 = {
  slug: "mb-dyeshop-002",
  type: "development",
  createdAt: "2026-09-02",
  title: "ログ生成を自動化する",
  category: "Webサイト構築",

  media: [],

  markdown: `
# ログ生成を自動化する

## やりたいこと

Webサイトのログ作成を自動化したい

今は

1. 自作アプリでプロンプト生成
2. ChatGPTに貼り付け
3. 回答をコピー
4. TSファイルを作成して貼り付け

という流れ

## 試したこと

Playwrightを使うことにした。
座標で操作するRPAだとChatGPTのデザイン変更で動かなくなりそう。
今回はTSで書けるPlaywrightを試す。

1. test-playwright.js

ChatGPTを開いてテキスト入力できるか確認

2. Next.jsのAPIからPlaywrightを実行

ChatGPTへの入力・回答取得までできた

3. 回答をTSファイルとして保存

data/logs/{type}/{slug}.ts に保存できた

4. Chromeの自動起動

専用Chromeが起動していなければAPIから起動するようにした

## 結果

ログ生成画面からChatGPTを実行して、TSファイルまで自動生成できるようになった。

## 分かったこと

PlaywrightからChatGPTを操作できた。
回答の完了判定には「回答を停止」ボタンを使えた。

## 次に試すこと

data/logs/index.tsへの追加を自動化したい。
メディア追加も自動化したい。
`,
  source: {
    title: "Webサイト構築#8",
    url: "https://chatgpt.com/g/g-p-6a44366d52488191bd77c3428f4029ba/c/6a89d907-c81c-83ee-ae91-eb7d55755f11",
  },

  related: [],
} satisfies DevelopmentLog;
