"use client";

import { Printer } from "lucide-react";

export function UpdateBanner() {
  return (
    <div className="mt-12 p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-slate-900">
          Chính sách bảo mật thông tin – Benhub
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Ngày ban hành: 01/01/2025 · Có hiệu lực từ: 01/01/2025 · Phiên bản 1.0
        </p>
      </div>
      <button
        onClick={() => window.print()}
        className="flex items-center gap-2 text-sm text-orange-600 border border-orange-200 px-4 py-2 rounded-xl hover:bg-orange-50 transition-colors shrink-0"
      >
        <Printer className="w-4 h-4" />
        In trang này
      </button>
    </div>
  );
}
