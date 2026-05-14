"use client";

import { PostForm } from "@/components/cms/PostForm";
import { ApiError } from "@/lib/api";
import type { Post } from "@/types";

export function EditPostFormWrapper({ post }: { post: Post }) {
  const handleSubmit = async (data: Parameters<React.ComponentProps<typeof PostForm>["onSubmit"]>[0]) => {
    const res = await fetch(`/api/posts/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const body = await res.json();
    if (!res.ok) throw new ApiError(res.status, body.message ?? "Cập nhật bài viết thất bại");
  };

  return <PostForm post={post} onSubmit={handleSubmit} />;
}
