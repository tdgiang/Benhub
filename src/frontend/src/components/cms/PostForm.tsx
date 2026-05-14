"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Save } from "lucide-react";
import type { Post } from "@/types";
import { slugify } from "@/lib/utils";

const postSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được để trống").max(200, "Tiêu đề tối đa 200 ký tự"),
  slug: z.string().min(1, "Slug không được để trống").regex(/^[a-z0-9-]+$/, "Slug chỉ được chứa chữ thường, số và dấu gạch ngang"),
  content: z.string().min(1, "Nội dung không được để trống"),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

type PostFormValues = z.infer<typeof postSchema>;

interface PostFormProps {
  post?: Partial<Post>;
  onSubmit: (data: PostFormValues) => Promise<void>;
}

export function PostForm({ post, onSubmit }: PostFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title ?? "",
      slug: post?.slug ?? "",
      content: post?.content ?? "",
      status: (post?.status as "DRAFT" | "PUBLISHED") ?? "DRAFT",
    },
  });

  const currentStatus = watch("status");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue("title", value);
    // Auto-generate slug only if slug is currently empty
    if (!watch("slug")) {
      setValue("slug", slugify(value));
    }
  };

  const handleFormSubmit = async (data: PostFormValues) => {
    try {
      await onSubmit(data);
      toast.success(post?.id ? "Đã cập nhật bài viết" : "Đã tạo bài viết mới");
      router.push("/cms/posts");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} id="post-form">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Thông tin bài viết</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="post-title">Tiêu đề *</Label>
                <Input
                  id="post-title"
                  placeholder="Nhập tiêu đề bài viết..."
                  {...register("title")}
                  onChange={handleTitleChange}
                  disabled={isSubmitting}
                />
                {errors.title && (
                  <p className="text-xs text-destructive">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="post-slug">Slug</Label>
                <Input
                  id="post-slug"
                  placeholder="url-slug"
                  {...register("slug")}
                  disabled={isSubmitting}
                />
                {errors.slug ? (
                  <p className="text-xs text-destructive">{errors.slug.message}</p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    URL: /posts/{watch("slug") || "..."}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="post-content">Nội dung *</Label>
                <textarea
                  id="post-content"
                  className="w-full min-h-[300px] rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-y disabled:opacity-50"
                  placeholder="Nhập nội dung bài viết..."
                  {...register("content")}
                  disabled={isSubmitting}
                />
                {errors.content && (
                  <p className="text-xs text-destructive">{errors.content.message}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Xuất bản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Trạng thái</Label>
                <div className="flex gap-2">
                  {(["DRAFT", "PUBLISHED"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      id={`post-status-${s.toLowerCase()}`}
                      onClick={() => setValue("status", s)}
                      className="flex-1"
                      disabled={isSubmitting}
                    >
                      <Badge
                        variant={currentStatus === s ? "default" : "outline"}
                        className="w-full justify-center py-1 cursor-pointer"
                      >
                        {s === "DRAFT" ? "Nháp" : "Xuất bản"}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <Button type="submit" id="post-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Đang lưu...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      {post?.id ? "Cập nhật" : "Tạo bài viết"}
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  id="post-cancel-btn"
                  onClick={() => router.push("/cms/posts")}
                  disabled={isSubmitting}
                >
                  Hủy
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
