import type { Log } from "./types";

export const baisen010 = {
  slug: "baisen-010",
  type: "work",
  createdAt: "2026-08-11",

  title: "手鍋焙煎 #10|ブラジル S18 No.2|深煎り",
  category: "焙煎",
  details: [
    { label: "豆", value: "ブラジル S18 No.2" },
    { label: "焙煎日", value: "2026-08-03" },
    { label: "ハンドピック前", value: "155g" },
    { label: "除去重量", value: "4g" },
    { label: "ハンドピック後", value: "151g" },
    { label: "欠点豆率", value: "約2.6%" },
    { label: "除去豆数", value: "26個" },
    { label: "焙煎後", value: "123g" },
    { label: "減量率", value: "約18.5%" },
    { label: "投入温度", value: "約45℃" },
    { label: "火力を強くした", value: "11:54" },
    { label: "1ハゼ", value: "14:07" },
    { label: "2ハゼ", value: "16:22" },
    { label: "終了", value: "20:55" },
    { label: "焙煎狙い", value: "前回よりしっかり深煎り" },
    {
      label: "味の印象",
      value:
        "香ばしく、しっかり苦いが焦げた感じはない。後味はすっきりしていて、少しナッツっぽい甘さがある",
    },
    {
      label: "除去豆内訳",
      value:
        "insect_mold 17、dark_brown 1、peaberry 1、broken_chipped 2、irregular_shape 5",
    },
  ],

  insights: [
    "久しぶりの焙煎で序盤の火力が弱く、1ハゼが前回の9:23から約14分まで遅れた",
    "1ハゼ後は蓋を開けるなどして、急激に焙煎が進まないよう調整した",
    "前回より深煎りを狙って終了時間を22分頃まで伸ばしたが、焙煎後の減量率は約18.5%で、前回の約19.0%と大きく変わらなかった",
    "ゆっくり進んだことでマイルドで柔らかい味になると予想したが、実際には前回と大きく変わらない印象だった",
    "苦味はしっかりあるが、焦げた苦味ではなく、香ばしさのある苦味として感じられた",
    "後味はすっきりしていて嫌な苦味が残らず、少しナッツっぽい甘さも感じられた",
    "チョコドーナツとの相性が非常によく、苦味のあるコーヒーとチョコ系のお菓子の組み合わせが好みに合っている",
    "今回の狙いだった『前半の進行を保ちながら、さらに深煎りにする』ところまでは到達していないため、次回は火力を少し強めて1ハゼを前回に近い時間へ戻し、2ハゼ後の時間を3〜4分程度に伸ばす方向を試す",
    "見た目だけで深さを判断すると焦がす可能性があるため、今後は1ハゼ・2ハゼからの経過時間を基準に深さを調整していく",
    "同じブラジル S18 No.2をもう一度購入し、現在の好みであるボディ、しっかりした苦味、香ばしさ、ナッツやチョコ系の甘さが共存する深煎りを引き続き探る",
  ],

  media: [
    {
      type: "image",
      src: "/logs/baisen-010/img/IMG_2924.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/baisen-010/img/broken_chipped_01.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/baisen-010/img/broken_chipped_02.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/baisen-010/img/dark_brown_01.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/baisen-010/img/insect_mold_01.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/baisen-010/img/insect_mold_02.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/baisen-010/img/irregular_shape_01.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/baisen-010/img/peaberry_01.jpg",
      caption: "",
    },
  ],

  source: {
    title: "20260803手鍋焙煎",
    url: "https://chatgpt.com/g/g-p-6a266a677fa88191a65e224de7327a25/c/6a6fb4e2-71b0-83e9-aaca-a03605baa59d",
  },

  related: [
    {
      kind: "external",
      title: "Youtube",
      url: "https://www.youtube.com/watch?v=RTIwL-NheqI",
    },
  ],
} satisfies Log;
