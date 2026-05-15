"use client";

import { useEffect, useRef, useState } from "react";

export function StatCounter({
  value,
  suffix = "",
  label,
  dark = true,
}: {
  value: string;
  suffix?: string;
  label: string;
  dark?: boolean;
}) {
  const isNumeric = /^\d+$/.test(value.replace(/,/g, ""));
  const numericEnd = isNumeric ? parseInt(value.replace(/,/g, ""), 10) : 0;

  const [count, setCount] = useState(isNumeric ? 0 : numericEnd);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!isNumeric) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400;
          const startTime = Date.now();
          const tick = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * numericEnd));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { rootMargin: "-40px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [isNumeric, numericEnd]);

  const displayValue = isNumeric ? count.toLocaleString("vi-VN") : value;

  return (
    <div ref={ref} className="text-center">
      <div
        className={`font-black leading-none ${dark ? "text-white" : "text-[#0F2246]"}`}
        style={{
          fontFamily: "var(--font-barlow), system-ui, sans-serif",
          fontSize: "clamp(2rem, 4vw, 3rem)",
        }}
      >
        {displayValue}
        {suffix}
      </div>
      <div className={`mt-1 text-sm font-medium ${dark ? "text-slate-400" : "text-slate-500"}`}>
        {label}
      </div>
    </div>
  );
}
