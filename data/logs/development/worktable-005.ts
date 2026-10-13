import type { DevelopmentLog } from "../types";

export const worktable005 = {
  slug: "worktable-005",
  type: "development",
  createdAt: "2026-10-13",
  title: "Worktable #5 | アクセス制御の方式検討とVercelによる保護",
  category: "Webサイト構築",

  media: [],

  purpose: `WorktableにGitHub MCPを導入するにあたり、外部からのアクセスをどのように制御するか検討する。
GitHub連携ではリポジトリや関連情報を扱うため、機能の実装を進める前に、Worktable自体へのアクセスを制限し、安全に開発・運用できる環境を整えることを目的とする。`,

  policy: `アクセス制御は、アプリケーション側で認証を実装する方法だけでなく、ホスティングサービス側の機能を利用する方法も含めて検討する。
まずは既存のホスティング環境で利用できるアクセス制限を活用し、GitHub MCPの実装に進む前にアクセス制御の状態を確認する。
ホスティング側での制限と、APIハンドラー自体の認証・認可は別の観点として扱い、必要に応じて追加対策を検討する。`,

  steps: [
    "Worktableのアクセス制御が必要な背景を整理する",
    "アクセス制御の実装方式を検討する",
    "VercelのDeployment Protectionによるアクセス制限を利用する",
    "APIへのアクセス時に保護が適用されていることを確認する",
  ],

  execution: [
    {
      title: "Worktableのアクセス制御が必要な背景を整理する",
      body: `WorktableへのGitHub MCP連携を進める前に、アプリケーションやAPIへのアクセスをどのように制限するか検討した。

GitHub MCPはまず読み取り専用で導入する方針だが、その前提としてWorktable側のアクセス制御を確認し、外部から自由にアクセスできる状態を避ける必要があると考えた。`,
    },
    {
      title: "アクセス制御の実装方式を検討する",
      body: `アクセス制御について、アプリケーション側で認証・認可を実装する方法と、ホスティングサービス側のアクセス制限機能を利用する方法を検討した。

独自の認証機能を実装する方法だけに限定せず、既存のVercel環境で利用できる保護機能を活用する方向で進めた。

なお、このチャットでは各方式の詳細な比較や、すべての候補の実装検証までは行っていない。`,
    },
    {
      title: "VercelのDeployment Protectionによるアクセス制限を利用する",
      body: `VercelのDeployment Protectionを有効にし、WorktableへのアクセスをVercelの認証・チームメンバー制限によって保護する構成にした。

Vercelのパスワード保護についても確認したが、利用プラン上の制約があるため、Vercelへのログインとチームメンバーであることを要求する方式を利用している。`,
    },
    {
      title: "APIへのアクセス時に保護が適用されていることを確認する",
      body: `https://worktable-eight.vercel.app/api/sessions にアクセスしたところ、APIのレスポンスではなくVercelのログイン画面が表示された。

この結果から、少なくとも確認したアクセス経路では、APIへのリクエストにもVercel側のDeployment Protectionが適用されていることを確認した。`,
    },
  ],

  result: `Worktableのアクセス制御方式を検討し、独自の認証機能だけに頼るのではなく、VercelのDeployment Protectionを利用してアクセスを制限する構成にした。

実際にAPIのURLへアクセスし、Vercelのログイン画面が表示されることを確認したため、Vercel側のアクセス制限がAPIへのアクセスにも適用されていることを確認できた。

GitHub MCPの導入は、こうしたアクセス制御の確認を進めたうえで、まず読み取り専用から開始する方針とした。`,

  next: [
    "アクセス制御の確認を進めたうえでGitHub MCPの読み取り専用連携を設計・実装する",
  ],

  source: {
    title: "生成元チャット",
    service: "ChatGPT",
    url: "https://chatgpt.com/c/6acca0dd-3b64-83e8-9571-2c136d351865",
  },

  related: [],
} satisfies DevelopmentLog;
