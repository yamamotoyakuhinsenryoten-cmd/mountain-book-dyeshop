import { NextResponse } from "next/server";
import { logs } from "@/data/logs";
import type { Log } from "@/data/logs/types";
import { authorizeLogApi } from "./auth";

function getSearchableText(log: Log): string {
  const fields = [log.title, log.category];

  if ("approach" in log) fields.push(log.approach ?? "");
  if ("result" in log && log.result) fields.push(log.result);
  if ("details" in log) {
    for (const detail of log.details) {
      fields.push(detail.label, detail.value);
    }
  }
  if ("insights" in log) fields.push(...log.insights);
  if ("next" in log && log.next) fields.push(...log.next);

  if (log.type === "development") {
    fields.push(log.purpose, log.policy, ...log.steps);
    for (const item of log.execution) {
      fields.push(item.title, item.body);
    }
  }

  return fields.join(" ").toLowerCase();
}

export async function GET(request: Request) {
  const authError = authorizeLogApi(request);
  if (authError) return authError;

  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q")?.trim().toLowerCase();
  const category = searchParams.get("category");
  const limitParam = searchParams.get("limit");

  // カテゴリで絞り込み
  let result = [...logs];

  if (category) {
    result = result.filter((log) => log.category === category);
  }

  if (query) {
    result = result.filter((log) => getSearchableText(log).includes(query));
  }

  // createdAt の降順（新しい順）
  result.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  // 最新から指定件数を取得
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

  // 一覧表示に必要な情報だけ返す
  return NextResponse.json(
    result.map((log) => ({
      slug: log.slug,
      type: log.type,
      createdAt: log.createdAt,
      title: log.title,
      category: log.category,
    })),
  );
}
