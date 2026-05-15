import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";
import { auth } from "@/lib/auth";

const UPLOAD_DIR = join(process.cwd(), "public", "uploads");
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

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

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { message: "Chỉ chấp nhận ảnh JPG, PNG, WebP, GIF" },
      { status: 400 },
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { message: "File quá lớn (tối đa 10 MB)" },
      { status: 400 },
    );
  }

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const filename = `${randomUUID()}.${ext}`;

  await mkdir(UPLOAD_DIR, { recursive: true });

  const bytes = await file.arrayBuffer();
  await writeFile(join(UPLOAD_DIR, filename), Buffer.from(bytes));

  return NextResponse.json({ url: `/uploads/${filename}` });
}
