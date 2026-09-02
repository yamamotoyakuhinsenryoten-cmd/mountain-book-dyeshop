import { execFileSync } from "child_process";
import { generateLogMedia } from "@/lib/log-media/generateLogMedia";

const logName = process.argv[2];

if (!logName) {
  console.log("ログ名を指定してください");
  console.log("例: npx tsx scripts/generate-log-media.ts baisen-009");
  process.exit(1);
}

try {
  const media = generateLogMedia(logName);

  const output = media
    .map(
      (item) => `  {
    type: "${item.type}",
    src: "${item.src}",
    caption: "${item.caption}",
  }`,
    )
    .join(",\n");

  console.log(output);

  execFileSync(
    "powershell",
    ["-NoProfile", "-Command", "$input | Set-Clipboard"],
    {
      input: output,
      encoding: "utf-8",
    },
  );

  console.log("\nクリップボードにコピーしました");
} catch (error) {
  console.error("エラー:", error instanceof Error ? error.message : error);
  process.exit(1);
}
