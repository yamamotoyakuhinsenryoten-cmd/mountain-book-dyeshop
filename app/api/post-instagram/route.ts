import { NextResponse } from "next/server";
import type { WorkLog, ExperienceLog } from "@/data/logs/types";
import { getMediaUrl } from "@/lib/media";

const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN ?? "";

const API_VERSION = "v24.0";
const BASE_URL = `https://graph.instagram.com/${API_VERSION}`;

type InstagramLog = WorkLog | ExperienceLog;

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
  url.searchParams.set("access_token", ACCESS_TOKEN);

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`ユーザー取得エラー:\n${JSON.stringify(data, null, 2)}`);
  }

  return data.user_id as string;
}

async function waitForFinished(containerId: string) {
  const startTime = Date.now();
  let checkCount = 0;

  // コンテナ作成直後の即時チェックを避ける
  await new Promise((resolve) => setTimeout(resolve, 1000));

  for (let i = 0; i < 30; i++) {
    checkCount++;

    const url = new URL(`${BASE_URL}/${containerId}`);

    url.searchParams.set("fields", "status_code,status");
    url.searchParams.set("access_token", ACCESS_TOKEN);

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `ステータス取得エラー:\n${JSON.stringify(data, null, 2)}`,
      );
    }

    const elapsed = (Date.now() - startTime) / 1000;

    console.log(
      `[Status] ${containerId} / ${data.status_code} / ${elapsed.toFixed(
        1,
      )}秒 / ${checkCount}回目`,
    );

    if (data.status_code === "FINISHED") {
      return {
        elapsed,
        checkCount,
      };
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

async function loadLog(
  logType: "work" | "experience",
  slug: string,
): Promise<InstagramLog> {
  const exportName = slug.replace(/-([0-9]+)$/, "$1");

  const module = await import(`@/data/logs/${logType}/${slug}.ts`);

  const log = module[exportName] as InstagramLog | undefined;

  if (!log) {
    throw new Error(`ログが見つかりません: ${logType}/${slug}`);
  }

  return log;
}

function buildCaption(log: InstagramLog) {
  const details = log.details
    .map((detail) => `${detail.label}: ${detail.value}`)
    .join("\n");

  const insights = log.insights.length
    ? `\n\n${log.insights.map((insight) => `・${insight}`).join("\n")}`
    : "";

  return `${log.title}\n\n${details}${insights}`;
}

export async function POST(request: Request) {
  const totalStartTime = Date.now();

  if (!ACCESS_TOKEN) {
    return NextResponse.json(
      {
        error: "Instagram投稿機能はローカル環境でのみ利用できます",
      },
      { status: 403 },
    );
  }

  try {
    const body = await request.json();

    const slug = body.slug as string;
    const logType = body.logType as "work" | "experience";

    if (!slug) {
      return NextResponse.json(
        { error: "slugを指定してください" },
        { status: 400 },
      );
    }

    if (logType !== "work" && logType !== "experience") {
      return NextResponse.json(
        {
          error: "Instagram投稿はworkまたはexperienceのみ対応しています",
        },
        { status: 400 },
      );
    }

    const log = await loadLog(logType, slug);

    const images = log.media
      .filter((media) => media.type === "image")
      .slice(0, 10)
      .map((media) => ({
        url: getMediaUrl(media.src),
        caption: media.caption ?? "",
      }));

    if (images.length === 0) {
      return NextResponse.json(
        { error: "投稿する画像がありません" },
        { status: 400 },
      );
    }

    console.log(`\n=== Instagram投稿開始 ===`);
    console.log(`slug: ${slug}`);
    console.log(`画像数: ${images.length}`);

    const userId = await getUserId();

    const children: string[] = [];

    // 子コンテナ作成
    // ※ 子コンテナのステータスチェックは行わない
    for (const [index, image] of images.entries()) {
      const imageStartTime = Date.now();

      console.log(`\n[${index + 1}/${images.length}] コンテナ作成開始`);

      const result = await api(`/${userId}/media`, {
        image_url: image.url,
        is_carousel_item: "true",
        access_token: ACCESS_TOKEN,
      });

      children.push(result.id);

      const createElapsed = (Date.now() - imageStartTime) / 1000;

      console.log(
        `[${index + 1}/${images.length}] コンテナ作成完了: ${createElapsed.toFixed(
          1,
        )}秒`,
      );
    }

    // カルーセルコンテナ作成
    const carouselStartTime = Date.now();

    console.log("\nカルーセルコンテナ作成開始");

    const carousel = await api(`/${userId}/media`, {
      media_type: "CAROUSEL",
      children: children.join(","),
      caption: buildCaption(log),
      access_token: ACCESS_TOKEN,
    });

    const carouselCreateElapsed = (Date.now() - carouselStartTime) / 1000;

    console.log(
      `カルーセルコンテナ作成完了: ${carouselCreateElapsed.toFixed(1)}秒`,
    );

    // カルーセルコンテナのみステータス確認
    const carouselStatus = await waitForFinished(carousel.id);

    console.log(
      `カルーセルFINISHED: ${carouselStatus.elapsed.toFixed(
        1,
      )}秒 / ステータス確認${carouselStatus.checkCount}回`,
    );

    // Instagramへ公開
    console.log("\nInstagramへ公開中");

    const published = await api(`/${userId}/media_publish`, {
      creation_id: carousel.id,
      access_token: ACCESS_TOKEN,
    });

    const totalElapsed = (Date.now() - totalStartTime) / 1000;

    console.log("\n=== Instagram投稿完了 ===");
    console.log(`合計処理時間: ${totalElapsed.toFixed(1)}秒`);
    console.log(`画像数: ${images.length}`);
    console.log(`mediaId: ${published.id}`);

    return NextResponse.json({
      success: true,
      mediaId: published.id,
      slug: log.slug,
      imageCount: images.length,
      elapsedSeconds: Number(totalElapsed.toFixed(1)),
    });
  } catch (error) {
    const totalElapsed = (Date.now() - totalStartTime) / 1000;

    console.error("Instagram投稿エラー:", error);
    console.error(`エラーまでの経過時間: ${totalElapsed.toFixed(1)}秒`);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Instagramへの投稿に失敗しました",
      },
      { status: 500 },
    );
  }
}
