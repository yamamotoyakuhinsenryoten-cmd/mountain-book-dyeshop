import type { DevelopmentLog } from "../types";

export const mbdyeshop007 = {
  slug: "mb-dyeshop-007",
  type: "development",
  createdAt: "2026-09-11",
  title: "Vercelデプロイサイズ調査 | add-log-mediaのFunction肥大化対策",
  category: "Webサイト構築",

  media: [],

  purpose: `VercelのDeployment Artifactを確認したところ、/api/add-log-mediaのServerless Functionが約294MBと非常に大きくなっていたため、Functionに何が含まれているのかを調査する。

  public/logsにはサイトで使用する画像・動画が含まれているため、メディア自体を削除するのではなく、add-log-mediaのFunctionだけが不要なメディアを抱え込まない構成にできるか確認する。`,

  policy: `まず現在の構成でなぜFunctionが大きくなっているのかをFile Tracingから確認する。

  public/logsは通常のページからも参照しているため、サイト全体から除外するのではなく、add-log-mediaのFunctionから不要なファイルだけをFile Tracingの対象外にする方向で検証する。
将来的なCloudflare R2などの外部ストレージへの移行は、現在の原因と構成を理解したうえで別途検討する。`,

  steps: [
    "add-log-mediaのFunctionに含まれているファイルをFile Tracingで確認する",
    "public/logsがFunctionサイズ肥大化の原因になっていることを確認する",
    "public/logsをadd-log-mediaのFile Tracing対象から除外する設定を試す",
    "ビルド後のFile Tracing結果を確認する",
    "Vercelへの一時デプロイを試してFunctionサイズを確認する",
    "add-log-mediaを実行してメディア追加処理への影響を確認する",
  ],

  execution: [
    {
      title:
        "add-log-mediaのFunctionに含まれているファイルをFile Tracingで確認する",
      body: `add-log-mediaのroute.js.nft.jsonを確認し、Functionに含まれているファイルを調査した。
data/logs以下のログTSファイルだけでなく、public/logs以下の画像・動画が大量にFile Tracingの対象になっていることを確認した。
また、google-auth-libraryなどのNode.js依存モジュールもFunctionに含まれていた。`,
    },
    {
      title:
        "public/logsがFunctionサイズ肥大化の原因になっていることを確認する",
      body: `public/logsの容量を確認したところ、約281MBだった。
File Tracingの一覧にもpublic/logs配下の画像・動画が大量に含まれていたため、約294MBあるadd-log-mediaのFunctionサイズの大部分がpublic/logsによるものだと判断した。`,
    },
    {
      title:
        "public/logsをadd-log-mediaのFile Tracing対象から除外する設定を試す",
      body: `Next.jsのFile Tracing設定を使い、add-log-mediaのFunctionからpublic/logsを除外する構成を試した。
public/logs自体は通常のページからも参照しているため、public/logsそのものをデプロイ対象から削除するのではなく、Functionへの同梱だけを避ける方向で検証した。`,
    },
    {
      title: "ビルド後のFile Tracing結果を確認する",
      body: `設定変更後にビルドを実行し、ビルド自体は正常に完了した。
生成されたadd-log-mediaのroute.js.nft.jsonを確認したところ、public/logsを検索しても該当ファイルが表示されなくなった。
これにより、add-log-mediaのFunctionからpublic/logsがFile Tracing対象外になったことを確認した。`,
    },
    {
      title: "Vercelへの一時デプロイを試してFunctionサイズを確認する",
      body: `コミットせずに確認するため、Vercel CLIのtemporary deploymentを利用してデプロイを試した。
ローカルビルドとFile Tracingまでは正常に進んだが、最終的な出力処理でsymlink作成時のEPERMエラーが発生した。
その後、Vercel上のadd-log-mediaについて、Node.js 24.x、4.0MBのFunctionとして表示される状態を確認した。`,
    },
    {
      title: "add-log-mediaを実行してメディア追加処理への影響を確認する",
      body: `テスト用のGoogle Driveフォルダから画像をダウンロードし、add-log-mediaを実行した。
画像のダウンロードとファイル名の拡張子正規化は正常に動作し、APIも200を返した。
一方、テスト時点ではログTS側のmedia配列への追加結果が期待どおり反映されず、コード側の確認が必要になった。
実際のログファイルを確認したところ、テスト対象と実際に確認していたログが異なっていたため、テスト画像を変更して再確認することにした。`,
    },
  ],

  result: `File Tracingを確認したことで、add-log-mediaのFunctionが約294MBまで肥大化していた主な原因がpublic/logs配下の画像・動画だったことが分かった。
public/logsをFunctionのFile Tracing対象から除外すると、File Tracingの一覧からpublic/logsが消え、Vercel上でもadd-log-mediaが4.0MBとして表示される状態を確認できた。
public/logs自体はサイトのページから参照するため引き続きデプロイ対象として必要だが、add-log-mediaのFunctionにまで同梱する必要はないことが分かった。

また、add-log-mediaの処理自体はメディアのダウンロードまで正常に動作することを確認した一方、ログTSへのmedia追加についてはテスト対象を整理して再確認する必要がある。
当初考えていた画像圧縮だけでなく、FunctionごとのFile Tracingを適切に制御することでもデプロイサイズを大幅に削減できることが分かった。`,

  next: [
    "add-log-mediaのログTSへのmedia追加処理を正しいテスト対象で再確認する",
    "File Tracing除外後の構成でVercel上の動作を確認する",
    "画像・動画が増えてDeployment Storageの使用量が再び増加した場合は外部ストレージへの移行を検討する",
    "Cloudflare R2などの外部オブジェクトストレージへのメディア移行を別途試す",
  ],

  source: {
    title: "デプロイサイズ調査",
    url: "https://chatgpt.com/g/g-p-6a44366d52488191bd77c3428f4029ba-dev/c/6a9e5152-76ac-83ee-ac97-f10395160bc8",
  },

  related: [],
} satisfies DevelopmentLog;
