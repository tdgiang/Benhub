import { useTranslations } from "next-intl";
import { FadeUp } from "@/components/ui/FadeUp";

const TIMELINE = [
  { year: "2023", key: "tl_2023" },
  { year: "2024", key: "tl_2024" },
  { year: "2025", key: "tl_2025" },
  { year: "2026", key: "tl_2026" },
  { year: "2027+", key: "tl_2027" },
] as const;

export function StorySection() {
  const t = useTranslations("AboutUs");

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
          {/* Left — text */}
          <FadeUp>
            <p
              className="mb-4 text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: "#F0B429" }}
            >
              {t("story_label")}
            </p>
            <h2
              className="font-black leading-tight text-[#0F2246]"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
              }}
            >
              {t("story_h2_1")}
              <br />
              {t("story_h2_2")}
            </h2>
            <div className="mt-8 space-y-5">
              <p className="text-base leading-relaxed text-slate-600">{t("story_p1")}</p>
              <p className="text-base leading-relaxed text-slate-600">{t("story_p2")}</p>
              <p className="text-base font-semibold leading-relaxed text-[#0F2246]">
                {t("story_p3")}
              </p>
            </div>
          </FadeUp>

          {/* Right — timeline */}
          <FadeUp delay={150}>
            <div className="relative pl-8">
              {/* Vertical line */}
              <div
                className="absolute left-3 top-2 bottom-2 w-0.5"
                style={{ background: "linear-gradient(to bottom, #F0B429, #1E3A5F)" }}
              />
              <div className="space-y-8">
                {TIMELINE.map((item, i) => (
                  <div key={item.year} className="relative">
                    {/* Dot */}
                    <div
                      className="absolute -left-5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white"
                      style={{ background: i === 2 ? "#F0B429" : "#1E3A5F", top: "2px" }}
                    />
                    <div>
                      <span
                        className="text-sm font-black"
                        style={{ color: i === 2 ? "#F0B429" : "#64748B" }}
                      >
                        {item.year}
                      </span>
                      <p className="mt-0.5 text-sm leading-snug text-slate-700">
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
