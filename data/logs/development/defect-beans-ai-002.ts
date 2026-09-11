import type { DevelopmentLog } from "../types";

export const defectbeansai002 = {
  slug: "defect-beans-ai-002",
  type: "development",
  createdAt: "2026-08-05",

  title: "AIによるハンドピック補助 #2 | referenceの改善と判定精度の検証",
  category: "AI",

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

  purpose: `前回作成した欠点豆判定AIについて、参考画像（reference）の改善と複数画像による判定精度の変化を確認する。
AIに完全自動選別させるのではなく、自分のハンドピック判断に近い基準で「再確認する豆」を絞り込むことを目指す。`,

  policy: `AIに「これが欠点豆」という単純な例だけを渡すのではなく、自分の判断基準に近い比較情報を参考画像として与える。
完全自動で欠点豆を除去するのではなく、怪しい豆を抽出して人間が最終確認する用途を前提として検証する。`,

  steps: [
    "reference画像の構成を見直す",
    "実際のハンドピック豆で再検証する",
    "判定結果を確認する",
    "判定精度と作業への効果を確認する",
    "課題となる欠点の判定を追加検証する",
  ],

  execution: [
    {
      title: "reference画像の構成を見直す",
      body: `前回の結果から、AIの判断基準となる参考画像を変更した。

- 欠点豆だけを集めた画像から、正常豆と欠点豆を混ぜた比較形式へ変更
- 虫食いを「明らかな虫食い」「微妙な虫食い」「判断に迷うレベル」に段階分け
- 小さい豆は、小さい豆だけの画像ではなく通常サイズとの比較ができる構成へ変更
- 形状異常は曖昧なものではなく、他分類に当てはまらないものへ整理`,
    },
    {
      title: "実際のハンドピック豆で再検証する",
      body: `実際のハンドピック対象に近い豆42粒で判定した。

撮影条件：
- 豆はすべて表向き
- 真上画像＋45度画像
- 同じ豆を複数方向から確認`,
    },
    {
      title: "判定結果を確認する",
      body: `正常豆の判定は安定した一方、判断に迷う豆の抽出が増えた。
虫食い・割れ欠けなど一部の見逃しは残った。
特に判断に迷う豆については、人間判断では「残す」豆でも、AIが再確認対象として拾うケースが多かった。`,
    },
    {
      title: "判定精度と作業への効果を確認する",
      body: `今回の42粒では、AI確認対象が約16粒、そのうち実際に再確認して問題なしだったものが約15粒だった。
すべての豆を見る作業から、AIが抽出した候補を確認する作業へ変えられる可能性がある。
また、全粒を見る集中作業や、判断を繰り返すことによる疲労を減らせる可能性も感じた。`,
    },
    {
      title: "課題となる欠点の判定を追加検証する",
      body: `虫食いでは側面に穴があるものの見逃しが発生し、表面画像だけでは判断できないケースがあった。
割れ・欠けは検知能力があるものの、「除去するレベル」と「残すレベル」の境界が人間基準とずれており、軽微な欠けを過剰検知する傾向があった。`,
    },
  ],

  result: `現在のAI判定は「欠点豆を完全に自動除去する」よりも、「怪しい豆を抽出して人間が確認する」用途のほうが現実的だと分かった。

reference画像を比較形式に変更することで、自分の判断基準に近づける方向性を確認できた。
一方で、虫食いのように側面情報が必要な欠点や、割れ・欠けのように除去基準の境界が曖昧な欠点には課題が残った。

42粒の検証では、AI確認対象を約16粒まで絞り込むことができ、すべてを見る作業から候補を確認する作業へ変えられる可能性が見えた。
AIで人間の判断を置き換えるのではなく、自分の基準で怪しい豆を見つけてもらい、最後の判断だけ人間が行う形が適している。`,

  next: [
    "虫食いを多めに含めた弱点検証用targetで確認する",
    "割れ・欠けについて境界レベルの検証をする",
    "referenceとtargetの両方へ裏面画像を追加して効果を見る",
    "100均の42仕切りケースを使い、撮影作業自体を効率化できるか試す",
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
