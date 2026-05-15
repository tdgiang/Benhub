import type { Metadata } from "next";
import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { Topbar } from "@/components/cms/Topbar";
import { LeadsTableClient } from "./LeadsTableClient";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = { title: "Leads — CMS" };

function TableSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-20 w-full rounded-lg" />
      <div className="rounded-lg border overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex gap-4 p-3 border-b last:border-0">
            {Array.from({ length: 7 }).map((_, j) => (
              <Skeleton key={j} className="h-4 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function LeadsPage() {
  const session = await auth();

  return (
    <>
      <Topbar
        title="Leads đăng ký"
        userName={session?.user?.name}
        userEmail={session?.user?.email}
        userImage={session?.user?.image}
      />
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">Quản lý Leads</h2>
            <p className="text-muted-foreground text-sm mt-0.5">
              Danh sách đăng ký từ form tài xế và đối tác trên landing page
            </p>
          </div>
        </div>
        <Suspense fallback={<TableSkeleton />}>
          <LeadsTableClient />
        </Suspense>
      </main>
    </>
  );
}
