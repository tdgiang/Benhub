/**
 * Local Next.js API route for posts.
 *
 * Currently uses in-memory storage (resets on server restart).
 * When the backend PostsModule is ready, replace the handlers below
 * with proxy calls to `${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts`.
 */
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import type { Post } from "@/types";
import { slugify } from "@/lib/utils";
import { postsStore } from "@/lib/posts-store";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") as Post["status"] | null;
  const slug = searchParams.get("slug");
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "10");

  let results = [...postsStore];
  if (status) results = results.filter((p) => p.status === status);
  if (slug) results = results.filter((p) => p.slug === slug);

  const total = results.length;
  const items = results.slice((page - 1) * limit, page * limit);

  return NextResponse.json({
    data: { items, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } },
  });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as Partial<Post>;

  if (!body.title?.trim()) {
    return NextResponse.json({ message: "Tiêu đề không được để trống" }, { status: 400 });
  }

  const slug = body.slug?.trim() || slugify(body.title);
  if (postsStore.some((p) => p.slug === slug)) {
    return NextResponse.json({ message: "Slug đã tồn tại" }, { status: 409 });
  }

  const newPost: Post = {
    id: crypto.randomUUID(),
    title: body.title.trim(),
    slug,
    content: body.content ?? "",
    status: body.status ?? "DRAFT",
    authorId: session.user.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  postsStore.push(newPost);
  return NextResponse.json({ data: newPost }, { status: 201 });
}
