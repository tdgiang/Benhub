import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// In Docker: INTERNAL_API_URL=http://backend:4000
// In aaPanel (direct): defaults to http://localhost:4000
const BACKEND_URL = process.env.INTERNAL_API_URL || "http://localhost:4000";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ message: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ message: "Không tìm thấy file" }, { status: 400 });
  }

  const outForm = new FormData();
  outForm.append("file", file, file.name);

  let res: Response;
  try {
    res = await fetch(`${BACKEND_URL}/api/v1/uploads`, {
      method: "POST",
      headers: { Authorization: `Bearer ${session.accessToken}` },
      body: outForm,
    });
  } catch {
    return NextResponse.json({ message: "Không kết nối được backend" }, { status: 502 });
  }

  const body = await res.json();
  if (!res.ok) {
    return NextResponse.json(
      { message: body?.message ?? "Upload thất bại" },
      { status: res.status },
    );
  }

  return NextResponse.json({ url: body.data?.url });
}
