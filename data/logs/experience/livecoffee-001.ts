import type { Log } from "../types";

export const livecoffee001 = {
  slug: "livecoffee-001",
  type: "experience",
  createdAt: "2026-09-27",

  title: "ライブコーヒー＠吉祥寺",
  category: "コーヒー店",
  details: [
    { label: "店名", value: "ライブコーヒー＠吉祥寺" },
    { label: "訪問日時", value: "2026/9/22" },
    { label: "オーダー", value: "ブレンド（300円）" },
    { label: "豆", value: "ブラジル、グァテマラベース" },
    { label: "精製方法", value: "" },
    { label: "標高", value: "" },
    { label: "テイスティングノート", value: "" },
    { label: "ドリップ方法", value: "マシンドリップ" },
    {
      label: "店の印象",
      value: "豆屋さんにコーヒースタンドが併設されている感じ",
    },
    {
      label: "豆の販売",
      value: "豆の種類が豊富。200gでだいたい1,500〜2,000円くらい",
    },
    {
      label: "メニュー",
      value:
        "ブレンドはプレミアムブレンドを使用。店内利用はテイクアウト価格にプラス50円",
    },
    { label: "その他", value: "テイクアウトで利用" },
  ],

  insights: [
    "苦味とコクのあるブレンドという印象",
    "酸味よりも苦味のほうに倒した味わい",
    "おいしく、マックコーヒーにも若干似ていると感じた",
  ],

  media: [
    {
      type: "image",
      src: "/logs/livecoffee-001/img/IMG_3471.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/livecoffee-001/img/IMG_3472.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/livecoffee-001/img/IMG_3473.jpg",
      caption: "",
    },
    {
      type: "video",
      src: "/logs/livecoffee-001/vid/IMG_3474.MOV",
      caption: "",
    },
  ],

  source: {
    title: "生成元チャット",
    service: "ChatGPT",
    url: "https://chatgpt.com/g/g-p-6a266a677fa88191a65e224de7327a25-kohi/c/6ab1d3d2-4960-83e8-a13d-af0eefe20d38",
  },

  related: [],
} satisfies Log;
