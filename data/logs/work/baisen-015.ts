import type { Log } from "../types";

export const baisen015: Log = {
  slug: "baisen-015",
  type: "work",
  createdAt: "2026-10-07",

  title: "ブラジル S18 No2 #15｜手鍋焙煎｜深煎り",
  category: "焙煎",

  approach:
    "浅煎りのニカラグアとのとブレンド用に焙煎した。ニカラグアが酸味が強くのみづらいため、深煎りを目指す",

  result:
    "しっかり深煎りになった。焙煎後すぐに飲むと苦味は思ったほど強くなく、ボディはしっかりしていた。",

  details: [
    { label: "焙煎日", value: "2026/9/28" },
    { label: "焙煎手法", value: "手鍋" },
    { label: "焙煎度", value: "深煎り" },
    { label: "焙煎前", value: "159g" },
    { label: "焙煎後", value: "120g" },
    { label: "減少率", value: "約24.5%" },

    { label: "豆", value: "ブラジル S18 No2" },
    { label: "産地", value: "ブラジル" },
    { label: "農園", value: "" },
    { label: "品種", value: "" },
    { label: "精製方法", value: "" },
    { label: "標高", value: "" },
    { label: "グレード", value: "S18 No2" },

    { label: "ハンドピック前", value: "170g" },
    { label: "ハンドピック後", value: "159g" },
    { label: "除去", value: "11g" },
    { label: "欠点豆率", value: "約6.5%" },
    { label: "欠点豆数", value: "73個" },
    {
      label: "欠点豆内訳",
      value:
        "虫食い・カビ疑い 22、黒っぽい変色 4、黄色・白っぽい 0、ピーベリー 0、割れ・欠け 8、小さい豆 6、形状異常・シワなど 0、疑い・複合的要因 33",
    },

    { label: "投入温度", value: "" },
    { label: "火力変更", value: "" },
    { label: "1ハゼ", value: "8:15" },
    { label: "2ハゼ", value: "9:30" },
    { label: "終了", value: "13:07" },
  ],

  insights: [
    "焙煎減少率が約24.5%と前回のブラジルより深く、豆を触ったときに中がスカスカした感じがあり、挽いたときも柔らかく感じた。",
    "深煎りにしたが苦味は思ったほど強くなく、ボディはしっかりあるものの、コクとは少し違うニュアンスだった。",
    "170gと通常の150gより多くしたことで、豆が少しこぼれたり、動かしにくさがあった。煙もいつもより多く、豆量の増加も影響した可能性がある。",
    "自家製のブレンドはおもしかった",
    "ブラジル:ニカラグア=1:1で酸味と苦味がちょうど相殺されたような感じ。口に残る感じはあった",
    "ブラジル:ニカラグア=2:1ではほぼブラジルの印象になったが、若干の口に残る感じは以前あり。",
    "ブラジル:ニカラグア=2:3でほのかな酸味とすっきりした後味になり、2回試してどちらもおいしく感じた。",
  ],

  next: [
    "手鍋では150g程度を基準量として焙煎する。現在の手鍋だとここから増やさないほうがよさそう。",
  ],

  media: [
    {
      type: "image",
      src: "/logs/baisen-015/img/IMG_3553.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/baisen-015/img/IMG_3554.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/baisen-015/img/IMG_3555.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/baisen-015/img/IMG_3556.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/baisen-015/img/IMG_3557.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/baisen-015/img/IMG_3558.jpg",
      caption: "",
    },
  ],

  source: {
    title: "生成元チャット",
    service: "ChatGPT",
    url: "https://chatgpt.com/g/g-p-6a266a677fa88191a65e224de7327a25/c/6ab98428-8720-83e8-8d48-17fb24ece913",
  },

  related: [
    {
      kind: "external",
      title: "焙煎動画",
      url: "https://youtu.be/7AiExJ91z1E",
    },
  ],
} satisfies Log;
