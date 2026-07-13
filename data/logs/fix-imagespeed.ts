export const fixImageSpeed = {
  slug: "fix-imagespeed",
  title: "画像の読み込みを最適化",
  type: "dev",
  category: "Web",
  thumbnail: "",
  date: "2026-07-13",
  summary: "",
  text: `制作ログ詳細ページで画像表示が遅かった。

原因として、通常のimgタグで画像を読み込んでおり、画像サイズや読み込みタイミングの最適化がされていなかった。
imgからNext.jsのImageコンポーネントへ変更。

変更前：

<img src={item.src} />

変更後：

<Image
  src={item.src}
  alt={item.caption ?? ""}
  width={1200}
  height={800}
/>
詳細ページを開いた時の表示速度が改善した。
`,
  links: [{ name: "BackLog：表示に時間がかかる", link: "/backlogs" }],

  info: [],
  content: [],
  comments: [],
  nexts: [],
};
