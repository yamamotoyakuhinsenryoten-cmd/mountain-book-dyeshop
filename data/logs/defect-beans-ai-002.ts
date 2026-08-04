import type { Log } from "./types";

export const defectbeansai002 = {
  slug: "defect-beans-ai-002",
  type: "work",
  createdAt: "2026-08-05",

  info: {
    title: "AIでハンドピック補助を試す #2",
    category: "AI実験",
    details: [
      {
        label: "目的",
        value: "AIを使ってハンドピック時の確認作業を補助できるか検証する",
      },
      {
        label: "検証内容",
        value:
          "reference画像改善、45度画像追加、実際のハンドピック対象での判定比較",
      },
      {
        label: "撮影条件",
        value: "target、referenceともに豆は表向きで撮影",
      },
      {
        label: "判定方式",
        value: "PythonからOpenAI APIを利用し、TSV形式で人間判断と比較",
      },
    ],
  },

  insights: [
    "AIは欠点豆を完全自動で除去するより、怪しい豆を抽出して人間が再確認する用途が現実的",
    "reference画像は欠点豆だけを集めるより、正常豆と欠点豆を比較できる形式のほうが判断基準を伝えやすい",
    "小さい豆は単体画像ではなく、通常サイズの豆との比較が必要",
    "虫食いは表面だけでは見逃しが発生するため、裏面や別角度画像の追加が必要",
    "精度だけでなく、全粒を集中して見る作業から候補だけ確認する作業へ変えられる可能性がある",
    "AI補助の価値は時間短縮だけではなく、判断疲れや作業強度を下げることにもある",
    "100均の42仕切りケースを使うことで、撮影作業自体を効率化できる可能性がある",
  ],

  media: [
    {
      type: "image",
      src: "/logs/defect-beans-ai-002/img/IMG_2989.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/defect-beans-ai-002/img/IMG_2990.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/defect-beans-ai-002/img/IMG_2991.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/defect-beans-ai-002/img/IMG_2992.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/defect-beans-ai-002/img/broken_chipped_01.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/defect-beans-ai-002/img/broken_chipped_02.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/defect-beans-ai-002/img/broken_chipped_03.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/defect-beans-ai-002/img/broken_chipped_04.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/defect-beans-ai-002/img/dark_brown_01.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/defect-beans-ai-002/img/dark_brown_02.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/defect-beans-ai-002/img/dark_brown_03.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/defect-beans-ai-002/img/dark_brown_04.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/defect-beans-ai-002/img/insect_mold_01.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/defect-beans-ai-002/img/insect_mold_02.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/defect-beans-ai-002/img/insect_mold_03.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/defect-beans-ai-002/img/insect_mold_04.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/defect-beans-ai-002/img/insect_mold_05.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/defect-beans-ai-002/img/peaberry_01.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/defect-beans-ai-002/img/peaberry_02.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/defect-beans-ai-002/img/peaberry_03.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/defect-beans-ai-002/img/peaberry_04.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/defect-beans-ai-002/img/small_01.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/defect-beans-ai-002/img/yellow_white_01.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/defect-beans-ai-002/img/yellow_white_02.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/defect-beans-ai-002/img/yellow_white_03.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/defect-beans-ai-002/img/yellow_white_04.jpg",
      caption: "",
    },
  ],

  log: [
    {
      role: "user",
      text: "そうね、何なら紙の場合並べてる時点で、あこれ虫食いだとか気づく",
    },
    {
      role: "user",
      text: "あー、あと豆は全部表向きにそろえてる、targetもreferenceも\nいずれ裏面もつけたいね",
    },
    {
      role: "user",
      text: "あれだよね、targetとreference同時に裏面追加したほうがいいよね\nreferenceだけ裏面あると、変に認識しちゃうかな",
    },
    {
      role: "user",
      text: "これはやってみないとだなー\nやっぱり全部手作業とどれくらい時間減るかはわかんないとこだね\nでも、作業の種類が変わるから、なんだろ作業強度的に楽になるとかはあるかも\n時間でなくて",
    },
    {
      role: "user",
      text: "OK、今日はこの辺にしておくかな\n次は虫食い、欠けテストと\nプラケース買えたらそれも試してみるか",
    },
  ],

  source: {
    chat: {
      title: "画像認識による欠点豆判定",
      url: "https://chatgpt.com/g/g-p-6a44366d52488191bd77c3428f4029ba/c/6a63db33-f310-83e8-a09b-88d062d0467d",
    },
  },

  related: [],
} satisfies Log;
