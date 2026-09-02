import { readFile, writeFile } from "fs/promises";
import path from "path";

import { downloadLogMedia } from "@/lib/log-media/downloadLogMedia";
import { generateLogMedia } from "@/lib/log-media/generateLogMedia";

export const runtime = "nodejs";

const validLogTypes = ["work", "experience", "development"] as const;

export async function POST(request: Request) {
  try {
    const { slug, logType } = await request.json();

    if (!slug || !logType) {
      return Response.json(
        {
          error: "slugとlogTypeを指定してください",
        },
        { status: 400 },
      );
    }

    if (!validLogTypes.includes(logType)) {
      return Response.json(
        {
          error: "不正なlogTypeです",
        },
        { status: 400 },
      );
    }

    await downloadLogMedia(slug);

    const media = generateLogMedia(slug);

    const filePath = path.join(
      process.cwd(),
      "data",
      "logs",
      logType,
      `${slug}.ts`,
    );

    let code = await readFile(filePath, "utf-8");

    const mediaCode = media
      .map(
        (item) => `    {
      type: "${item.type}",
      src: "${item.src}",
      caption: "${item.caption}",
    }`,
      )
      .join(",\n");

    const mediaBlock = `media: [\n${mediaCode}\n  ],`;

    const mediaRegex = /media:\s*\[[\s\S]*?\n\s*\],/;

    if (!mediaRegex.test(code)) {
      throw new Error("ログTSにmedia配列が見つかりませんでした");
    }

    code = code.replace(mediaRegex, mediaBlock);

    await writeFile(filePath, code, "utf-8");

    return Response.json({
      success: true,
      media,
      filePath,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "メディアの追加に失敗しました",
      },
      { status: 500 },
    );
  }
}
