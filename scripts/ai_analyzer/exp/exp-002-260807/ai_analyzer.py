from openai import OpenAI
from dotenv import load_dotenv
from pathlib import Path
import base64
import os


load_dotenv("../../.env")

client = OpenAI()


def encode_image(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")


def image_content(path):
    suffix = Path(path).suffix.lower()

    if suffix in [".png"]:
        mime = "image/png"
    else:
        mime = "image/jpeg"

    return {
        "type": "input_image",
        "image_url": f"data:{mime};base64,{encode_image(path)}"
    }


def text_content(path):
    text = Path(path).read_text(
        encoding="utf-8"
    )

    return {
        "type": "input_text",
        "text": text
    }


def file_content(path):
    path = Path(path)

    if path.suffix.lower() in [
        ".jpg",
        ".jpeg",
        ".png"
    ]:
        return image_content(path)

    elif path.suffix.lower() in [
        ".txt",
        ".md"
    ]:
        return text_content(path)

    else:
        raise ValueError(
            f"対応していない形式です: {path}"
        )


def analyze(files, prompt):

    content = []

    content.append({
        "type": "input_text",
        "text": prompt
    })

    for file in files:
        content.append({
            "type": "input_text",
            "text": f"資料: {file}"
        })

        content.append(
            file_content(file)
        )

    response = client.responses.create(
        model=os.getenv(
            "OPENAI_MODEL",
            "gpt-5-mini"
        ),
        input=[
            {
                "role": "user",
                "content": content
            }
        ]
    )

    return response.output_text


if __name__ == "__main__":

    # A: 画像だけ
    # files = [
    #     "images/sample.jpg"
    # ]

    # B: OCRテキストだけ
    files = [
        "texts/sample.txt"
    ]

    # C: 画像 + OCR
    # files = [
    #     "images/sample.jpg",
    #     "texts/sample.txt"
    # ]


    prompt = """
これはモーニングページです。

以下を行ってください。

1. 内容を整理してください。
2. 繰り返し出てくるテーマを抽出してください。
3. 思考や関心の傾向を分析してください。
4. 後から読み返す価値がある気づきをまとめてください。

文字起こしが不自然な箇所は、
無理に補完せず文脈から判断してください。
"""


    result = analyze(
        files,
        prompt
    )


    Path("output").mkdir(
        exist_ok=True
    )

    Path(
        "output/result.md"
    ).write_text(
        result,
        encoding="utf-8"
    )


    print(result)