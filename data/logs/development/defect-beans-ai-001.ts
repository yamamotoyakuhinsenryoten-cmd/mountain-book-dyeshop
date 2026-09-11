import type { DevelopmentLog } from "../types";

export const defectbeansai001 = {
  slug: "defect-beans-ai-001",
  type: "development",
  createdAt: "2026-08-04",
  title: "AIによるハンドピック補助 #1 | AI画像判定の検証",
  category: "AI",

  media: [
    {
      type: "image",
      src: "/logs/defect-beans-ai-001/img/top.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/defect-beans-ai-001/img/angle45.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/defect-beans-ai-001/img/angle45_2.jpg",
      caption: "",
    },
    {
      type: "image",
      src: "/logs/defect-beans-ai-001/img/angle45_3.jpg",
      caption: "",
    },
  ],

  purpose: `手鍋焙煎では150g程度の豆でもハンドピックに15分ほどかかる。
この作業をAIで補助できないか試してみる。
AIによる完全自動判定ではなく、自分のハンドピック判断を補助する存在を目指す。`,

  policy: `自分が過去に除去した欠点豆を分類し、それぞれを参考画像としてAIに与えて判定させる。
ChatGPTへ直接画像を送る方法ではなく、OpenAI APIを利用して判定環境を作り、自分の判断とAIの判定結果を比較できるようにする。
画像の撮影条件や参考画像の作り方を変えながら、どのような条件で自分の判断に近づけられるかを確認する。`,

  steps: [
    "過去に除去した欠点豆を分類する",
    "分類した欠点豆を参考画像として撮影する",
    "AIによる画像判定環境を作成する",
    "真上から撮影した1枚画像で判定する",
    "判定結果を自分の判断と比較する",
    "必要に応じて撮影条件を変更する",
  ],

  execution: [
    {
      title: "過去に除去した欠点豆を分類する",
      body: `自分が過去に除去した欠点豆を分類した。

分類：
- 虫食い・カビ疑い
- 黒っぽい変色
- 黄色・白っぽい
- ピーベリー
- 割れ・欠け
- 小さい豆
- 形状異常・シワなど`,
    },
    {
      title: "分類した欠点豆を参考画像として撮影する",
      body: `分類ごとに白い紙の上へ並べて撮影し、AIへ参考画像として渡した。`,
    },
    {
      title: "AIによる画像判定環境を作成する",
      body: `ChatGPTへ直接画像を送る方法では制限があるため、PythonからOpenAI APIを利用して画像判定する仕組みを作った。
判定結果はTSV形式で出力し、スプレッドシートで自分の判断と比較できるようにした。`,
    },
    {
      title: "真上から撮影した1枚画像で判定する",
      body: `最初は真上から撮影した1枚画像で判定した。

- 全体的な異常検知はできた
- 虫食いなど側面情報が必要な欠点は見逃した`,
    },
    {
      title: "判定結果を自分の判断と比較する",
      body: `AIの判定結果と自分の判断を比較したところ、側面情報が必要な欠点について判定できないケースがあった。`,
    },
    {
      title: "必要に応じて撮影条件を変更する",
      body: `側面情報が必要な欠点を判定できるよう、45度方向の画像を追加した。

- 判断一致率は改善した
- ただし過剰検知も発生した`,
    },
  ],

  result: `AIによって「怪しい豆を探す」ことはできた。
一方で、自分と同じ判断をさせるには参考画像の作り方が重要であることが分かった。
特に、虫食いは多様なサンプルが必要で、小さい豆は単体画像ではなく正常豆との比較が必要だった。
現時点では完全自動判定ではなく、自分のハンドピック判断を補助する用途として進めるのが適している。`,

  next: [
    "虫食いサンプルを増やす",
    "小さい豆の参考画像を比較形式に変更する",
    "100均の小分けケースで撮影方法を改善する",
    "AIによる判定をハンドピックの補助としてどこまで実用化できるか試す",
  ],

  source: {
    title: "生成元チャット",
    service: "ChatGPT",
    url: "https://chatgpt.com/g/g-p-6a44366d52488191bd77c3428f4029ba/c/6a63db33-f310-83e8-a09b-88d062d0467d",
  },

  related: [
    {
      kind: "external",
      title: "スプシでの判定結果比較",
      url: "https://docs.google.com/spreadsheets/d/1BhEU1omFTI2ujuKsAljStusFpkxolnG-IIu_ro9j4XU/edit?gid=0#gid=0",
    },
  ],
} satisfies DevelopmentLog;
