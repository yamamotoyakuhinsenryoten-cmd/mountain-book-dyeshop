import type { DevelopmentLog, Log } from "../types";

export const defectbeansai002 = {
  slug: "defect-beans-ai-002",
  type: "development",
  createdAt: "2026-08-05",

  title: "AIによるハンドピック補助 #2 | referenceの改善と判定精度の検証",
  category: "AI",
  markdown: `
# AIによるハンドピック補助 #2 | referenceの改善と判定精度の検証
## やりたいこと

前回作成した欠点豆判定AIについて、
参考画像（reference）の改善と複数画像による判定精度の変化を確認する。

目的はAIに完全自動選別させることではなく、
自分のハンドピック判断に近い基準で「再確認する豆」を絞り込むこと。

## 試したこと1：reference画像の見直し

前回の結果から、AIの判断基準となる参考画像を変更した。

変更点：

- 欠点豆だけを集めた画像ではなく、正常豆と欠点豆を混ぜた比較形式へ変更
- 虫食い：
  - 明らかな虫食い
  - 微妙な虫食い
  - 判断に迷うレベル
  を段階分け
- 小さい豆：
  - 小さい豆だけの画像ではなく、通常サイズとの比較ができる構成へ変更
- 形状異常は曖昧なものではなく、他分類に当てはまらないものへ整理

AIに「これが欠点豆」という単純な例ではなく、
自分の判断基準に近い比較情報を渡すことを意識した。

## 試したこと2：実際のハンドピック豆で再検証

実際のハンドピック対象に近い豆42粒で判定。

撮影条件：

- 豆はすべて表向き
- 真上画像＋45度画像
- 同じ豆を複数方向から確認

結果：

- 正常豆の判定は安定
- 判断迷いの抽出が増えた
- 虫食い・割れ欠けなど一部の見逃しは残った

特に判断迷いについては、
人間判断では「残す」豆でも、
AIが再確認対象として拾うケースが多かった。

## 分かったこと

現在のAI判定は、

「欠点豆を完全に自動除去する」

よりも、

「怪しい豆を抽出して人間が確認する」

用途のほうが現実的。

今回の42粒では：

- AI確認対象：約16粒
- 実際に再確認して問題なし：約15粒

となり、すべてを見る必要から候補確認へ作業を変えられる可能性がある。

また、精度だけではなく、

- 全粒を見る集中作業
- 判断を繰り返す疲労

を減らせる可能性があると感じた。

## 課題

### 虫食い

側面に穴があるものは見逃しが発生。

表面画像だけでは判断できないケースがあるため、
裏面や別角度画像の追加が必要。

### 割れ・欠け

検知能力はあるが、
「除去するレベル」と「残すレベル」の境界が人間基準とずれている。

軽微な欠けを過剰検知する傾向がある。

## 次に試すこと

- 虫食いを多めに含めた弱点検証用targetで確認する
- 割れ・欠けについて境界レベルの検証をする
- referenceとtarget両方へ裏面画像を追加して効果を見る
- 100均の42仕切りケースを使い、撮影作業自体を効率化できるか試す

## 今後の目標

AIで人間の判断を置き換えるのではなく、

「自分の基準で怪しい豆を見つけてもらい、
最後の判断だけ人間が行う」

ハンドピック補助の形を目指す。`,
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

  source: {
    title: "画像認識による欠点豆判定",
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
