import pandas as pd
import json
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI()

INPUT_FILE = "input.csv"
OUTPUT_FILE = "output.csv"

CATEGORIES = [
    "食費",
    "日用品",
    "子ども",
    "家電・PC",
    "趣味",
    "コーヒー",
    "裁縫・手芸",
    "衣類",
    "美容・健康",
    "交通",
    "その他"
]


def classify_item(row):
    merchant = row.get("merchant_normalized", "")
    product = row.get("product_name", "")
    amount = row.get("amount", "")

    prompt = f"""
以下の支出を家計分析用に分類してください。

カテゴリ候補:
{", ".join(CATEGORIES)}

店舗:
{merchant}

商品:
{product}

金額:
{amount}

必ずJSON形式で返してください。

例:
{{
  "category": "コーヒー"
}}
"""

    response = client.chat.completions.create(
        model="gpt-5-mini",
        response_format={"type": "json_object"},
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    result = json.loads(
        response.choices[0].message.content
    )

    return result["category"]


def main():
    df = pd.read_csv(INPUT_FILE)

    df["category"] = df.apply(
        classify_item,
        axis=1
    )

    df.to_csv(
        OUTPUT_FILE,
        index=False,
        encoding="utf-8-sig"
    )

    print("完了:", OUTPUT_FILE)


if __name__ == "__main__":
    main()