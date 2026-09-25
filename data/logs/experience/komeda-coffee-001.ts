import type { Log } from "../types";

export const komedacoffee001 = {
  slug: "komeda-coffee-001",
  type: "experience",
  createdAt: "2026-09-25",

  title: "コメダ珈琲店 #1",
  category: "コーヒー店",
  details: [
    { label: "店名", value: "コメダ珈琲店" },
    { label: "訪問日時", value: "2026/9/19 朝" },
    { label: "オーダー", value: "たっぷりコメダブレンド、トースト、ゆで卵" },
    { label: "豆", value: "" },
    { label: "精製方法", value: "" },
    { label: "標高", value: "" },
    { label: "テイスティングノート", value: "" },
    { label: "ドリップ方法", value: "" },
    { label: "店の印象", value: "" },
    { label: "豆の販売", value: "" },
    { label: "メニュー", value: "" },
    { label: "その他", value: "" },
  ],

  insights: [
    "コーヒーは香ばしい印象。苦味はあるが、香ばしさ寄りに感じた",
    "酸味はほとんど感じず、すっきりしていて後に残る感じは少ない",
    "意外とボディは重くなく、飲みやすい印象",
    "コーヒーそのもののおいしさではスターバックスのほうが好みに合うと感じた",
    "コメダはコーヒー単体よりも、モーニングや店内でゆっくり過ごすことまで含めて楽しむ喫茶店という印象",
  ],

  media: [
    {
      type: "image",
      src: "/logs/komeda-coffee-001/img/IMG_3402.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/komeda-coffee-001/img/IMG_3403.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/komeda-coffee-001/img/IMG_3404.jpg",
      caption: "",
    }
  ],

  source: {
    title: "生成元チャット",
    service: "ChatGPT",
    url: "[https://chatgpt.com/c/6aae398e-f3dc-83ee-9ae6-43423f007fa9](https://chatgpt.com/c/6aae398e-f3dc-83ee-9ae6-43423f007fa9)",
  },

  related: [],
} satisfies Log;
