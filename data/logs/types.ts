export type Media = {
  type: "image" | "video";
  src: string;
  caption?: string;
};

export type LogEntry = {
  role: "user" | "assistant";
  text: string;
};

export type Related =
  | { kind: "external"; title: string; url: string }
  | { kind: "log"; title: string; slug: string }
  | { kind: "backlog"; title: string; id: string };

export type Log = {
  slug: string;
  type: "work";
  createdAt: string;
  info: {
    title: string;
    category: string;
    details: { label: string; value: string }[];
  };
  media: Media[];
  log: LogEntry[];
  source?: string;
  related: Related[];
};

type LegacyLog = {
  slug: string;
  title: string;
  category: string;
  date: string;
  type: string;
  text?: string;
  info?: { label: string; value: string }[];
  content?: ({ type: string; src?: string; caption?: string; text?: string } | undefined)[];
  comments?: ({ text: string } | undefined)[];
  nexts?: ({ text: string } | undefined)[];
  links?: { name: string; link: string }[];
};

/** Converts the existing hand-written records to the current Log shape. */
export function migrateLegacyLog(legacy: LegacyLog): Log {
  const media = (legacy.content ?? []).flatMap((item) =>
    item && (item.type === "image" || item.type === "video") && item.src
      ? [{ type: item.type, src: item.src, ...(item.caption ? { caption: item.caption } : {}) } as Media]
      : [],
  );
  const messages = [
    ...(legacy.text ? [{ role: "assistant" as const, text: legacy.text }] : []),
    ...(legacy.content ?? []).flatMap((item) =>
      item?.type === "text" && item.text ? [{ role: "assistant" as const, text: item.text }] : [],
    ),
    ...(legacy.comments ?? []).flatMap((item) =>
      item?.text ? [{ role: "assistant" as const, text: item.text }] : [],
    ),
    ...(legacy.nexts ?? []).flatMap((item) =>
      item?.text ? [{ role: "assistant" as const, text: `次に試すこと: ${item.text}` }] : [],
    ),
  ];
  const related: Related[] = (legacy.links ?? []).flatMap<Related>((item) => {
    if (!item.name || !item.link) return [];
    const logMatch = item.link.match(/^\/logs\/([^/]+)$/);
    return logMatch
      ? [{ kind: "log" as const, title: item.name, slug: logMatch[1] }]
      : [{ kind: "external" as const, title: item.name, url: item.link }];
  });

  return {
    slug: legacy.slug,
    type: "work",
    createdAt: legacy.date,
    info: { title: legacy.title, category: legacy.category, details: legacy.info ?? [] },
    media,
    log: messages,
    related,
  };
}
