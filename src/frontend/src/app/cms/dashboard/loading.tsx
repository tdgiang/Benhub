import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="h-14 border-b border-border/50 px-6 flex items-center">
        <Skeleton className="h-5 w-32" />
      </div>
      <main className="flex-1 p-6 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-72" />
          <Skeleton className="h-4 w-52" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-lg" />
          ))}
        </div>
        <Skeleton className="h-64 rounded-lg" />
      </main>
    </div>
  );
}
