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

export type ChatSource = {
  title: string;
  url: string;
};

export type Log = {
  slug: string;
  type: "work";
  createdAt: string;
  info: {
    title: string;
    category: string;
    details: { label: string; value: string }[];
  };
  insights: string[];
  media: Media[];
  log: LogEntry[];
  source?: {
    chat: ChatSource;
  };
  related: Related[];
};
