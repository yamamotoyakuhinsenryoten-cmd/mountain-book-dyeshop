import type { Log } from "../types";

export const pumainemame001 = {
  slug: "puma-inemame-001",
  type: "experience",
  createdAt: "2026-09-27",

  title: "グァテマラ・カフェピューマ(イネマメ)",
  category: "コーヒー豆",

  details: [
    { label: "名前", value: "グァテマラ カフェピューマ" },
    { label: "購入店", value: "イネマメ＠芦花公園" },
    { label: "価格", value: "100g1200円ほど" },
    { label: "豆", value: "グァテマラ" },
    { label: "焙煎度", value: "中深煎り" },
    {
      label: "印象",
      value:
        "苦みとコクが印象的。ブラックチョコレートのようなコクを感じる。最初に苦みがあり、その後すっと消えていく。",
    },
  ],

  insights: [
    "思ったより苦みがあるが、後味はすっきりしていて、苦みが残り続ける感じではない",
    "コクが特に印象的で、ブラックチョコレートのような厚みのある苦みとコクとして感じられた",
    "ブラジルの深煎り寄りの豆と似ているようにも感じた。深煎りになるほど、苦み・香ばしさ・チョコレートっぽさ・コクなどの共通した風味が出てきて、産地による違いがわかりにくくなるのかもしれない",
    "浅煎りの豆は産地による違いを比較的感じ取りやすい一方、深煎り寄りではコクや苦みの違いに注目すると豆ごとの違いが見えやすそう",
  ],

  media: [
    {
      type: "image",
      src: "/logs/puma-inemame-001/img/IMG_3478.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/puma-inemame-001/img/IMG_3479.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/puma-inemame-001/img/IMG_3480.jpg",
      caption: "",
    },
    {
      type: "video",
      src: "/logs/puma-inemame-001/vid/IMG_3481.MOV",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/puma-inemame-001/img/IMG_3482.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/puma-inemame-001/img/IMG_3483.jpg",
      caption: "",
    },
  ],

  source: {
    title: "生成元チャット",
    service: "ChatGPT",
    url: "https://chatgpt.com/g/g-p-6a266a677fa88191a65e224de7327a25/c/6ab272f2-7458-83e8-aca6-e430773441f7",
  },

  related: [],
} satisfies Log;
