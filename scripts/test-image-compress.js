const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ROOT = "public/logs";
const OUTPUT_ROOT = "public/logs-compressed";

const MAX_SIZE = 2400;
const QUALITY = 85;

async function run() {
  const files = [];

  function walk(dir) {
    for (const name of fs.readdirSync(dir)) {
      const filePath = path.join(dir, name);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        walk(filePath);
      } else if (/\.(jpg|jpeg)$/i.test(name)) {
        files.push(filePath);
      }
    }
  }

  walk(ROOT);

  console.log(`対象画像: ${files.length}枚`);
  console.log(`設定: 最大辺 ${MAX_SIZE}px / JPEG品質 ${QUALITY}`);
  console.log(`出力先: ${OUTPUT_ROOT}`);
  console.log("");

  let beforeTotal = 0;
  let afterTotal = 0;
  let successCount = 0;
  let skipCount = 0;

  const skipped = [];

  for (const file of files) {
    const relativePath = path.relative(ROOT, file);
    const outputFile = path.join(OUTPUT_ROOT, relativePath);

    const outputDir = path.dirname(outputFile);

    fs.mkdirSync(outputDir, { recursive: true });

    const before = fs.statSync(file).size;
    beforeTotal += before;

    try {
      await sharp(file)
        .rotate()
        .resize({
          width: MAX_SIZE,
          height: MAX_SIZE,
          fit: "inside",
          withoutEnlargement: true,
        })
        .jpeg({
          quality: QUALITY,
          mozjpeg: true,
        })
        .toFile(outputFile);

      const after = fs.statSync(outputFile).size;
      afterTotal += after;
      successCount++;

      const beforeMB = before / 1024 / 1024;
      const afterMB = after / 1024 / 1024;
      const reduction = (1 - after / before) * 100;

      console.log(
        `${beforeMB.toFixed(2)} MB → ${afterMB.toFixed(2)} MB  ` +
          `${reduction.toFixed(1)}%  ${file}`,
      );
    } catch (error) {
      afterTotal += before;
      skipCount++;

      skipped.push({
        file,
        reason: error.code || error.message,
      });

      console.log(`SKIP  ${file}  (${error.code || error.message})`);
    }
  }

  console.log("");
  console.log("=== 完了 ===");
  console.log(`成功: ${successCount}枚`);
  console.log(`スキップ: ${skipCount}枚`);

  const beforeGB = beforeTotal / 1024 / 1024 / 1024;
  const afterGB = afterTotal / 1024 / 1024 / 1024;
  const reduction = beforeTotal > 0 ? (1 - afterTotal / beforeTotal) * 100 : 0;

  console.log("");
  console.log(`変換前: ${beforeGB.toFixed(3)} GB`);
  console.log(`変換後: ${afterGB.toFixed(3)} GB`);
  console.log(`削減率: ${reduction.toFixed(1)}%`);

  if (skipped.length > 0) {
    console.log("");
    console.log("=== スキップされた画像 ===");

    for (const item of skipped) {
      console.log(`${item.reason}  ${item.file}`);
    }
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});


