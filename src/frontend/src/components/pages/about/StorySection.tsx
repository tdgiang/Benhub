import { useTranslations } from "next-intl";
import { FadeUp } from "@/components/ui/FadeUp";

type TimelineState = "done" | "active" | "future";

const TIMELINE: { year: string; key: string; state: TimelineState }[] = [
  { year: "2023", key: "tl_2023", state: "done" },
  { year: "2024", key: "tl_2024", state: "done" },
  { year: "2025", key: "tl_2025", state: "active" },
  { year: "2026", key: "tl_2026", state: "future" },
  { year: "2027+", key: "tl_2027", state: "future" },
];

export function StorySection() {
  const t = useTranslations("AboutUs");

  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      {/* Chapter number watermark */}
      <div
        className="pointer-events-none absolute -right-8 top-8 select-none font-black leading-none text-slate-100"
        style={{
          fontFamily: "var(--font-barlow), system-ui, sans-serif",
          fontSize: "clamp(10rem, 20vw, 22rem)",
        }}
        aria-hidden="true"
      >
        01
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[3fr_2fr] lg:gap-24">
          {/* Left */}
          <FadeUp>
            {/* Label */}
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-8 bg-[#F0B429]" />
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#F0B429]">
                {t("story_label")}
              </p>
            </div>

            <h2
              className="font-black leading-[1.0] tracking-tight text-[#0F2246]"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
                fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
              }}
            >
              {t("story_h2_1")}
              <br />
              <span style={{ color: "#F0B429" }}>{t("story_h2_2")}</span>
            </h2>

            <div className="mt-10 space-y-6">
              {/* Paragraph 1 */}
              <div className="flex gap-4">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0F2246] text-[10px] font-black text-white">
                  1
                </div>
                <p className="text-base leading-[1.85] text-slate-600">{t("story_p1")}</p>
              </div>
              {/* Paragraph 2 */}
              <div className="flex gap-4">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0F2246] text-[10px] font-black text-white">
                  2
                </div>
                <p className="text-base leading-[1.85] text-slate-600">{t("story_p2")}</p>
              </div>
              {/* Pull quote */}
              <div
                className="ml-10 rounded-r-2xl border-l-4 py-4 pl-5 pr-4"
                style={{ borderLeftColor: "#F0B429", background: "rgba(240,180,41,0.06)" }}
              >
                <p
                  className="text-lg font-bold leading-snug text-[#0F2246]"
                  style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
                >
                  &ldquo;{t("story_p3")}&rdquo;
                </p>
              </div>
            </div>
          </FadeUp>

          {/* Right — timeline */}
          <FadeUp delay={180}>
            <div className="relative">
              {/* Track */}
              <div className="absolute left-[11px] top-2 bottom-2 w-0.5 rounded-full bg-slate-100" />
              {/* Progress */}
              <div
                className="absolute left-[11px] top-2 w-0.5 rounded-full"
                style={{ height: "48%", background: "linear-gradient(to bottom, #F0B429, #C8941A)" }}
              />

              <div className="space-y-6">
                {TIMELINE.map((item) => (
                  <div key={item.year} className="flex items-start gap-4">
                    {/* Dot */}
                    <div
                      className="relative z-10 flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full border-2 transition-transform duration-200"
                      style={
                        item.state === "active"
                          ? { background: "#F0B429", borderColor: "#F0B429" }
                          : item.state === "done"
                          ? { background: "#0F2246", borderColor: "#0F2246" }
                          : { background: "white", borderColor: "#E2E8F0" }
                      }
                    >
                      {(item.state === "done" || item.state === "active") && (
                        <svg viewBox="0 0 10 8" className="h-2.5 w-2.5 fill-none stroke-white stroke-2">
                          <polyline points="1,4 4,7 9,1" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>

                    {/* Content */}
                    <div className="pb-2 pt-0.5">
                      <span
                        className="block text-sm font-black leading-none"
                        style={{ color: item.state === "active" ? "#F0B429" : item.state === "done" ? "#0F2246" : "#94A3B8" }}
                      >
                        {item.year}
                        {item.state === "active" && (
                          <span
                            className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold"
                            style={{ background: "rgba(240,180,41,0.12)", color: "#F0B429" }}
                          >
                            NOW
                          </span>
                        )}
                      </span>
                      <p
                        className="mt-1.5 text-sm leading-relaxed"
                        style={{ color: item.state !== "future" ? "#475569" : "#94A3B8" }}
                      >
                        {t(item.key as Parameters<typeof t>[0])}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
