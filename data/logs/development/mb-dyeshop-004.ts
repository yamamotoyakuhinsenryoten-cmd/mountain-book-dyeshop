import type { DevelopmentLog } from "../types";

export const mbdyeshop004 = {
  slug: "mb-dyeshop-004",
  type: "development",
  createdAt: "2026-09-04",
  title: "メディア追加処理のアプリ化",
  category: "Webサイト構築",

  media: [],

  purpose: `これまではJSスクリプトを手動で実行して、Googleドライブから画像・動画をダウンロードし、サイトへの配置とmediaデータの生成を行っていた。
この処理をアプリからボタンを押すだけで実行できるようにして、メディア追加時の手作業を減らす。`,

  policy: `既存のメディア処理をlibへ切り出し、アプリとスクリプトから共通で利用できるようにする。
メディア追加用のAPIを作成し、GoogleドライブからのダウンロードからログTSへの反映までを一連の処理として自動化する。
既存のJSスクリプトもTypeScript化する。`,

  steps: [
    "既存のメディア処理をlibへ切り出す",
    "メディア追加用のAPIを作成する",
    "ログ生成画面にメディア追加ボタンを追加する",
    "既存のJSスクリプトをTypeScript化する",
    "TypeScript化によるクリップボード周りの問題を解決する",
  ],

  execution: [
    {
      title: "既存のメディア処理をlibへ切り出す",
      body: `既存のメディア処理をlibへ切り出し、アプリとスクリプトから共通で使えるようにした。`,
    },
    {
      title: "メディア追加用のAPIを作成する",
      body: `メディア追加用のAPIを作成し、Googleドライブからのダウンロードからサイトへの配置、mediaデータの生成、ログTSの更新までを自動化した。`,
    },
    {
      title: "ログ生成画面にメディア追加ボタンを追加する",
      body: `ログ生成画面に「メディアを追加」ボタンを追加し、アプリからメディア追加処理を実行できるようにした。`,
    },
    {
      title: "既存のJSスクリプトをTypeScript化する",
      body: `既存のJSスクリプトもTypeScript化し、共通処理をlibから利用できる構成にした。`,
    },
    {
      title: "TypeScript化によるクリップボード周りの問題を解決する",
      body: `TypeScript化の際にクリップボード周りの問題が発生したため、PowerShellのSet-Clipboardを使うことで解決した。`,
    },
  ],

  result: `アプリから「メディアを追加」ボタンを押すだけで、Googleドライブから画像・動画を取得し、サイトへの配置、media配列の生成、対象ログTSへの反映までを自動で行えるようになった。
これまでターミナルでスクリプトを実行して、生成されたデータを手動でログへ貼り付けていた作業を省略できるようになった。`,

  next: ["実際に運用してみて、さらに改善できる点がないか確認する"],

  source: {
    title: "生成元チャット",
    service: "ChatGPT",
    url: "https://chatgpt.com/g/g-p-6a44366d52488191bd77c3428f4029ba/c/6a976fcc-3440-83e8-a4ac-415a379e4d68",
  },

  related: [],
} satisfies DevelopmentLog;
