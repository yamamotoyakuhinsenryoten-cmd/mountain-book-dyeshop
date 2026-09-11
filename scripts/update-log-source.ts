import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data/logs/work");

const files = fs
  .readdirSync(dataDir)
  .filter((file) => file.endsWith(".ts"))
  .filter((file) => file !== "seeds.ts")
  .filter((file) => file !== "types.ts");

let updatedCount = 0;

for (const file of files) {
  const filePath = path.join(dataDir, file);
  let content = fs.readFileSync(filePath, "utf-8");

  const original = content;

  content = content.replace(
    /source:\s*\{\s*title:\s*"[^"]*",\s*url:\s*"([^"]*)",\s*\}/g,
    `source: {
    title: "生成元チャット",
    service: "ChatGPT",
    url: "$1",
  }`,
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    updatedCount++;
    console.log(`Updated: ${file}`);
  }
}

console.log(`\n${updatedCount} files updated.`);
