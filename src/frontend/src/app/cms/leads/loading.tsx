import { Skeleton } from "@/components/ui/skeleton";

export default function LeadsLoading() {
  return (
    <div className="flex-1 p-6">
      <Skeleton className="h-8 w-48 mb-2" />
      <Skeleton className="h-4 w-72 mb-6" />
      <Skeleton className="h-20 w-full rounded-lg mb-4" />
      <div className="rounded-lg border overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
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
