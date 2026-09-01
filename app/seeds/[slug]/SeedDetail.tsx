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

  // ChatGPTの回答
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // プロンプト生成
  const buildPrompt = async () => {
    return await buildLogPrompt(logType, promptSlug, chatTitle, chatUrl);
  };

  // プロンプトをコピー
  const handleCopy = async () => {
    const prompt = await buildPrompt();

    await navigator.clipboard.writeText(prompt);
  };

  // ChatGPTで実行
  const handleRun = async () => {
    const prompt = await buildPrompt();

    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch("/api/run-chatgpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          chatUrl,
          logType,
          slug: promptSlug,
        }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();

      setAnswer(data.answer);
    } catch (error) {
      console.error(error);
      setAnswer("エラーが発生しました");
    } finally {
      setLoading(false);
    }
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
                <option value="work">work</option>
                <option value="experience">experience</option>
                <option value="development">development</option>
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

            <div className="flex gap-3">
              <button
                className="rounded bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700"
                onClick={handleCopy}
              >
                プロンプトをコピー
              </button>

              <button
                className="rounded bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700 disabled:opacity-50"
                onClick={handleRun}
                disabled={loading}
              >
                {loading ? "実行中..." : "ChatGPTで実行"}
              </button>
            </div>
          </div>
        </section>

        {answer && (
          <section className="space-y-2">
            <h2 className="text-base">ChatGPTの回答</h2>

            <pre className="whitespace-pre-wrap rounded border border-gray-300 p-4 text-sm">
              {answer}
            </pre>
          </section>
        )}
      </div>
    </main>
  );
}
