import { NextResponse } from "next/server";

export function authorizeLogApi(request: Request): NextResponse | null {
  const apiKey = process.env.LOG_API_KEY;

  if (!apiKey) {
    console.error("LOG_API_KEY is not configured");
    return NextResponse.json(
      { error: "サーバーの認証設定に問題があります" },
      { status: 500 },
    );
  }

  if (request.headers.get("authorization") !== `Bearer ${apiKey}`) {
    return NextResponse.json({ error: "認証に失敗しました" }, { status: 401 });
  }

  return null;
}
