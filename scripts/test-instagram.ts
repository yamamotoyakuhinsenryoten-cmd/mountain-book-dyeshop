import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN ?? "";

if (!ACCESS_TOKEN) {
  throw new Error("INSTAGRAM_ACCESS_TOKEN が設定されていません");
}

const API_VERSION = "v24.0";
const BASE_URL = `https://graph.instagram.com/${API_VERSION}`;

// 今回テストする画像
const images = [
  {
    url: "https://mountain-book-dyeshop.vercel.app/logs/baisen-001/IMG_1847.jpg",
    caption: "生豆：ニカラグア\n生豆重量：151g",
  },
  {
    url: "https://mountain-book-dyeshop.vercel.app/logs/baisen-001/IMG_1848.jpg",
    caption: "焙煎：1ハゼ後まで\n焙煎時間：○○分",
  },
  {
    url: "https://mountain-book-dyeshop.vercel.app/logs/baisen-001/IMG_1849.jpg",
    caption: "焙煎後重量：147g\n重量減少率：○○%",
  },
];

async function api(endpoint: string, params: Record<string, string>) {
  const url = new URL(`${BASE_URL}${endpoint}`);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url, {
    method: "POST",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Instagram API Error:\n${JSON.stringify(data, null, 2)}`);
  }

  return data;
}

async function getUserId() {
  const url = new URL(`${BASE_URL}/me`);
  url.searchParams.set("fields", "user_id,username");
  url.searchParams.set("access_token", ACCESS_TOKEN!);

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`ユーザー取得エラー:\n${JSON.stringify(data, null, 2)}`);
  }

  console.log("Instagram account:");
  console.log(data);

  return data.user_id as string;
}

async function waitForFinished(containerId: string) {
  console.log(`Processing: ${containerId}`);

  for (let i = 0; i < 30; i++) {
    const url = new URL(`${BASE_URL}/${containerId}`);

    url.searchParams.set("fields", "status_code,status");
    url.searchParams.set("access_token", ACCESS_TOKEN!);

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `ステータス取得エラー:\n${JSON.stringify(data, null, 2)}`,
      );
    }

    console.log(`  status: ${data.status_code}`);

    if (data.status_code === "FINISHED") {
      return;
    }

    if (data.status_code === "ERROR" || data.status_code === "EXPIRED") {
      throw new Error(
        `Media container failed:\n${JSON.stringify(data, null, 2)}`,
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  throw new Error(`Media container timeout: ${containerId}`);
}

async function main() {
  // --------------------------------------------------
  // 1. Instagramアカウント取得
  // --------------------------------------------------

  const userId = await getUserId();

  console.log(`\nUser ID: ${userId}\n`);

  // --------------------------------------------------
  // 2. 各画像の子コンテナを作成
  // --------------------------------------------------

  const children: string[] = [];

  for (const [index, image] of images.entries()) {
    console.log(`Creating child container ${index + 1}...`);
    console.log(`Image: ${image.url}`);
    console.log(`Caption: ${image.caption}`);

    const result = await api(`/${userId}/media`, {
      image_url: image.url,
      is_carousel_item: "true",

      // ★ 今回の実験ポイント
      caption: image.caption,

      access_token: ACCESS_TOKEN!,
    });

    console.log("Created:", result.id);
    console.log();

    children.push(result.id);

    await waitForFinished(result.id);
  }

  // --------------------------------------------------
  // 3. カルーセルコンテナ作成
  // --------------------------------------------------

  console.log("Creating carousel container...");

  const carousel = await api(`/${userId}/media`, {
    media_type: "CAROUSEL",
    children: children.join(","),

    // 親にもcaptionを入れておく
    caption:
      "Instagram API 複数キャプションテスト\n\n" +
      "各画像に個別captionを設定しています。",

    access_token: ACCESS_TOKEN!,
  });

  console.log("Carousel container:", carousel.id);
  console.log();

  // --------------------------------------------------
  // 4. カルーセル処理完了待ち
  // --------------------------------------------------

  await waitForFinished(carousel.id);

  // --------------------------------------------------
  // 5. 公開
  // --------------------------------------------------

  console.log("Publishing carousel...");

  const published = await api(`/${userId}/media_publish`, {
    creation_id: carousel.id,
    access_token: ACCESS_TOKEN!,
  });

  console.log("\n================================");
  console.log("Instagram投稿完了！");
  console.log("================================");
  console.log(published);
}

main().catch((error) => {
  console.error("\n❌ Error:");
  console.error(error);
  process.exit(1);
});
