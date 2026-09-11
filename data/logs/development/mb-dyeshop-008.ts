import type { DevelopmentLog } from "../types";

export const mbdyeshop008 = {
  slug: "mb-dyeshop-008",
  type: "development",
  createdAt: "2026-09-11",
  title: "メディアのR2移行 | Vercel Deployment Storage対策",
  category: "Webサイト構築",

  media: [],

  purpose: `VercelのDeployment Storage使用量を削減するため、Webサイトで使用している画像・動画などのメディア資源をCloudflare R2へ移行する。
これまでpublic/logsに保存していたメディアをR2へ移し、VercelのDeploymentにメディアファイルを含めない構成に変更する。`,

  policy: `既存のメディアを一度に変更せず、まずR2への登録と直接参照を小さく検証してから、既存メディアの移行とアプリ側の変更を進める。
既存のログTSではメディアのパスのみを保持し、R2の公開URLは共通処理で生成することで、個々のログTSを変更せずに参照先を切り替えられる構成とする。
また、既存のpublic/logsとR2でディレクトリ構成を維持し、移行後も従来の/logs/...というパス形式を利用できるようにする。`,

  steps: [
    "R2を準備し、画像を手動登録して直接参照を確認する",
    "既存ログの画像1枚だけR2参照へ変更して表示を確認する",
    "publicのメディア資源をR2へコピーする",
    "ログ側のメディア参照をR2へ切り替える",
    "Google Driveから取得するメディアをR2へ直接アップロードする",
    "Vercelへデプロイして本番環境で動作を確認する",
    "public/logsをVercelのデプロイ対象から除外する",
  ],

  execution: [
    {
      title: "R2を準備し、画像を手動登録して直接参照を確認する",
      body: `Cloudflare R2にmb-dyeshop-mediaバケットを作成し、R2へ書き込むためのAPI Tokenを準備した。
R2へ画像を1枚手動で登録し、公開URLをブラウザから直接指定して画像が表示できることを確認した。`,
    },
    {
      title: "既存ログの画像1枚だけR2参照へ変更して表示を確認する",
      body: `既存ログの画像を1枚だけR2上の画像へ変更し、ログページから正常に表示できることを確認した。
この確認により、R2を実際のメディア参照先として利用できることを確認した。`,
    },
    {
      title: "publicのメディア資源をR2へコピーする",
      body: `R2への移行を進めるため、public配下のメディア資源をR2へアップロードするスクリプトを作成した。
public/logs配下の画像・動画320ファイルをR2へコピーし、既存のディレクトリ構成を維持してlogs/foo/...として保存した。
ローカルとR2のファイルを比較し、既存の320ファイルがR2に存在することを確認した。`,
    },
    {
      title: "ログ側のメディア参照をR2へ切り替える",
      body: `R2の公開URLをNEXT_PUBLIC_MEDIA_BASE_URLで管理し、getMediaUrl()で公開URLと既存のメディアパスを結合する処理を追加した。
個々のログTSにR2のドメインを記述するのではなく、メディアを表示するDetail側でURLを生成する構成に変更した。
これにより、既存の/logs/...というパスを維持したまま、共通処理だけでR2を参照できるようにした。`,
    },
    {
      title: "Google Driveから取得するメディアをR2へ直接アップロードする",
      body: `Google Driveから取得したメディアをpublic/logsへ保存する処理を変更し、R2へ直接アップロードする構成にした。
画像はHEIC/HEIFをJPEGへ変換し、最大2400pxにリサイズしたうえでJPEG品質85で圧縮してR2へアップロードする。
動画は取得したデータをそのままR2へアップロードする。
R2へのアップロード処理はlib/r2.tsへ共通化した。`,
    },
    {
      title: "Vercelへデプロイして本番環境で動作を確認する",
      body: `VercelにR2関連の環境変数を設定してデプロイを行った。
初回はR2の環境変数がVercelに設定されていなかったためビルドに失敗したが、必要な環境変数を設定した後にデプロイが成功した。
本番のログページを確認し、R2の公開URLを参照した画像が正常に表示されることを確認した。
また、/api/add-log-mediaを実行し、Google Driveから取得したメディアがR2へアップロードされ、ログTSのmediaが更新されることを確認した。`,
    },
    {
      title: "public/logsをVercelのデプロイ対象から除外する",
      body: `R2への移行と本番環境での表示確認が完了したため、public/logsのローカルファイルをすぐに削除するのではなく、まずGitの管理・デプロイ対象から除外する方針にした。
public/logsを.gitignoreへ追加し、既存ファイルをGitの管理対象から外すことで、ローカルにはファイルを残したままVercelへのデプロイ対象から外す構成にした。`,
    },
  ],

  result: `public/logsに保存していた画像・動画320ファイルをR2へ移行し、ログページからR2上のメディアを参照できる構成になった。
R2の公開URLは共通処理で生成するため、個々のログTSにR2のドメインを記述する必要がなく、メディア参照先の変更箇所をDetail側に集約できた。
Google Driveから新しく取得するメディアについても、public/logsへ保存せず、変換・リサイズ後にR2へ直接アップロードする構成へ変更できた。
Vercel本番環境でもR2上の画像が正常に表示されることを確認した。
また、R2へ移行したメディアをVercelへ残しておく必要がないため、まずpublic/logsをデプロイ対象から外し、ローカルファイルはInstagram側のR2対応が一区切りついた後に削除する方針になった。`,

  next: [
    "Instagram投稿処理のメディア参照先をR2へ変更する",
    "Instagram関連処理のR2対応が完了したらpublic/logsのローカルメディアを削除する",
    "public/logsのローカル保存が不要になった後、不要なoutputFileTracingExcludes設定を削除する",
    "R2移行によって不要になったローカル保存処理やスクリプトを整理する",
    "public内に残っているメディア資源についてR2への移行対象を確認する",
  ],

  source: {
    title: "生成元チャット",
    service: "ChatGPT",
    url: "https://chatgpt.com/g/g-p-6a44366d52488191bd77c3428f4029ba-dev/c/6a9e5106-3414-83ee-bcad-d6986aa542a9",
  },

  related: [],
} satisfies DevelopmentLog;