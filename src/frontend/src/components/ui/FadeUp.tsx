"use client";

import { useEffect, useRef, useState } from "react";

export function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      await Promise.resolve();
      if (cancelled) return;

      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      reducedMotionRef.current = mq.matches;

      if (mq.matches) {
        setVisible(true);
        return;
      }

      const el = ref.current;
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        },
        { rootMargin: "-60px" },
      );
      obs.observe(el);
      return () => obs.disconnect();
    }

    init();
    return () => { cancelled = true; };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      } ${className}`}
      style={{
        transitionDuration: "650ms",
        transitionDelay: visible && delay ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}
