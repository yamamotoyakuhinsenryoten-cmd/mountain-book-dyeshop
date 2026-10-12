import type { Log } from "../types";

export const sarutahikocoffee001: Log = {
  slug: "sarutahiko-coffee-001",
  type: "experience",
  createdAt: "2026-10-10",

  title: "猿田彦珈琲(吉祥寺) #1",
  category: "コーヒー店",

  details: [
    { label: "店名", value: "猿田彦珈琲(吉祥寺)" },
    { label: "訪問日時", value: "2026/10/10 モーニング" },
    {
      label: "オーダー",
      value: "大吉ブレンド（ホット・レギュラー、350円）",
    },
    { label: "豆", value: "" },
    { label: "精製方法", value: "" },
    { label: "標高", value: "" },
    {
      label: "テイスティングノート",
      value:
        "ダークチョコレート、クルミ。冷めるとクルミやアーモンドの香ばしくまろやかな印象。心地よい重みがありながら、後味はすっきり。",
    },
    { label: "ドリップ方法", value: "" },
    { label: "店カテゴリ", value: "" },
    { label: "店の規模", value: "カフェ" },
    { label: "豆の販売", value: "小" },
    { label: "店内利用", value: "可" },
    { label: "テイクアウト", value: "可" },
    { label: "メニュー", value: "ブレンド、ケニア、コロンビア" },
  ],

  insights: [
    "香りがよかった。飲み始めにはフルーティさがあった。後味はナッツっぽく、酸味を引っぱらない印象。",
    "オブスキュアコーヒーで飲んだブレンドに似た雰囲気があり、それよりバランスと一体感があるように感じた。",
    "とてもおいしく、この価格でこの味を楽しめることに驚いた。注文後すぐに受け取れて、テイクアウトできた。",
  ],

  media: [
    {
      type: "image",
      src: "/logs/sarutahiko-coffee-001/img/IMG_3773.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/sarutahiko-coffee-001/img/IMG_3774.jpg",
      caption: "",
    },
  ],

  source: {
    title: "生成元チャット",
    service: "Worktable",
    url: "",
  },

  related: [
    {
      kind: "external",
      title: "大吉ブレンド",
      url: "https://sarutahiko.jp/products/m-d?variant=42083962978357",
    },
  ],
} satisfies Log;
