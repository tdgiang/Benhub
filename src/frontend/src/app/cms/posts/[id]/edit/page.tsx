import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { Topbar } from "@/components/cms/Topbar";
import { EditPostFormWrapper } from "./EditPostFormWrapper";
import type { Post } from "@/types";

export const metadata: Metadata = {
  title: "Chỉnh sửa bài viết — CMS",
};

async function getPost(id: string): Promise<Post | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/posts/${id}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    const { data } = await res.json();
    return data ?? null;
  } catch {
    return null;
  }
}

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const { id } = await params;
  const post = await getPost(id);

  if (!post) notFound();

  return (
    <>
      <Topbar
        title="Chỉnh sửa bài viết"
        userName={session?.user?.name}
        userEmail={session?.user?.email}
        userImage={session?.user?.image}
      />
      <main className="flex-1 p-6">
        <EditPostFormWrapper post={post} />
      </main>
    </>
  );
}
