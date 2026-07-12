export const fixImageCase = {
    slug: "fix-imagecase",
    title: "画像拡張子を小文字化",
    type:"dev",
    category: "Web",
    thumbnail: "",
    date: "2026-07-13",
    summary: "",
    text:`一部の画像がサイト上で表示されない問題が発生。

GitHub上には画像ファイルが存在していたため、パスや配置を確認したところ、画像ファイルの拡張子の大文字・小文字が原因だった。

ローカル環境では問題なく表示されていたが、公開環境ではファイル名の大文字・小文字が区別されるため、.JPG と .jpg が混在している画像が404になっていた。

対応として、画像ファイルの拡張子を .jpg に統一。

ただし、Windows環境ではファイル名の大文字・小文字だけの変更はGitの差分として認識されない場合があったため、一度別名に変更してからリネームとして認識させた。

今後は画像追加時から拡張子を小文字で統一する。`,
    links: [
        {name:"BackLog：表示されない画像がある",link:"/backlogs"},
    ],

  info: [],
  content: [],
  comments: [],
  nexts: [],
  }