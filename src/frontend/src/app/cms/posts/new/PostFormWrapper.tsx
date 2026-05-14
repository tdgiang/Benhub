"use client";

import { PostForm } from "@/components/cms/PostForm";
import { ApiError } from "@/lib/api";

export function PostFormWrapper() {
  const handleSubmit = async (data: Parameters<React.ComponentProps<typeof PostForm>["onSubmit"]>[0]) => {
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const body = await res.json();
    if (!res.ok) throw new ApiError(res.status, body.message ?? "Tạo bài viết thất bại");
  };

  return <PostForm onSubmit={handleSubmit} />;
}
