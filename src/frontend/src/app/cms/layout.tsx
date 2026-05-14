import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Sidebar } from "@/components/cms/Sidebar";

export default async function CmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const { name, email, image } = session.user;

  return (
    <div className="flex min-h-screen bg-muted/20">
      <Sidebar
        userName={name}
        userEmail={email}
        userImage={image}
      />
      <div className="flex-1 pl-60 flex flex-col">
        {children}
      </div>
    </div>
  );
}
