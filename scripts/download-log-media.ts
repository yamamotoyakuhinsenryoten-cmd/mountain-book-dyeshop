import { downloadLogMedia } from "@/lib/log-media/downloadLogMedia";

const slug = process.argv[2];

if (!slug) {
  console.log("slugを指定してください");
  console.log("例: npx tsx scripts/download-log-media.ts baisen-012");
  process.exit(1);
}

downloadLogMedia(slug).catch((error) => {
  console.error("エラー:", error instanceof Error ? error.message : error);
  process.exit(1);
});
