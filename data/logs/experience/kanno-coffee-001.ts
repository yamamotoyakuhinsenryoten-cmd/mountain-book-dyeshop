import type { Log } from "../types";

export const kannocoffee001: Log = {
  slug: "kanno-coffee-001",
  type: "experience",
  createdAt: "2026-10-08",

  title: "神乃珈琲(新宿東口) #1",
  category: "コーヒー店",

  details: [
    { label: "店名", value: "神乃珈琲(新宿東口)" },
    { label: "訪問日時", value: "2026/10/8" },
    {
      label: "オーダー",
      value: "浅煎りコーヒー（650円）、チーズケーキ（550円）",
    },
    { label: "豆", value: "エチオピア（イルガチェフェ）、グァテマラ他）" },
    { label: "精製方法", value: "" },
    { label: "標高", value: "" },
    { label: "テイスティングノート", value: "" },
    { label: "ドリップ方法", value: "ハンドドリップ" },
    { label: "店カテゴリ", value: "カフェ" },
    { label: "店の規模", value: "中" },
    { label: "豆の販売", value: "あり" },
    { label: "店内利用", value: "可" },
    { label: "テイクアウト", value: "可" },
    { label: "メニュー", value: "浅煎り・中煎り・深煎り、チーズケーキ" },
  ],

  insights: [
    "店内は落ち着かず、外国人観光客が求める日本のような、過剰な日本感があると感じた。",
    "コーヒーはすっきりしていて、浅煎りらしいフルーティさも感じたが、香りの印象は強くなく、味わいはふつうだった。店の印象に引っぱられている可能性もあると思った。",
    "チーズケーキはまあまあで、カフェでよくあるできあいの味という印象だった。",
    "カウンターでハンドドリップの様子が見えた。ハリオを使い、スケールは使わずに淹れているようだった。サーバーの下からオレンジ色の光が当たり、日の出のような演出に見えた。",
  ],

  media: [
    {
      type: "image",
      src: "/logs/kanno-coffee-001/img/IMG_3755.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/kanno-coffee-001/img/IMG_3756.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/kanno-coffee-001/img/IMG_3757.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/kanno-coffee-001/img/IMG_3758.jpg",
      caption: "",
    }
  ],

  source: {
    title: "生成元チャット",
    service: "Worktable",
    url: "",
  },

  related: [
    {
      kind: "external",
      title: "神乃珈琲 新宿東口店",
      url: "https://kannocoffee.com/contents/shopinfo/%E7%A5%9E%E4%B9%83%E珈琲新宿東口/?srsltid=AU7gw4VQ-KDLbiHu6i5zC_lemAPX5em9SRG74hY3kV7AbaynogrxGabT",
    },
    {
      kind: "external",
      title: "神乃珈琲 コーヒー豆商品ページ",
      url: "https://kannocoffee.com/SHOP/BB-2.html",
    },
  ],
} satisfies Log;
