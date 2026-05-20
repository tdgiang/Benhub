import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getServerBackendBaseUrl } from "@/lib/server-backend-url";

const BACKEND = getServerBackendBaseUrl();

export async function GET(request: NextRequest) {
  const { search } = new URL(request.url);
  const res = await fetch(`${BACKEND}/api/v1/posts${search}`, {
    cache: "no-store",
  });
  const body = await res.json();
  return NextResponse.json(body, { status: res.status });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const res = await fetch(`${BACKEND}/api/v1/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
