import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const BACKEND = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { search } = new URL(request.url);
  const res = await fetch(`${BACKEND}/api/v1/leads/export/csv${search}`, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${session.accessToken}` },
  });

  if (!res.ok) {
    return NextResponse.json({ message: "Export thất bại" }, { status: res.status });
  }

  const csv = await res.text();
  const date = new Date().toISOString().slice(0, 10);

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-${date}.csv"`,
    },
  });
}
