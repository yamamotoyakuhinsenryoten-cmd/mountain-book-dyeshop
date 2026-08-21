import type { Log } from "../types";

export const sirensblend001 = {
  slug: "sirensblend-001",
  type: "experience",
  createdAt: "2026-08-19",

  title: "サイレン ブレンド #1",
  category: "コーヒー豆",
  details: [
    { label: "商品", value: "スターバックス サイレン ブレンド" },
    { label: "価格", value: "250g 1,590円" },
    { label: "焙煎表記", value: "ライト" },
    {
      label: "焙煎の印象",
      value:
        "中煎りくらい。スターバックス全体的にしっかり焙煎されている印象があり、浅煎りという感じではない",
    },
    {
      label: "豆の硬さ",
      value: "挽いてみてもけっこう柔らかく、浅煎りらしい硬さは感じない",
    },
    { label: "ブレンド", value: "エチオピア、コロンビア" },
    { label: "酸味", value: "あるが主役ではなく、マイルド" },
    { label: "苦味", value: "少なめ" },
    { label: "味", value: "バランスがよく、のみやすい" },
    { label: "印象", value: "明るい感じがする" },
  ],

  insights: [
    "スターバックスの「ライト」は一般的な浅煎りというより、スターバックスの中で軽めの焙煎という意味合いに感じられる",
    "サイレン ブレンドは酸味があるものの酸味が主役ではなく、苦味も少ないため、マイルドでバランスのとれた味になっている",
    "エチオピアとコロンビアのブレンドで、エチオピア由来と思われる「明るい」印象がある可能性がある",
    "以前スターバックスではないエチオピアを飲んだときにも「明るい」と感じており、エチオピアのコーヒーに共通する印象として捉えられそう",
    "スターバックスのブレンドは全体的に「のみやすい」という第一印象になりやすく、のみやすさが共通しているため、ブレンド同士の比較が難しい",
    "スターバックスのブレンドを比較するときは、のみやすさそのものより、酸味・苦味・コク・香り・重さなど、のみやすさを作っている要素を見るほうが違いを捉えやすそう",
  ],

  media: [
    {
      type: "image",
      src: "/logs/sirensblend-001/img/IMG_3027.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/sirensblend-001/img/IMG_3028.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/sirensblend-001/img/IMG_3029.jpg",
      caption: "",
    },
    {
      type: "video",
      src: "/logs/sirensblend-001/vid/IMG_3030.mov",
      caption: "",
    },
  ],

  source: {
    title: "サイレンブレンド@スタバ",
    url: "https://chatgpt.com/g/g-p-6a266a677fa88191a65e224de7327a25/c/6a77c8cb-50f0-83ee-a0ca-825388f496b7",
  },

  related: [
    {
      kind: "external",
      title: "スターバックス サイレン ブレンド",
      url: "https://menu.starbucks.co.jp/4524785492486",
    },
  ],
} satisfies Log;
