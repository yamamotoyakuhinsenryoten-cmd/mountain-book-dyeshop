import type { Log } from "./types";

export const householdbudget001 = {
  slug: "house-hold-budget-001",
  type: "work",
  createdAt: "2026-08-05",

  title: "AI家計分析",
  category: "AI活用",
  details: [
    {
      label: "目的",
      value:
        "カード明細やAmazon購入履歴をAIで分類し、自分のお金の使い方を分析できるか試す",
    },
    {
      label: "試したこと",
      value:
        "PythonでCSVを読み込み、OpenAI APIを使って支出データへカテゴリを付与",
    },
    {
      label: "分類結果",
      value: "店舗や商品名からのカテゴリ分類は概ね精度が高かった",
    },
    {
      label: "課題",
      value:
        "すべてをAIに任せると時間とコストがかかるため、Python処理とAI判断の分担が必要",
    },
  ],

  insights: [
    "AI分類自体は十分実用的だったが、重要なのはAIに何を任せるかの設計だった",
    "金額整形や表記揺れ修正、固定カテゴリにできるものはPythonで処理したほうが速く安い",
    "NTT東日本や上下水道料金など、毎回同じ判断になるものは固定ルール化したほうがよい",
    "Amazonのように店舗名だけでは判断できず、商品名から意味を読む必要があるものはAI向き",
    "1件ずつAPIを呼ぶ方式は遅く、まとめ送信や分類結果の再利用が必要だと分かった",
    "RAGや辞書化の必要性を、実際のAPI利用を通して体感できた",
    "家計分析自体はMoneyTreeである程度把握できており、システム化よりも欠点豆判定やAI OCRなど優先度の高いテーマがあると判断した",
  ],

  media: [],

  source: {
    title: "AI家計分析",
    url: "https://chatgpt.com/g/g-p-6a44366d52488191bd77c3428f4029ba/c/6a725fdf-2078-83ee-a0d4-d338cf8e02ac",
  },

  related: [],
} satisfies Log;
