import { Skeleton } from "@/components/ui/skeleton";

export default function CmsLoading() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Topbar skeleton */}
      <div className="h-14 border-b border-border/50 px-6 flex items-center gap-4">
        <Skeleton className="h-5 w-40" />
        <div className="ml-auto flex gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
      {/* Content skeleton */}
      <main className="flex-1 p-6 space-y-6">
        <Skeleton className="h-8 w-64" />
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
