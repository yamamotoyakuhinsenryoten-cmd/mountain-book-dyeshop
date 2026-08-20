export type Media = {
  type: "image" | "video";
  src: string;
  caption?: string;
};

export type Related =
  | { kind: "external"; title: string; url: string }
  | { kind: "log"; title: string; slug: string }
  | { kind: "backlog"; title: string; id: string };

type BaseLog = {
  slug: string;
  type: "work" | "experience" | "development";
  createdAt: string;

  title: string;
  category: string;

  media: Media[];

  source?: {
    title: string;
    url: string;
  };

  related: Related[];
};

export type WorkLog = BaseLog & {
  type: "work";
  details: { label: string; value: string }[];
  insights: string[];
};

export type ExperienceLog = BaseLog & {
  type: "experience";
  details: { label: string; value: string }[];
  insights: string[];
};

export type DevelopmentLog = BaseLog & {
  type: "development";
  markdown: string;
};

export type Log = WorkLog | ExperienceLog | DevelopmentLog;
