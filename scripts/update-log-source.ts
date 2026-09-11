import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "src/data");

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
    /source: \{\n(\s*)title: "[^"]*",\n(\s*)url: ("[^"]*"),\n(\s*)\},/g,
    `source: {\n$1title: "生成元チャット",\n$1service: "ChatGPT",\n$1url: $2,\n$1},`,
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    updatedCount++;
    console.log(`Updated: ${file}`);
  }
}

console.log(`\n${updatedCount} files updated.`);
