import type { DevelopmentLog } from "../types";

export const mbdyeshop006 = {
  slug: "mb-dyeshop-006",
  type: "development",
  createdAt: "2026-09-11",
  title: "Vercel Deployment Storage対策 | 画像軽量化とFunctionサイズ調査",
  category: "Webサイト構築",

  media: [],

  purpose: `VercelからDeployment Storageの使用量が100%になった通知を受けたため、デプロイ時に保存される画像・動画やServerless Functionの容量を確認し、使用量を削減する。
まずは既存のログ画像をWeb表示に適したサイズへ軽量化し、今後の画像追加時にも大きな画像をそのままデプロイしない構成を検討する。`,

  policy: `元画像はGoogle Driveに保存しているため、プロジェクト内ではWeb表示に必要なサイズまで画像を軽量化する。
画像は最大辺2400px、JPEG品質85、mozjpegを使用し、PC・スマートフォンでの表示品質を維持しながら容量を削減する。
既存画像の一括処理では元画像を直接置き換えるのではなく、まず別ディレクトリへ圧縮後の画像を出力して確認する。
外部ストレージへの移行は急がず、まず現在の構成で削減できる容量を確認する。`,

  steps: [
    "VercelのDeployment Artifactを確認して容量の大きいファイルを調査する",
    "既存画像をWeb表示向けにリサイズ・圧縮する方法をテストする",
    "画像の向きに関する問題を確認して圧縮処理を修正する",
    "既存のログ画像を一括でリサイズ・圧縮する",
    "圧縮後の画像容量を確認する",
    "Deployment Artifactを再確認してFunctionサイズの問題を調査する",
    "Googleから画像をダウンロードした後にリサイズ・圧縮する方針を検討する",
  ],

  execution: [
    {
      title: "VercelのDeployment Artifactを確認して容量の大きいファイルを調査する",
      body: `VercelのDeployment Artifactを確認し、ログ画像や動画がstaticAssetsとしてデプロイに含まれていることを確認した。
画像は1〜7MB程度のものが多く、動画には20MBを超えるものもあった。

一方で、serverlessFunctionsでは/api/add-log-mediaが約294MBと非常に大きくなっていることも確認した。`,
    },
    {
      title: "既存画像をWeb表示向けにリサイズ・圧縮する方法をテストする",
      body: `7.29MB、5712x4284pxの画像をテストし、最大辺2400px、JPEG品質85、mozjpegを使用して約1.25MBまで圧縮した。
実際に画像を確認し、PC・スマートフォンでの表示には問題なさそうだと判断した。

既存画像を直接置き換える処理ではWindows上でファイルの削除・rename時にEPERMやEBUSYが発生したため、元画像を残したまま別ディレクトリへ出力する方式に変更した。`,
    },
    {
      title: "画像の向きに関する問題を確認して圧縮処理を修正する",
      body: `別ディレクトリへの一括圧縮を行ったところ、Google Driveからダウンロードした画像などで一部の向きが変わることを確認した。
EXIFのOrientationを考慮するため、Sharpの処理にrotate()を追加してからresize()するように変更した。`,
    },
    {
      title: "既存のログ画像を一括でリサイズ・圧縮する",
      body: `public/logs内のJPEG画像を対象に、最大辺2400px、JPEG品質85、mozjpeg、rotate()を使用した一括処理を実行した。
元画像を削除・上書きせず、public/logs-compressedへ同じディレクトリ構成で圧縮後の画像を出力した。
309枚を処理し、スキップは0枚だった。`,
    },
    {
      title: "圧縮後の画像容量を確認する",
      body: `309枚の画像について容量を比較した結果、
- 変換前: 1.013GB
- 変換後: 0.168GB
- 削減率: 83.4%

となり、画像容量を大幅に削減できた。`,
    },
    {
      title: "Deployment Artifactを再確認してFunctionサイズの問題を調査する",
      body: `画像圧縮後のVercel Deployment Artifactを確認したところ、staticAssetsの画像サイズは大幅に小さくなっていた。
一方で/api/add-log-mediaはcompressed約294MB、uncompressed約308MBとなっており、画像とは別にFunction自体が大きくなっていることが分かった。
現時点では原因を断定せず、route.ts内のimportやfs・pathによるファイル参照などを確認して原因を調査することにした。`,
    },
    {
      title: "Googleから画像をダウンロードした後にリサイズ・圧縮する方針を検討する",
      body: `既存画像を後から一括圧縮するだけでなく、今後Googleから画像をダウンロードした時点でリサイズ・圧縮する処理を入れる方針を検討した。
Googleからダウンロードした元画像をそのままプロジェクトへ入れるのではなく、今回確認したリサイズ・圧縮処理をダウンロード後の工程に組み込む方向とした。`,
    },
  ],

  result: `既存のログ画像309枚を最大辺2400px、JPEG品質85、mozjpeg、rotate()で処理し、1.013GBから0.168GBまで削減できた。削減率は83.4%だった。
画像については、元画像を残したまま圧縮後の画像を別ディレクトリへ出力することで、Windowsでのファイルロックによる上書き問題を避けながら安全に確認できた。

また、VercelのDeployment Artifactを再確認したことで、画像だけでなく/api/add-log-mediaのServerless Functionが約294MBと大きくなっていることが分かった。
そのため、今後は画像軽量化とは別に/api/add-log-mediaのデプロイサイズ肥大化の原因を調査する必要がある。
画像については、今後Googleからダウンロードした後にリサイズ・圧縮する処理を組み込み、最初からWeb向けのサイズで保存する方向になった。`,

  next: [
    "public/logs-compressedの画像を確認する",
    "問題がなければ圧縮後の画像をpublic/logsへ反映する",
    "不要になったテスト用画像を整理する",
    "Gitの変更内容を確認してコミットする",
    "VercelへデプロイしてDeployment Storage使用量を確認する",
    "/api/add-log-mediaのroute.tsを確認してFunctionサイズが約294MBになっている原因を調査する",
    "Googleから画像をダウンロードした後にリサイズ・圧縮する処理を組み込む",
    "将来的に画像・動画が増えた場合はCloudflare R2などの外部ストレージへの移行を検討する",
  ],

  source: {
    title: "Vercel容量確認案内",
    url: "https://chatgpt.com/g/g-p-6a44366d52488191bd77c3428f4029ba/c/6a9de212-afe8-83ee-b6b3-d7e487589141",
  },

  related: [],
} satisfies DevelopmentLog;