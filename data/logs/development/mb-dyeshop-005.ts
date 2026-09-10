import type { DevelopmentLog } from "../types";

export const mbdyeshop005 = {
  slug: "mb-dyeshop-005",
  type: "development",
  createdAt: "2026-09-11",
  title: "Instagram投稿の自動化",
  category: "Webサイト構築",
  media: [],
  purpose: `Webサイトでログを追加した際に、Instagramにも投稿できるようにする。
Instagramへの投稿画像・テキストは、Webサイトのログデータを使用する。`,
  policy: `以下の2段階で実装する。
1. テスト用TSからInstagram APIを呼び出し、投稿できることを確認する
2. 自作アプリからInstagram APIを呼び出し、ログ追加時に投稿できるようにする
投稿対象はslugから取得した画像・テキストとする。`,
  steps: [
    "Instagram APIの疎通を確認する",
    "単一画像・複数画像の投稿をテストする",
    "カルーセル投稿のキャプション仕様を確認する",
    "Instagram APIを使った投稿処理の現在の状態を確認する",
  ],
  execution: [
    {
      title: "Instagram APIの疎通を確認する",
      body: `Meta for DevelopersでInstagram APIを利用するためのアプリを作成した。
Instagramアカウントをテスターとして追加し、アクセストークンを取得した。
TypeScriptからAPIを呼び出してアカウント情報を取得し、Instagram APIを使用できることを確認した。`,
    },
    {
      title: "単一画像・複数画像の投稿をテストする",
      body: `サイト上の公開画像を使って単一画像投稿をテストした。
複数画像を使ったカルーセル投稿もテストした。`,
    },
    {
      title: "カルーセル投稿のキャプション仕様を確認する",
      body: `カルーセルの各画像に個別のcaptionを設定してAPIから投稿するテストを行った。
個別キャプションはAPIでは利用できず、Instagramアプリからのみ可能であることを確認した。
複数画像＋単一キャプションでの投稿は確認できた。`,
    },
    {
      title: "Instagram APIを使った投稿処理の現在の状態を確認する",
      body: `Instagram APIを使った投稿処理の動作確認まで完了した。
現時点ではテスト用TSから固定の画像・テキストを投稿している。`,
    },
  ],
  result: `Instagram APIを使った投稿処理の動作確認まで完了した。
単一画像投稿とカルーセル投稿ができることを確認した。
カルーセルでは複数画像＋単一キャプションで投稿できる一方、各画像への個別キャプションはAPIでは利用できず、Instagramアプリからのみ可能であることが分かった。
現時点ではテスト用TSから固定の画像・テキストを投稿している。`,
  next: [
    "ログ生成画面に「Instagramに投稿」ボタンを追加する",
    "APIからカルーセル投稿を実行する",
    "slugから対象ログの画像を取得する",
    "slugから対象ログのテキストを取得する",
    "実際のログを使った投稿に切り替える",
    "運用しながら投稿内容、キャプション、ハッシュタグなどを調整する",
  ],
  source: {
    title: "SNS自動配信",
    url: "https://chatgpt.com/g/g-p-6a44366d52488191bd77c3428f4029ba-dev/c/6a989365-d920-83ee-a3e1-97e6e113cf21",
  },
  related: [],
} satisfies DevelopmentLog;
