import fs from "fs";
import path from "path";

const mediaTypes = [
  {
    dir: "img",
    type: "image" as const,
    extensions: [".jpg", ".jpeg", ".png", ".webp"],
  },
  {
    dir: "vid",
    type: "video" as const,
    extensions: [".mp4", ".mov", ".webm"],
  },
];

type LogMedia = {
  type: "image" | "video";
  src: string;
  caption: string;
};

export function generateLogMedia(logName: string): LogMedia[] {
  if (!logName) {
    throw new Error("ログ名を指定してください");
  }

  const media: LogMedia[] = [];

  mediaTypes.forEach(({ dir, type, extensions }) => {
    const mediaDir = path.join("public", "logs", logName, dir);

    if (!fs.existsSync(mediaDir)) {
      return;
    }

    normalizeExtension(mediaDir);

    const files = fs
      .readdirSync(mediaDir)
      .filter((file) => extensions.includes(path.extname(file).toLowerCase()))
      .sort();

    files.forEach((file) => {
      media.push({
        type,
        src: `/logs/${logName}/${dir}/${file}`,
        caption: "",
      });
    });
  });

  return media;
}

function normalizeExtension(dir: string) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
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
