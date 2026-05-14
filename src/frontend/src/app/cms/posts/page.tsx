import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { Topbar } from "@/components/cms/Topbar";
import { PostsTableClient } from "@/app/cms/posts/PostsTableClient";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Bài viết — CMS",
};

export default async function PostsPage() {
  const session = await auth();

  return (
    <>
      <Topbar
        title="Bài viết"
        userName={session?.user?.name}
        userEmail={session?.user?.email}
        userImage={session?.user?.image}
      />
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">Quản lý bài viết</h2>
            <p className="text-muted-foreground text-sm mt-0.5">
              Tạo, chỉnh sửa và quản lý tất cả bài viết
            </p>
          </div>
          <Button render={<Link href="/cms/posts/new" />} nativeButton={false} id="create-post-btn">
            <Plus className="w-4 h-4 mr-2" />
            Tạo bài viết
          </Button>
        </div>
        <PostsTableClient />
      </main>
    </>
  );
}
