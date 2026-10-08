import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getServerBackendBaseUrl } from "@/lib/server-backend-url";

const BACKEND = getServerBackendBaseUrl();

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { search } = new URL(request.url);
  const res = await fetch(`${BACKEND}/api/v1/leads${search}`, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${session.accessToken}` },
  });
  const body = await res.json();
  return NextResponse.json(body, { status: res.status });
}
