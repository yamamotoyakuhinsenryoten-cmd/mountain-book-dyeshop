import type { Log } from "../types";

export const test001 = {
  slug: "test-001",
  type: "work",
  createdAt: "2026-09-01",

  title: "テストログ #1",
  category: "テスト",

  details: [
    { label: "狙い", value: "中煎りを狙い、2ハゼが来たら終了する" },
    {
      label: "結果",
      value: "中煎り。酸味はあるが強くなく、バランスの取れた味になった",
    },

    { label: "豆", value: "ニカラグア サンタアナ農園 SHG 大山珈琲" },
    { label: "焙煎日", value: "2026/8/16" },
    { label: "焙煎前", value: "147g" },
    { label: "焙煎後", value: "125g" },
    { label: "減少率", value: "約15.0%" },

    { label: "ハンドピック前", value: "151g" },
    { label: "ハンドピック後", value: "147g" },
    { label: "除去", value: "4g" },
    { label: "欠点豆率", value: "約2.6%" },
    { label: "欠点豆数", value: "24個" },
    {
      label: "欠点豆内訳",
      value: "虫食い・カビ 10、割れ欠け 6、乾燥? 6、小さい 2",
    },

    { label: "投入温度", value: "約50℃" },
    { label: "火力変更", value: "" },
    { label: "1ハゼ", value: "8:15" },
    { label: "2ハゼ", value: "" },
    { label: "終了", value: "13:44" },

    {
      label: "その他",
      value: "途中でガス切れが発生。",
    },
  ],

  insights: [
    "ブラジルと比べて生豆の形状や大きさ、欠点豆の見た目がかなり異なり、同じ基準でのハンドピックは判断に迷う場面があった",
    "ニカラグアは焙煎度によって印象が変わり、浅煎りではオレンジのようなフルーティーさ、中煎りではすっきりしてクリアな印象のものを飲んだ経験がある",
    "今回の中煎りでは酸味が穏やかで後味まで残らず、ブラジルよりボディが弱い一方、全体としてバランスの取れた味になった",
    "次回はブラジルと同じくらいの深煎りまで焼き、焙煎度を揃えて両者の違いを見てみたい",
  ],

  media: [
    {
      type: "image",
      src: "/logs/test-001/img/IMG_1847.HEIC のコピー.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/test-001/img/IMG_3045.jpg",
      caption: "",
    },
  ],

  source: {
    title: "生成元チャット",
    service: "ChatGPT",
    url: "https://chatgpt.com/g/g-p-6a266a677fa88191a65e224de7327a25/c/6a7b3f2e-b644-83ee-8ff5-d7de910d5f3e",
  },

  related: [
    {
      kind: "external",
      title: "Drip Trip",
      url: "https://www.driptrip.net/",
    },
  ],
} satisfies Log;
