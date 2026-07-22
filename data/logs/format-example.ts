// 新しい Log 形式の確認用サンプル。data/logs/index.ts には未登録。
export const formatExample = {
  slug: "format-example",
  type: "work",
  createdAt: "2026-07-23",

  info: {
    title: "手鍋焙煎 #9（新形式サンプル）",
    category: "焙煎",
    details: [
      { label: "豆", value: "ブラジル S18 No.2" },
      { label: "生豆量", value: "147g" },
      { label: "焙煎後重量", value: "119g" },
      { label: "焙煎時間", value: "15:49" },
    ],
  },

  media: [
    {
      type: "image",
      src: "/logs/baisen-009/img/IMG_2724.jpg",
      caption: "焙煎開始時の豆",
    },
    {
      type: "image",
      src: "/logs/baisen-009/img/IMG_2729.jpg",
      caption: "焙煎後の豆",
    },
  ],

  log: [
    {
      role: "user",
      text: "今回の焙煎結果を記録したい。",
    },
    {
      role: "assistant",
      text: "147gの生豆を15分49秒焙煎し、119gに仕上がった。減量率は約19%だった。",
    },
    {
      role: "user",
      text: "次回はもう少し浅めに仕上げたい。",
    },
    {
      role: "assistant",
      text: "火力を少し下げ、1ハゼから取り出すまでの時間を調整して比較する。",
    },
  ],

  // 実データでは元チャットの共有 URL を設定する。
  source: "https://chatgpt.com/share/REPLACE_WITH_CHAT_ID",

  related: [
    {
      kind: "external",
      title: "焙煎の参考動画",
      url: "https://www.youtube.com/watch?v=G1e063cY49s",
    },
    {
      kind: "log",
      title: "手鍋焙煎 #8",
      slug: "baisen-008",
    },
  ],
};
