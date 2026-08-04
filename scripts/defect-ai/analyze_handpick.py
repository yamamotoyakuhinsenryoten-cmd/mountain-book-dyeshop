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
target_image = Path("target/test_beans.jpg")


content = []

content.append({
    "type": "input_text",
    "text": """
あなたは家庭焙煎のハンドピック補助AIです。

以下の参考画像は、私が過去にハンドピックで除去した豆です。
これらを私の判断基準として参考にしてください。

分類は必ず次の7種類のみを使用してください。

- 虫食い・カビ疑い
- 黒っぽい変色
- 黄色・白っぽい
- ピーベリー
- 割れ・欠け
- 小さい豆
- 形状異常・シワなど

判断は必ず次の3種類のみを使用してください。

- 残す
- 判断迷い
- 除去

判定対象の画像について、豆ごとに判定してください。

出力はTSV形式にしてください。
コードブロック（```）は使用しないでください。
説明文や前置きは不要です。
1行目はヘッダー、2行目以降はデータのみ出力してください。

列は必ず以下の順番にしてください。

No	私判断	私分類	AI判断	AI分類	一致	メモ

私判断、私分類、一致は空欄のままにしてください。
AI判断には「残す」「判断迷い」「除去」のいずれかを記入してください。
AI分類には上記7分類のみを使用してください。
複数該当する場合は「, 」区切りで記入してください。
メモには判定理由を簡潔に記入してください。

出力例

No	私判断	私分類	AI判断	AI分類	一致	メモ
1			除去	虫食い・カビ疑い		小さな穴が見られる
2			残す			明らかな欠点なし
3			判断迷い	小さい豆		やや小さいため再確認推奨

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
    "text": "以下が今回判定する豆です。"
})

content.append(image_content(target_image))


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