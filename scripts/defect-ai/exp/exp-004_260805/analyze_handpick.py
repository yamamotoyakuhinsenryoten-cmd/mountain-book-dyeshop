from openai import OpenAI
from dotenv import load_dotenv
from pathlib import Path
import base64
from datetime import datetime

load_dotenv("../../.env")

client = OpenAI()


def encode_image(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")


def image_content(path):
    return {
        "type": "input_image",
        "image_url": f"data:image/jpeg;base64,{encode_image(path)}"
    }


# 参考画像
reference_dir = Path("reference")
reference_images = list(reference_dir.glob("*.jpg"))

# 判定対象
target_dir = Path("target")
target_images = sorted(target_dir.glob("*.jpg"))


content = []

content.append({
    "type": "input_text",
    "text": """
あなたは家庭焙煎のハンドピック補助AIです。

目的は一般的な欠点豆分類ではなく、
私が過去にハンドピックで判断した基準に近づけることです。

以下の参考画像は、私の判断基準を示すサンプルです。

参考画像のルール：

画像内の番号は以下の意味です。

01〜05：
正常豆（残す基準）

06〜07：
明確な欠点豆
通常は除去対象となる強い特徴がある豆

08〜09：
軽度の欠点豆
欠点の特徴はあるが、状態によって判断が分かれる豆

10：
判断境界の豆
欠点の可能性はあるが、残すか除去するか迷うレベルの豆

これらを比較し、私のハンドピック判断基準に合わせて判定してください。

正常豆との違いを比較し、
今回の判定対象を判断してください。

重要：
- 明確な欠点がない場合、無理に分類しないでください。
- AI分類は空欄でも構いません。
- 「小さい豆」「形状異常」などは、単独の特徴だけで判断せず、周囲の豆との比較で判断してください。
- 迷う場合は「判断迷い」を使用してください。

分類は必ず次の6種類のみを使用してください。

- 虫食い・カビ疑い
- 黒っぽい変色
- 黄色・白っぽい
- ピーベリー
- 割れ・欠け
- 小さい豆

判断は必ず次の3種類のみを使用してください。

- 残す
- 判断迷い
- 除去

判定対象の画像について、豆ごとに判定してください。
画像が複数ある場合、同じ番号の豆は異なる角度から撮影したものです。複数画像を合わせて判断してください。

出力はTSV形式にしてください。
コードブロック（```）は使用しないでください。
説明文や前置きは不要です。
1行目はヘッダー、2行目以降はデータのみ出力してください。

列は必ず以下の順番にしてください。

No	私判断	私分類	AI判断	AI分類	AIメモ	判断一致	再確認結果

私判断、私分類、判断一致、再確認結果は空欄のままにしてください。
これらは後から人間が入力します。
AI判断には「残す」「判断迷い」「除去」のいずれかを記入してください。

AI分類には上記6分類のみを使用してください。
該当する欠点がない場合は空欄にしてください。
複数該当する場合は「, 」区切りで記入してください。

AIメモには判断理由を簡潔に記入してください。

再確認結果は空欄にしてください。

出力例

No	私判断	私分類	AI判断	AI分類	AIメモ	判断一致	再確認結果
1			残す		形状良好、目立つ欠点なし		
2			判断迷い	小さい豆	やや小さいため再確認推奨		
3			除去	割れ・欠け	側面の欠けが明瞭	

説明文や前置き、まとめは不要です。
表だけを出力してください。
"""
})


# 過去データ追加
for img in reference_images:
    content.append({
        "type": "input_text",
        "text": f"参考画像: {img.name}"
    })
    content.append(image_content(img))


# 判定画像追加
content.append({
    "type": "input_text",
    "text": """
以下が今回判定する豆です。

複数画像があります。
複数画像は同じ豆群を別角度から撮影したものです。
同じ豆を探しながら、両方の画像情報を合わせて判断してください。
"""
})

for img in target_images:
    content.append({
        "type": "input_text",
        "text": f"判定画像: {img.name}"
    })
    content.append(image_content(img))
response = client.responses.create(
    model="gpt-5-mini",
    input=[
        {
            "role": "user",
            "content": content
        }
    ]
)

result = f"""
{response.output_text}
"""


Path("result.tsv").write_text(
    result,
    encoding="utf-8"
)

print(result)