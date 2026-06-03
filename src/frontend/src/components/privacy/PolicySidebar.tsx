"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "section-1", label: "1. Mục đích và phạm vi" },
  { id: "section-2", label: "2. Thông tin được thu thập" },
  { id: "section-3", label: "3. Mục đích sử dụng thông tin" },
  { id: "section-4", label: "4. Thời gian lưu trữ" },
  { id: "section-5", label: "5. Đối tượng tiếp cận" },
  { id: "section-6", label: "6. Chia sẻ với bên thứ ba" },
  { id: "section-7", label: "7. Quyền của người dùng" },
  { id: "section-8", label: "8. Bảo mật & Cookie" },
  { id: "section-9", label: "9. Liên hệ & Khiếu nại" },
];

export function PolicySidebar() {
  const [activeId, setActiveId] = useState<string>("section-1");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-24">
        <nav aria-label="Mục lục chính sách">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
            Nội dung
          </p>
          <ul className="space-y-0.5">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={[
                    "block text-sm py-2 px-3 rounded-lg transition-all duration-150",
                    activeId === s.id
                      ? "bg-orange-50 text-orange-600 font-semibold border-l-2 border-orange-500"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-50 border-l-2 border-transparent",
                  ].join(" ")}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
