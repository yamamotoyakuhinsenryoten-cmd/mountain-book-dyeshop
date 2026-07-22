const clipboard = require("clipboardy").default;
const fs = require("fs");
const path = require("path");

const logName = process.argv[2];

if (!logName) {
  console.log("ログ名を指定してください");
  console.log("例: node generate-media.js baisen-009");
  process.exit(1);
}

const mediaTypes = [
  {
    dir: "img",
    type: "image",
    extensions: [".jpg", ".jpeg", ".png", ".webp"],
  },
  {
    dir: "vid",
    type: "video",
    extensions: [".mp4", ".mov", ".webm"],
  },
];

const media = [];

mediaTypes.forEach(({ dir, type, extensions }) => {
  const mediaDir = path.join(
    "public",
    "logs",
    logName,
    dir
  );

  if (!fs.existsSync(mediaDir)) {
    return;
  }

  normalizeExtension(mediaDir);
  
  const files = fs.readdirSync(mediaDir)
    .filter(file =>
      extensions.includes(
        path.extname(file).toLowerCase()
      )
    )
    .sort();

  files.forEach(file => {
    media.push({
      type,
      src: `/logs/${logName}/${dir}/${file}`,
      caption: "",
    });
  });
});

const output = JSON.stringify(media, null, 2);

console.log(output);

clipboard.writeSync(output);

console.log("\nクリップボードにコピーしました");


function normalizeExtension(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const oldPath = path.join(dir, file);

    const ext = path.extname(file);
    const base = path.basename(file, ext);

    const newExt = ext.toLowerCase();

    if (ext !== newExt) {
      const newPath = path.join(dir, base + newExt);
      fs.renameSync(oldPath, newPath);

      console.log(`${file} → ${base + newExt}`);
    }
  });
}
