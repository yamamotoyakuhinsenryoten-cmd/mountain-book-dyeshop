const fs = require("fs");
const path = require("path");
const vm = require("vm");

const logsDir = path.join(process.cwd(), "data", "logs");

const targetFiles = [
  "jinbei-001.ts",
  "obscurecoffee-001.ts",
  "makuracover-001.ts",
];

function loadLegacyLog(filePath) {
  const source = fs.readFileSync(filePath, "utf8");

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

function cleanText(text) {
  return text
    .replace(/^\s*・\s*/, "")
    .replace(/\s+/g, " ")
    .trim();
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

for (const file of targetFiles) {
  const filePath = path.join(logsDir, file);

  if (!fs.existsSync(filePath)) {
    console.error(`Not found: ${file}`);
    continue;
  }

  try {
    const legacy = loadLegacyLog(filePath);
    const log = migrateLog(legacy);

    const variableName = file
      .replace(".ts", "")
      .replace(/-([a-z])/g, (_, c) => c.toUpperCase());

    const output = `import type { Log } from "./types";

export const ${variableName}: Log = ${JSON.stringify(log, null, 2)};
`;

    fs.writeFileSync(filePath, output, "utf8");

    console.log(`Migrated: ${file}`);
  } catch (error) {
    console.error(`Failed: ${file}`);
    console.error(error);
  }
}
