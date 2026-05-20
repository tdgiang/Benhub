import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getServerBackendBaseUrl } from "@/lib/server-backend-url";

const BACKEND = getServerBackendBaseUrl();

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const res = await fetch(`${BACKEND}/api/v1/posts/${id}`, { cache: "no-store" });
  const body = await res.json();
  return NextResponse.json(body, { status: res.status });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const res = await fetch(`${BACKEND}/api/v1/posts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const res = await fetch(`${BACKEND}/api/v1/posts/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${session.accessToken}` },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
