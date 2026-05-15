"use client";

export default function LeadsError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex-1 p-6 flex flex-col items-center justify-center gap-4">
      <p className="text-muted-foreground">Không thể tải danh sách leads.</p>
      <button
        onClick={reset}
        className="text-sm text-primary hover:underline"
      >
        Thử lại
      </button>
    </div>
  );
}
