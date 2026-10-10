import { NextResponse } from "next/server";
import { logs } from "@/data/logs";
import type { Log } from "@/data/logs/types";
import { authorizeLogApi } from "./auth";

function normalizeSearchText(value: string): string {
  return value.normalize("NFKC").toLocaleLowerCase("ja-JP").replace(/\s+/gu, "");
}

function getSearchableText(log: Log): string {
  const fields = [log.title, log.category];

  if ("approach" in log) fields.push(log.approach ?? "");
  if ("result" in log && log.result) fields.push(log.result);
  if ("details" in log) {
    for (const detail of log.details) fields.push(detail.label, detail.value);
  }
  if ("insights" in log) fields.push(...log.insights);
  if ("next" in log && log.next) fields.push(...log.next);
  fields.push(...log.media.map((media) => media.caption ?? ""));
  fields.push(...log.related.map((related) => related.title));

  if (log.type === "development") {
    fields.push(log.purpose, log.policy, ...log.steps);
    for (const item of log.execution) fields.push(item.title, item.body);
  }

  return normalizeSearchText(fields.join(" "));
}

export async function GET(request: Request) {
  const authError = authorizeLogApi(request);
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const rawQuery = searchParams.get("q")?.trim() ?? "";
  const keywords = rawQuery
    .split(/[\s、,，。・|｜]+/u)
    .map(normalizeSearchText)
    .filter(Boolean);
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const limitParam = searchParams.get("limit");

  let result = logs
    .filter((log) => !category || log.category === category)
    .map((log) => {
      const searchableText = getSearchableText(log);
      const matchCount = keywords.filter((keyword) => searchableText.includes(keyword)).length;
      return { log, matchCount };
    })
    .filter(({ matchCount }) => keywords.length === 0 || matchCount > 0);

  result.sort((a, b) => {
    if (sort !== "recent" && keywords.length > 0 && a.matchCount !== b.matchCount) {
      return b.matchCount - a.matchCount;
    }
    return b.log.createdAt.localeCompare(a.log.createdAt);
  });

  if (limitParam !== null) {
    const limit = Number(limitParam);
    if (!Number.isInteger(limit) || limit < 1) {
      return NextResponse.json(
        { error: "limit は1以上の整数を指定してください" },
        { status: 400 },
      );
    }
    result = result.slice(0, Math.min(limit, 100));
  }

  return NextResponse.json(
    result.map(({ log }) => ({
      slug: log.slug,
      type: log.type,
      createdAt: log.createdAt,
      title: log.title,
      category: log.category,
    })),
  );
}