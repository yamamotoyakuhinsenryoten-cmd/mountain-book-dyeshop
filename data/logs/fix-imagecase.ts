export const fixImageCase = {
    slug: "fix-imagecase",
    title: "画像拡張子を小文字化",
    category: "Web",
    thumbnail: "",
    date: "2026-07-13",
    summary: "",

    info: [{label:"問題",value:"サイト内の一部画像が404となり表示されない"},
            {label:"原因",value:'例：IMG_2385.JPGIMG_2344.JPGのように拡張子が大文字のファイルと、IMG_2431.jpgのような小文字のファイルが混在していた。ローカル環境では問題なく表示されていたが、公開環境ではファイル名の大文字・小文字が区別されるため、参照先と実際のファイル名が一致せずエラーになった。'},
            {label:"対応",value:'画像ファイルの拡張子を .jpg に統一した。'},
            


    ],

    content: [
     
    ],
  comments:[],

    nexts:[{text:`・画像ファイル名は追加時から小文字で統一する`},],
    links: [
        {name:"BackLog：表示されない画像がある",link:"/backlogs"},
    ],
  }