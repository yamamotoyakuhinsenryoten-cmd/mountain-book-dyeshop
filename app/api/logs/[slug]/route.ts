import { NextResponse } from "next/server";
import { logs } from "@/data/logs";
import { authorizeLogApi } from "../auth";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(request: Request, { params }: RouteContext) {
  const authError = authorizeLogApi(request);
  if (authError) return authError;

  const { slug } = await params;

  const log = logs.find((item) => item.slug === slug);

  if (!log) {
    return NextResponse.json(
      { error: "ログが見つかりません" },
      { status: 404 },
    );
  }

  return NextResponse.json(log);
}
