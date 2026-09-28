import type { Log } from "../types";

export const mermaidcoffee001 = {
  slug: "mermaidcoffee-001",
  type: "experience",
  createdAt: "2026-09-27",

  title: "マーメイドコーヒー(明大前) #1",
  category: "コーヒー店",

  details: [
    { label: "店名", value: "マーメイドコーヒー＠明大前" },
    { label: "訪問日時", value: "2026/9/27" },
    { label: "オーダー", value: "ブレンド（ビター）（580円）" },

    { label: "豆", value: "" },
    { label: "精製方法", value: "" },
    { label: "標高", value: "" },
    {
      label: "テイスティングノート",
      value:
        "深煎り。苦味・酸味・甘味のバランスがよく、コクのある余韻。異なる香りのスペシャルティコーヒーのみを使用し、収穫時期に合わせてブレンド内容を変更",
    },
    { label: "ドリップ方法", value: "" },

    {
      label: "店の印象",
      value:
        "店内は2〜3席ほど。マーメイドのロゴやスリーブがかわいく、店員さんは明るい感じでよかった",
    },
    { label: "豆の販売", value: "オンラインショップで販売" },
    {
      label: "メニュー",
      value:
        "ブレンド、ハンドドリップ（700円〜）、スコーンなどのお菓子（300円程度）",
    },
    {
      label: "その他",
      value:
        "Instagramでは店の向かいの物件を借りて店舗を拡張する予定とのこと。訪問時点でのオープン状況は不明",
    },
  ],

  insights: [
    "ビターブレンドは苦味が強いというより、酸味と苦味のバランスがよく、ほのかな酸味が後味に残るタイプだった",
    "コクやボディ感がかなり強く、ストロングで飲みごたえのあるコーヒー。量も一般的なMサイズより多めに感じた",
    "提供が早く、テイクアウトでもかなり熱々だった。すぐには飲めないくらいの温度だった",
    "ストロングな味わいと量があるため、全部飲むと胃にくる感じがあった",
    "おいしかったので、次回は普通のブレンドかハンドドリップを試してみたい",
    "店内は小さいが、スコーンなどのお菓子も手ごろそうなので、次回は店内でゆっくりしてみたい",
  ],

  media: [
    {
      type: "image",
      src: "/logs/mermaidcoffee-001/img/IMG_3542.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/mermaidcoffee-001/img/IMG_3543.jpg",
      caption: "",
    },
    {
      type: "video",
      src: "/logs/mermaidcoffee-001/vid/IMG_3544.MOV",
      caption: "",
    },
  ],

  source: {
    title: "生成元チャット",
    service: "ChatGPT",
    url: "https://chatgpt.com/c/6ab83abb-fbac-83ee-ba3b-c12bdd2ea961",
  },

  related: [
    {
      kind: "external",
      title: "マーメイドコーヒー ビターブレンド",
      url: "https://mermaid-coffee-roasters.com/items/64cb2e0369f94d00797ae564",
    },
  ],
} satisfies Log;
