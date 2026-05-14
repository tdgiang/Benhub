import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { Topbar } from "@/components/cms/Topbar";
import { PostFormWrapper } from "./PostFormWrapper";

export const metadata: Metadata = {
  title: "Tạo bài viết — CMS",
};

export default async function NewPostPage() {
  const session = await auth();

  return (
    <>
      <Topbar
        title="Tạo bài viết mới"
        userName={session?.user?.name}
        userEmail={session?.user?.email}
        userImage={session?.user?.image}
      />
      <main className="flex-1 p-6">
        <PostFormWrapper />
      </main>
    </>
  );
}
