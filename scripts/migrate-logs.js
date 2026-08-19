const fs = require("fs");
const path = require("path");
const vm = require("vm");

const logsDir = path.join(process.cwd(), "data", "logs");

function loadLegacyLog(filePath) {
  const source = fs.readFileSync(filePath, "utf8");

  // すでに新形式ならスキップ
  if (source.includes('import type { Log } from "./types"')) {
    return null;
  }

  const transformed = source.replace(
    /export\s+const\s+\w+\s*=/,
    "module.exports =",
  );

  const context = {
    module: { exports: {} },
    exports: {},
  };

  vm.runInNewContext(transformed, context);

  return context.module.exports;
}

function migrateLog(legacy) {
  const media = (legacy.content ?? []).flatMap((item) => {
    if (!item || !["image", "video"].includes(item.type) || !item.src) {
      return [];
    }

    return [
      {
        type: item.type,
        src: item.src,
        ...(item.caption ? { caption: item.caption } : {}),
      },
    ];
  });

  const insights = [
    ...(legacy.comments ?? []).flatMap((item) =>
      item?.text ? [cleanText(item.text)] : [],
    ),
    ...(legacy.nexts ?? []).flatMap((item) =>
      item?.text ? [cleanText(item.text)] : [],
    ),
  ];

  const related = (legacy.links ?? []).flatMap((item) => {
    if (!item.name || !item.link) return [];

    const logMatch = item.link.match(/^\/logs\/([^/]+)$/);

    return logMatch
      ? [
          {
            kind: "log",
            title: item.name,
            slug: logMatch[1],
          },
        ]
      : [
          {
            kind: "external",
            title: item.name,
            url: item.link,
          },
        ];
  });

  return {
    slug: legacy.slug,
    type: legacy.type === "experience" ? "experience" : "work",
    createdAt: legacy.date,
    info: {
      title: legacy.title,
      category: legacy.category,
      details: legacy.info ?? [],
    },
    insights,
    media,
    log: [],
    ...(legacy.source ? { source: legacy.source } : {}),
    related,
  };
}

function cleanText(text) {
  return text
    .replace(/^\s*・\s*/, "")
    .replace(/\s+/g, " ")
    .trim();
}

const files = fs
  .readdirSync(logsDir)
  .filter((file) => file.endsWith(".ts"))
  .filter((file) => file !== "types.ts");

let migrated = 0;
let skipped = 0;

for (const file of files) {
  const filePath = path.join(logsDir, file);

  const legacy = loadLegacyLog(filePath);

  if (!legacy) {
    console.log(`Skipped: ${file}`);
    skipped++;
    continue;
  }

  const log = migrateLog(legacy);

  const variableName = file
    .replace(".ts", "")
    .replace(/-([a-z])/g, (_, c) => c.toUpperCase());

  const output = `import type { Log } from "./types";

export const ${variableName}: Log = ${JSON.stringify(log, null, 2)};
`;

  fs.writeFileSync(filePath, output, "utf8");

  console.log(`Migrated: ${file}`);
  migrated++;
}

console.log("");
console.log(`Migrated: ${migrated}`);
console.log(`Skipped: ${skipped}`);
