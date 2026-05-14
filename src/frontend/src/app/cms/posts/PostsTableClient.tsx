"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/cms/DataTable";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import type { Post } from "@/types";
import { formatDate } from "@/lib/utils";

export function PostsTableClient() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/posts");
      const { data } = await res.json();
      setPosts(data.items ?? []);
    } catch {
      toast.error("Không thể tải danh sách bài viết");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const columns = [
    {
      key: "title" as keyof Post,
      label: "Tiêu đề",
    },
    {
      key: "status" as keyof Post,
      label: "Trạng thái",
      render: (value: Post[keyof Post]) => (
        <Badge variant={value === "PUBLISHED" ? "default" : "secondary"}>
          {value === "PUBLISHED" ? "Đã xuất bản" : "Nháp"}
        </Badge>
      ),
    },
    {
      key: "createdAt" as keyof Post,
      label: "Ngày tạo",
      render: (value: Post[keyof Post]) => formatDate(value as Date),
    },
  ];

  const handleEdit = (post: Post) => {
    router.push(`/cms/posts/${post.id}/edit`);
  };

  const handleDelete = async (post: Post) => {
    try {
      const res = await fetch(`/api/posts/${post.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Xóa thất bại");
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
      toast.success(`Đã xóa bài viết "${post.title}"`);
    } catch {
      toast.error("Không thể xóa bài viết, vui lòng thử lại");
    }
  };

  return (
    <DataTable
      columns={columns}
      data={posts}
      isLoading={loading}
      searchable
      searchKeys={["title", "status"]}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
