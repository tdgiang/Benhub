import { NextRequest, NextResponse } from "next/server";

const BACKEND = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const res = await fetch(`${BACKEND}/api/v1/posts/slug/${slug}`, {
    cache: "no-store",
  });
  const body = await res.json();
  return NextResponse.json(body, { status: res.status });
}
