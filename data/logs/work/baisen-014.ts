import type { Log } from "../types";

export const baisen014: Log = {
  slug: "baisen-014",
  type: "work",
  createdAt: "2026-09-11",

  title: "手鍋焙煎 #14|ニカラグア サンタアナ農園 SHG|中浅煎り",
  category: "焙煎",

  details: [
    { label: "狙い", value: "浅煎り目を狙う" },
    {
      label: "結果",
      value:
        "重量減は浅煎り目の範囲だったが、色ムラがあり、火が中まで十分に入っていないような仕上がりになった",
    },

    { label: "豆", value: "ニカラグア サンタアナ農園 SHG 大山珈琲" },
    { label: "焙煎日", value: "2026/9/6" },
    { label: "焙煎前", value: "153g" },
    { label: "焙煎後", value: "124g" },
    { label: "減少率", value: "約13%" },

    { label: "ハンドピック前", value: "153g" },
    { label: "ハンドピック後", value: "143g" },
    { label: "除去", value: "10g" },
    { label: "欠点豆率", value: "約6.5%" },
    { label: "欠点豆数", value: "57個" },
    {
      label: "欠点豆内訳",
      value:
        "虫食い・カビ疑い 3、黒っぽい変色 15、黄色・白っぽい 9、ピーベリー 0、割れ・欠け 2、小さい豆 28、形状異常・シワなど 0",
    },

    { label: "投入温度", value: "" },
    { label: "火力変更", value: "" },
    { label: "1ハゼ", value: "6:30" },
    { label: "2ハゼ", value: "" },
    { label: "終了", value: "10:10" },

    {
      label: "その他",
      value:
        "投入直後に約10秒動かさない時間があった。前回より火力がやや強く、1ハゼ後に強いと感じて火力を弱めた。豆の色に薄い・濃いムラが目立ち、挽いたときに硬さと引っかかりを感じた。抽出時に膨らまず色も薄く、味は薄く感じ、冷めると酸味が出てきた。火が中まで十分に入っていないような印象があった。",
    },
  ],

  insights: [
    "浅煎り目を狙った重量減にはなったが、きれいな浅煎りというより未発達な仕上がりに感じた",
    "投入直後の約10秒の放置は色ムラの原因になった可能性があるため、次回は避ける",
    "次回は火力をほんの少し弱め、熱を均一に入れる方向を試す",
    "ハンドピックの厳しさによって味が変わるか、ゆるめ・厳しめで比較する実験を今後行う",
  ],

  media: [
    {
      type: "image",
      src: "/logs/baisen-014/img/IMG_3298.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/baisen-014/img/IMG_3310.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/baisen-014/img/IMG_3311.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/baisen-014/img/IMG_3312.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/baisen-014/img/IMG_3313.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/baisen-014/img/IMG_3314.jpg",
      caption: "",
    },
    {
      type: "video",
      src: "/logs/baisen-014/vid/IMG_3315.MOV",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/baisen-014/img/IMG_3316.jpg",
      caption: "",
    },
  ],

  source: {
    title: "生成元チャット",
    service: "ChatGPT",
    url: "https://chatgpt.com/g/g-p-6a266a677fa88191a65e224de7327a25/c/6a9b3c7a-56ec-83ee-a8fd-98ea28e61402",
  },

  related: [
    {
      kind: "external",
      title: "Youtube",
      url: "https://www.youtube.com/watch?v=3U88xP0YD3E",
    },
  ],
} satisfies Log;
