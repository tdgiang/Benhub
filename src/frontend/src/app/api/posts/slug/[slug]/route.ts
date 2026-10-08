import { NextRequest, NextResponse } from "next/server";
import { getServerBackendBaseUrl } from "@/lib/server-backend-url";

const BACKEND = getServerBackendBaseUrl();

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
