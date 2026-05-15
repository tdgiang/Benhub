"use client";

import { useRef, useState } from "react";
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
import { ImagePlus, Loader2, Save, X } from "lucide-react";
import type { Post } from "@/types";
import { slugify } from "@/lib/utils";
import { RichTextEditor } from "@/components/cms/RichTextEditor";

const postSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được để trống").max(200, "Tiêu đề tối đa 200 ký tự"),
  slug: z
    .string()
    .min(1, "Slug không được để trống")
    .regex(/^[a-z0-9-]+$/, "Slug chỉ được chứa chữ thường, số và dấu gạch ngang"),
  excerpt: z.string().max(300, "Tóm tắt tối đa 300 ký tự").optional(),
  content: z.string().min(1, "Nội dung không được để trống"),
  coverImage: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

type PostFormValues = z.infer<typeof postSchema>;

interface PostFormProps {
  post?: Partial<Post>;
  onSubmit: (data: PostFormValues) => Promise<void>;
}

export function PostForm({ post, onSubmit }: PostFormProps) {
  const router = useRouter();
  const [slugTouched, setSlugTouched] = useState(!!post?.slug);
  const [uploadingCover, setUploadingCover] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);

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
      excerpt: post?.excerpt ?? "",
      content: post?.content ?? "",
      coverImage: post?.coverImage ?? "",
      status: (post?.status as "DRAFT" | "PUBLISHED") ?? "DRAFT",
    },
  });

  const currentStatus = watch("status");
  const contentValue = watch("content");
  const coverImageValue = watch("coverImage");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue("title", value);
    if (!slugTouched) setValue("slug", slugify(value));
  };

  const handleCoverUpload = async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    setUploadingCover(true);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const body = await res.json();
      if (!res.ok) throw new Error(body.message ?? "Upload thất bại");
      setValue("coverImage", body.url, { shouldValidate: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload ảnh bìa thất bại");
    } finally {
      setUploadingCover(false);
    }
  };

  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleCoverUpload(file);
    e.target.value = "";
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
      {/* Hidden input to register coverImage in RHF */}
      <input type="hidden" {...register("coverImage")} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main — 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Thông tin bài viết</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="post-title">Tiêu đề *</Label>
                <Input
                  id="post-title"
                  placeholder="Nhập tiêu đề bài viết..."
                  {...register("title")}
                  onChange={handleTitleChange}
                  disabled={isSubmitting}
                />
                {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
              </div>

              {/* Slug */}
              <div className="space-y-2">
                <Label htmlFor="post-slug">Slug</Label>
                <Input
                  id="post-slug"
                  placeholder="url-slug"
                  {...register("slug")}
                  onChange={(e) => { register("slug").onChange(e); setSlugTouched(true); }}
                  disabled={isSubmitting}
                />
                {errors.slug ? (
                  <p className="text-xs text-destructive">{errors.slug.message}</p>
                ) : (
                  <p className="text-xs text-muted-foreground">URL: /tin-tuc/{watch("slug") || "..."}</p>
                )}
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <Label htmlFor="post-excerpt">
                  Tóm tắt{" "}
                  <span className="text-muted-foreground font-normal text-xs">(tuỳ chọn, max 300 ký tự)</span>
                </Label>
                <textarea
                  id="post-excerpt"
                  rows={2}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none disabled:opacity-50"
                  placeholder="Mô tả ngắn hiển thị ở danh sách bài viết..."
                  {...register("excerpt")}
                  disabled={isSubmitting}
                />
                {errors.excerpt && <p className="text-xs text-destructive">{errors.excerpt.message}</p>}
              </div>

              {/* Content — TipTap */}
              <div className="space-y-2">
                <Label>Nội dung *</Label>
                <RichTextEditor
                  value={contentValue}
                  onChange={(html) => setValue("content", html, { shouldValidate: true })}
                  placeholder="Nhập nội dung bài viết..."
                  disabled={isSubmitting}
                />
                {errors.content && <p className="text-xs text-destructive">{errors.content.message}</p>}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar — 1/3 */}
        <div className="space-y-6">
          {/* Cover image */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ảnh bìa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <input
                ref={coverInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={handleCoverFileChange}
              />

              {coverImageValue ? (
                <div className="relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coverImageValue}
                    alt="Ảnh bìa"
                    className="w-full aspect-video object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => setValue("coverImage", "", { shouldValidate: true })}
                    className="absolute top-2 right-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                    title="Xóa ảnh bìa"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => coverInputRef.current?.click()}
                    disabled={uploadingCover || isSubmitting}
                    className="mt-2 w-full cursor-pointer rounded-md border border-dashed border-border py-2 text-xs font-medium text-muted-foreground hover:border-orange-400 hover:text-orange-500 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Đổi ảnh
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => coverInputRef.current?.click()}
                  disabled={uploadingCover || isSubmitting}
                  className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/30 py-8 text-sm text-muted-foreground transition-colors hover:border-orange-400 hover:bg-orange-50/50 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {uploadingCover ? (
                    <>
                      <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
                      <span>Đang tải ảnh...</span>
                    </>
                  ) : (
                    <>
                      <ImagePlus className="h-8 w-8" />
                      <span className="font-medium">Nhấn để chọn ảnh bìa</span>
                      <span className="text-xs">JPG, PNG, WebP, GIF · tối đa 10 MB</span>
                    </>
                  )}
                </button>
              )}
            </CardContent>
          </Card>

          {/* Publish */}
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
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Đang lưu...</>
                  ) : (
                    <><Save className="w-4 h-4 mr-2" />{post?.id ? "Cập nhật" : "Tạo bài viết"}</>
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
