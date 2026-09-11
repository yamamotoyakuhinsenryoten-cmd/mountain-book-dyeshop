import type { DevelopmentLog } from "../types";

export const mbdyeshop009 = {
  slug: "mb-dyeshop-009",
  type: "development",
  createdAt: "2026-09-11",
  title: "開発ログの構造化と生成フローの見直し",
  category: "Webサイト構築",

  media: [],

  purpose: `devで使用している開発ログの構造を見直し、Markdown中心の形式から、開発の目的や判断、実行内容、結果、次の方針が分かる構造化されたログへ変更する。
ログのデータ構造だけでなく、表示側や既存ログ、ログ生成プロンプトも新しい形式に合わせて整理する。`,

  policy: `開発ログは、単なる作業履歴ではなく、何を目的として、どのような方針で進め、何を試してどうなったかが分かる形にする。
開発ログはpurpose、policy、steps、execution、result、nextの6セクションで構成し、Work / Experienceログとは異なる形式として扱う。
Markdownを使った自由形式ではなく、TypeScriptの構造化データとして管理する。
実際の運用で問題が出た部分だけ後から調整し、最初から細かく作り込みすぎない方針とした。`,

  steps: [
    "開発ログの新しい6セクション構成を整理する",
    "DevelopmentLogの型を新しい構造に変更する",
    "LogDetailを新しい構造に対応させる",
    "新しい構造に合わせて表示を調整する",
    "既存の開発ログを新形式へ移行する",
    "開発ログ生成プロンプトを新形式に対応させる",
  ],

  execution: [
    {
      title: "開発ログの新しい6セクション構成を整理する",
      body: `開発ログをpurpose、policy、steps、execution、result、nextの6セクションで整理する構成を決めた。
purposeは目的や背景、policyは採用した考え方や方針、stepsは実際の進め方、executionは実行内容、resultは最終的な結果、nextは今後の内容として整理することにした。`,
    },
    {
      title: "DevelopmentLogの型を新しい構造に変更する",
      body: `DevelopmentLogの型をMarkdown形式から新しい6セクション構成へ変更した。
purposeとpolicyとresultはstring、stepsとnextはstring[]、executionはtitleとbodyを持つ配列として定義した。
これまでDevelopmentLogに存在していたmarkdownを削除した。`,
    },
    {
      title: "LogDetailを新しい構造に対応させる",
      body: `LogDetailから開発ログのMarkdown表示を削除し、新しい6セクションを直接表示する形へ変更した。
Work / ExperienceログのInfo / 基本情報とInsight / 考察はそのまま残し、Developmentログだけ新しい構造で表示するようにした。`,
    },
    {
      title: "新しい構造に合わせて表示を調整する",
      body: `開発ログの見出しをPurpose / 目的、Policy / 方針、Steps / 進め方、Execution / 実行、Result / 結果、Next / 次とした。
Executionでは各項目に番号を付け、本文は改行を維持して表示できるようにした。
表示用CSSも新しい構造に合わせて調整した。`,
    },
    {
      title: "既存の開発ログを新形式へ移行する",
      body: `既存の開発ログを新しい6セクション構成へ変換した。
Markdownの内容をそのまま残すのではなく、開発の目的、方針、手順、実行内容、結果、次の作業に整理した。
変換したログの内容を確認し、現在の構造で運用できることを確認した。`,
    },
    {
      title: "開発ログ生成プロンプトを新形式に対応させる",
      body: `開発ログを自動生成するプロンプトを新しい6セクション構成に合わせて変更した。
stepsとexecutionを対応させること、チャットにない事実を追加しないこと、template literal内に不要な空行を入れないことなどをルールとして整理した。
実際のデータサンプルを構造と粒度の参考としてプロンプトに使用する方針とした。`,
    },
  ],

  result: `開発ログをMarkdown中心の形式から、purpose、policy、steps、execution、result、nextの6セクションによる構造化データへ変更した。
DevelopmentLogの型、LogDetailの表示、CSS、既存ログ、ログ生成プロンプトまで新しい構造に合わせて整理できた。
新しいログ生成プロンプトを実際に使った変換テストも行い、現時点ではこの形式で運用できそうだと確認した。
今後は実際のログ生成を続けながら、変換結果の粒度や内容に違和感が出た場合に調整する方針とした。`,

  next: ["実運用で違和感が出た部分があればプロンプトを調整する"],

  source: {
    title: "Webサイトログdev構造見直し",
    url: "https://chatgpt.com/g/g-p-6a44366d52488191bd77c3428f4029ba-dev/c/6a9e5176-e648-83ee-be38-208ab68769d8",
  },

  related: [],
} satisfies DevelopmentLog;
