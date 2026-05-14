import { Skeleton } from "@/components/ui/skeleton";

export default function PostsLoading() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="h-14 border-b border-border/50 px-6 flex items-center">
        <Skeleton className="h-5 w-28" />
      </div>
      <main className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-72" />
          </div>
          <Skeleton className="h-9 w-32 rounded-md" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-10 w-72" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 rounded-md" />
          ))}
        </div>
      </main>
    </div>
  );
}
