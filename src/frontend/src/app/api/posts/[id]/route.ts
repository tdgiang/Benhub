/**
 * Single post CRUD — in-memory storage.
 * Replace with backend proxy when PostsModule is implemented.
 */
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import type { Post } from "@/types";
import { slugify } from "@/lib/utils";
import { postsStore } from "@/lib/posts-store";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = postsStore.find((p) => p.id === id);
  if (!post) {
    return NextResponse.json({ message: "Không tìm thấy bài viết" }, { status: 404 });
  }
  return NextResponse.json({ data: post });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = (await request.json()) as Partial<Post>;
  const idx = postsStore.findIndex((p) => p.id === id);

  if (idx === -1) {
    return NextResponse.json({ message: "Không tìm thấy bài viết" }, { status: 404 });
  }

  postsStore[idx] = {
    ...postsStore[idx],
    ...body,
    slug: body.title ? (body.slug || slugify(body.title)) : postsStore[idx].slug,
    updatedAt: new Date(),
  };

  return NextResponse.json({ data: postsStore[idx] });
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const idx = postsStore.findIndex((p) => p.id === id);
  if (idx === -1) {
    return NextResponse.json({ message: "Không tìm thấy bài viết" }, { status: 404 });
  }

  postsStore.splice(idx, 1);
  return NextResponse.json({ data: { id } });
}
