import type { DevelopmentLog } from "../types";

export const mbdyeshop004 = {
  slug: "mb-dyeshop-004",
  type: "development",
  createdAt: "2026-09-04",
  title: "メディア追加処理のアプリ化",
  category: "Webサイト構築",

  media: [],
  markdown: `
# メディア追加処理のアプリ化

## やりたいこと
これまではJSスクリプトを手動で実行して、Googleドライブから画像・動画をダウンロードし、サイトへの配置とmediaデータの生成を行っていた。
この処理をアプリからボタンを押すだけで実行できるようにして、メディア追加時の手作業を減らしたい。

## 試したこと

- 既存のメディア処理をlibへ切り出し、アプリとスクリプトから共通で使えるようにした
- メディア追加用のAPIを作成し、ダウンロードからログTSの更新までを自動化した
- ログ生成画面に「メディアを追加」ボタンを追加した
- 既存のJSスクリプトもTypeScript化した
- TypeScript化の際に発生したクリップボード周りの問題を、PowerShellのSet-Clipboardを使うことで解決した

## 結果

アプリから「メディアを追加」ボタンを押すだけで、Googleドライブから画像・動画を取得し、サイトへの配置、media配列の生成、対象ログTSへの反映までを自動で行えるようになった。
これまでターミナルでスクリプトを実行して、生成されたデータを手動でログへ貼り付けていた作業を省略できるようになった。

## 分かったこと


## 次に試すこと

実際に運用してみて、さらに改善できる点がないか確認する。
`,
  source: {
    title: "Media自動化",
    url: "https://chatgpt.com/g/g-p-6a44366d52488191bd77c3428f4029ba/c/6a976fcc-3440-83e8-a4ac-415a379e4d68",
  },

  related: [],
} satisfies DevelopmentLog;
