"use client";

import { seeds } from "@/data/seeds";
import { buildLogPrompt } from "@/utils/prompt";
import { useState } from "react";

type SeedDetailProps = {
  seed: (typeof seeds)[number];
  slug: string;
};

export default function SeedDetail({ seed, slug }: SeedDetailProps) {
  const [logType, setLogType] = useState<"work" | "experience" | "development">(
    "work",
  );
  const [promptSlug, setPromptSlug] = useState(
    slug === "generate-log" ? "" : slug,
  );
  const [chatTitle, setChatTitle] = useState("");
  const [chatUrl, setChatUrl] = useState("");

  const handleCopy = async () => {
    const prompt = await buildLogPrompt(
      logType,
      promptSlug,
      chatTitle,
      chatUrl,
    );

    await navigator.clipboard.writeText(prompt);
  };

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-xl mb-8">{seed.title}</h1>

      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-base">プロンプトを生成</h2>

          <div className="space-y-3">
            <label className="block text-sm text-gray-700">
              Type
              <select
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                value={logType}
                onChange={(event) =>
                  setLogType(
                    event.target.value as "work" | "experience" | "development",
                  )
                }
              >
                <option value="work">Work</option>
                <option value="experience">Experience</option>
                <option value="development">Development</option>
              </select>
            </label>
            <label className="block text-sm text-gray-700">
              slug
              <input
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                value={promptSlug}
                onChange={(event) => setPromptSlug(event.target.value)}
              />
            </label>

            <label className="block text-sm text-gray-700">
              Chat Title
              <input
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                value={chatTitle}
                onChange={(event) => setChatTitle(event.target.value)}
              />
            </label>

            <label className="block text-sm text-gray-700">
              Chat URL
              <input
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                type="url"
                value={chatUrl}
                onChange={(event) => setChatUrl(event.target.value)}
              />
            </label>

            <button
              className="rounded bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              onClick={handleCopy}
            >
              プロンプトをコピー
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
