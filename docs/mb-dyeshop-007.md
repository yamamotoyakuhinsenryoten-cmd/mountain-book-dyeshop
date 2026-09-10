# Vercel add-log-media FunctionのDeploymentサイズ対策

## 目的

VercelのDeployment Artifactを確認したところ、`/api/add-log-media` のServerless Functionが約294MBと非常に大きくなっていた。

画像圧縮によって`public/logs`自体の容量は削減できていたものの、Function自体のサイズが大きかったため、File Tracingの内容を確認し、不要なメディアファイルがFunctionに同梱されない構成にする。

## 実装方針

`/api/add-log-media` のFile Tracing結果を確認し、Functionに何が含まれているかを調査する。

`public/logs`は通常のWebページからも参照しているため、サイト全体から削除するのではなく、`add-log-media`のServerless FunctionからのみFile Tracing対象外にする。

## 今回やったこと

### File Tracingの調査

- VercelのDeployment Artifactで`/api/add-log-media`のFunctionサイズが約294MBになっていることを確認
- `/api/run-chatgpt`は約3.3MB、ページ系Functionは約0.8MBであり、`add-log-media`だけが大きくなっていることを確認
- `public/logs`の容量が約281MBあることを確認
- Next.jsのビルド後に生成される`route.js.nft.json`を確認
- `add-log-media`のFile Tracing結果に`public/logs`配下の画像・動画が大量に含まれていることを確認
- `data/logs`配下のログTSファイルや`google-auth-library`などもTracing対象になっていたが、サイズへの主な影響は`public/logs`のメディアであることを確認

### File Tracingからの除外

`next.config.ts`に`outputFileTracingExcludes`を追加し、`/api/add-log-media`から`public/logs`を除外する設定に変更。

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingExcludes: {
    "/api/add-log-media": ["./public/logs/**/*"],
  },
};

export default nextConfig;
```

### ローカルでの検証

- `next build`が正常に完了することを確認
- `.next/server/app/api/add-log-media/route.js.nft.json`を確認
- `public/logs`を検索したところ何も表示されず、`add-log-media`のFile Tracingから除外されていることを確認

### Vercelでの検証

Vercel CLIから一時デプロイを試したところ、Windows環境でsymlink作成時の`EPERM`エラーが発生した。

その後、Vercel CLIからPreview Deploymentを実行し、Functionサイズを確認。

変更前：

- `/api/add-log-media`：約294MB

変更後：

- `/api/add-log-media`：4.0MB

`public/logs`の約281MBがFunction Artifactから除外されたことで、Functionサイズを大幅に削減できることを確認した。

### API動作確認

File Tracingから`public/logs`を除外した状態で`/api/add-log-media`を実行。

Google Driveからメディアをダウンロードし、`public/logs`へのファイル保存と拡張子の正規化まで正常に動作することを確認。

```text
ログフォルダ取得
↓
Google Driveからメディアをダウンロード
↓
public/logsへ保存
↓
拡張子を正規化
↓
POST /api/add-log-media 200
```

## 現在の状態

`/api/add-log-media`のFile Tracingから`public/logs`を除外する設定が完了。

Vercel上でFunctionサイズが、

- 変更前：約294MB
- 変更後：4.0MB

まで削減されることを確認した。

`public/logs`自体はプロジェクトに残しているため、通常のWebページからのメディア参照には影響しない。

また、`add-log-media`からGoogle Driveのメディアを取得する処理も、File Tracing除外後に正常動作することを確認した。

## 次にやること

今回のFile Tracing対策については、Vercel上でFunctionサイズが大幅に削減され、APIの基本的な動作も確認できたため、この構成を採用する。

今後、画像・動画が増えてDeployment Storageの使用量が再び増加する場合は、Cloudflare R2などの外部オブジェクトストレージへのメディア移行を検討する。

外部ストレージへの移行は、容量対策だけでなく、オブジェクトストレージ、公開URL、CORS、API、Next.jsとの連携などを学ぶ機会として、時間があるときに別途試す。
