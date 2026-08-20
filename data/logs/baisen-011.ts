import type { Log } from "./types";

export const baisen011 = {
  slug: "baisen-011",
  type: "work",
  createdAt: "2026-08-07",

  title: "手鍋焙煎 #11|ブラジル S18 No.2|深煎り",
  category: "手鍋焙煎",
  details: [
    { label: "豆", value: "ブラジル S18 No.2" },
    { label: "焙煎前", value: "138g" },
    { label: "焙煎後", value: "110g" },
    { label: "1ハゼ", value: "6:41（投入から約7:41）" },
    { label: "2ハゼ", value: "10:05（投入から約11:05）" },
    { label: "終了", value: "14:07（投入から約15:07）" },
    { label: "ハンドピック前", value: "150g" },
    { label: "ハンドピック後", value: "138g" },
    { label: "除去重量", value: "12g（約8.0%）" },
    { label: "焙煎減少率", value: "約20.3%" },
    { label: "動画", value: "焙煎開始から約2分後より撮影" },
  ],

  insights: [
    "今回の狙いは、火力を上げて勢いよく進めること。1ハゼは投入から約7分41秒と、当初想定していた9分前後より早くなった。",
    "1ハゼが早かったため、2ハゼまでの進行を蓋を開けたり火から離したりして調整し、1ハゼから2ハゼまで約3分24秒かけた。",
    "2ハゼ後は約4分02秒焙煎し、投入から約15分07秒で終了した。",
    "1ハゼの音はバチバチと強く、爽快に感じられるほど勢いがあった。",
    "前回と最終的な焙煎減少率はほぼ同じだったが、今回のほうが苦味の感じが違い、苦いけれど甘い感じがあり、スッキリ感もあった。",
    "今回のほうがおいしいと感じたため、1ハゼまでを勢いよく進め、後半を調整する焙煎方法は好みに合う可能性がある。",
    "焙煎後の豆も残して、色ムラや焼け具合を後から確認できるようにする。",
    "今回は前回と最終的な焙煎度が近いため、途中の進行速度の違いによる味の比較がしやすい。",
  ],

  media: [
    {
      type: "image",
      src: "/logs/baisen-011/img/IMG_3001.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/baisen-011/img/IMG_3002.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/baisen-011/img/IMG_3003.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/baisen-011/img/IMG_3004.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/baisen-011/img/IMG_3005.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/baisen-011/img/IMG_3006.jpg",
      caption: "",
    },
  ],

  source: {
    title: "20260807手鍋焙煎",
    url: [
      "https://chatgpt.com/g/g-p-6a266a677fa88191a65e224de7327a25/c/",
      "6a74e93f-e9dc-83e8-9f96-ee58e520b79f",
    ].join(""),
  },

  related: [
    {
      kind: "log",
      slug: "baisen-010",
      title: "前回",
    },
    {
      kind: "external",
      title: "Youtube",
      url: ["https://www.youtube.com/watch?v=", "qH1xq77S4as"].join(""),
    },
  ],
} satisfies Log;
