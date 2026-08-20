import type { Log } from "./types";

export const allseasonscoffee001 = {
  slug: "all-seasons-coffee-001",
  type: "experience",
  createdAt: "2026-08-11",
  title: "ALL SEASONS COFFEE（新宿御苑）",
  category: "コーヒーショップ",

  details: [
    { label: "店舗", value: "ALL SEASONS COFFEE 新宿御苑" },
    { label: "訪問日", value: "2026/07/29" },
    { label: "注文", value: "ハンドドリップ" },
    { label: "豆", value: "ルワンダ・ルリンド" },
    { label: "品種", value: "レッドブルボン、アラビカ種" },
    { label: "精製", value: "アナエロビック・ナチュラル" },
    { label: "カッピングノート", value: "キウイ、アプリコット、クローブ" },
    { label: "価格", value: "1,000円" },
    {
      label: "店舗の印象",
      value:
        "浅煎りのフルーティなコーヒーが中心。カウンターのガラス瓶から豆の香りを確認して選べる",
    },
    {
      label: "豆の販売",
      value:
        "店頭販売あり。オンラインショップ（BASE）もあり、150gで2,500円前後の豆もある",
    },
  ],

  insights: [
    "浅煎りらしい香りや酸味はこれまでにも飲んだことがあるが、後味がピタッとなくなるような感覚は初めてだった",
    "飲んでいるときは香りがして、酸味も少し感じるが、その後すっと消える。後味がすっきりというより「無い」に近い",
    "温度が低くなると、少し余韻が残るように感じた",
    "「この国だからこの味」という感じはあまりしないと感じた。まだ飲んだサンプルが少ないため、今後もいろいろ試してみたい",
    "COVERT COFFEEではメロン、オブスキュアコーヒーではチョコレートと果実感を感じた。特に、果実の後にナッツのような風味が続くコーヒーが好み",
    "最近は、一般的なスタンダードなブレンドよりも、果実感の後にナッツやチョコレートのような風味が続くなど、味の展開があるブレンドに興味が出てきた",
    "週一くらいで、いつもと違うコーヒーを飲みに行く感覚で楽しみたい",
    "職場から近く、豆の種類も多いため、また訪れていろいろ試してみたい",
    "アナエロビック・ナチュラルは、これまで飲んだことがあるかはっきりせず、今回が意識して飲む機会になった可能性がある",
  ],

  media: [
    {
      type: "image",
      src: "/logs/all-seasons-coffee-001/img/IMG_2875.jpg",
      caption: "",
    },
    {
      type: "video",
      src: "/logs/all-seasons-coffee-001/vid/IMG_2876.mov",
      caption: "",
    },
  ],

  source: {
    title: "オールシーズンズコーヒー",
    url: "https://chatgpt.com/g/g-p-6a266a677fa88191a65e224de7327a25/c/6a69a529-7948-83e8-9654-4e9fff246346",
  },

  related: [
    {
      kind: "external",
      title: "ALL SEASONS COFFEE 公式サイト",
      url: "https://allseasonscoffee.jp/",
    },
    {
      kind: "external",
      title: "ALL SEASONS COFFEE オンラインショップ",
      url: "https://allseasons.official.ec/",
    },
  ],
} satisfies Log;
