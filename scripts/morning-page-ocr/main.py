from pathlib import Path
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload


SCOPES = [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/documents.readonly",
]


def get_services():
    flow = InstalledAppFlow.from_client_secrets_file(
        "credentials.json",
        SCOPES
    )

    creds = flow.run_local_server(port=0)

    drive = build(
        "drive",
        "v3",
        credentials=creds
    )

    docs = build(
        "docs",
        "v1",
        credentials=creds
    )

    return drive, docs


def upload_and_ocr(drive, image_path):

    file_metadata = {
        "name": Path(image_path).stem,
        "mimeType": "application/vnd.google-apps.document",
    }

    media = MediaFileUpload(
        image_path,
        mimetype="image/jpeg"
    )

    file = drive.files().create(
        body=file_metadata,
        media_body=media,
        fields="id"
    ).execute()

    return file["id"]


def get_document_text(docs, document_id):

    document = docs.documents().get(
        documentId=document_id
    ).execute()

    text = ""

    for element in document.get("body", {}).get("content", []):

        if "paragraph" in element:

            for item in element["paragraph"]["elements"]:

                if "textRun" in item:

                    text += item["textRun"]["content"]

    return text


def main():

    drive, docs = get_services()

    image_dir = Path("images")
    output_dir = Path("output")

    output_dir.mkdir(
        exist_ok=True
    )

    for image_path in image_dir.glob("*.jpg"):

        output_path = output_dir / f"{image_path.stem}.txt"

        # すでにOCR済みならスキップ
        if output_path.exists():
            print(
                "スキップ:",
                image_path.name
            )
            continue

        print(
            "OCR開始:",
            image_path.name
        )

        document_id = upload_and_ocr(
            drive,
            str(image_path)
        )

        text = get_document_text(
            docs,
            document_id
        )

        output_path.write_text(
            text,
            encoding="utf-8"
        )

        print(
            "保存:",
            output_path
        )


if __name__ == "__main__":
    main()