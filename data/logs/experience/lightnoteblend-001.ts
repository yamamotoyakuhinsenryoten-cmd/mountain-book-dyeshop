import type { Log } from "../types";

export const lightnoteblend001 = {
  slug: "lightnoteblend-001",
  type: "experience",
  createdAt: "2026-09-07",

  title: "ライトノートブレンド",
  category: "コーヒー豆",
  details: [
    { label: "名前", value: "ライトノート ブレンド" },
    { label: "購入店", value: "スターバックス" },
    { label: "価格", value: "250g 約1,400円" },
    { label: "豆", value: "ブラジル、ニカラグア" },
    { label: "焙煎度", value: "浅煎り" },
    {
      label: "印象",
      value:
        "軽くて飲みやすく、酸味はあまりなく、苦味が少しある程度。軽いがボディ感がまったくないわけではない",
    },
  ],

  insights: [
    "毎日飲んでみて、軽くて飲みやすいところがかなり好きだと感じた",
    "好みは、軽めで酸味があまりなく、苦味が少しあるくらいのコーヒーだと分かってきた",
    "以前手鍋焙煎した中深煎りくらいのブラジルに似ているが、その苦さを柔らかくしたような印象",
  ],

  media: [
    {
      type: "image",
      src: "/logs/lightnoteblend-001/img/IMG_3221.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/lightnoteblend-001/img/IMG_3222.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/lightnoteblend-001/img/IMG_3223.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/lightnoteblend-001/img/IMG_3224.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/lightnoteblend-001/img/IMG_3226.jpg",
      caption: "",
    },
    {
      type: "video",
      src: "/logs/lightnoteblend-001/vid/IMG_3225.mov",
      caption: "",
    },
  ],
  source: {
    title: "ライトノートブレンド紹介",
    url: "https://chatgpt.com/c/6a93f063-a1c0-83ee-b628-bac50da6e231",
  },

  related: [
    {
      kind: "external",
      title: "スターバックス ライトノート ブレンド 公式ページ",
      url: "https://menu.starbucks.co.jp/4524785492462",
    },
  ],
} satisfies Log;
