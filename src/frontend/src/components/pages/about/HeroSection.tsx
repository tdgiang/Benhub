import { useTranslations } from "next-intl";
import { StatCounter } from "@/components/ui/StatCounter";

export function HeroSection() {
  const t = useTranslations("AboutUs");

  const stats = [
    { value: "5000", suffix: "+", label: t("hero_s1_label") },
    { value: "10", suffix: "+", label: t("hero_s2_label") },
    { value: "6", suffix: "", label: t("hero_s3_label") },
    { value: t("hero_s4_val"), suffix: "", label: t("hero_s4_label") },
  ] as const;

  return (
    <section className="relative overflow-hidden bg-[#0A1628]" style={{ minHeight: "92vh" }}>
      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 0%, black, transparent)",
        }}
      />
      {/* Gold orb top-left */}
      <div className="pointer-events-none absolute -left-48 top-0 h-[600px] w-[600px] rounded-full opacity-20 blur-[140px]" style={{ background: "#F0B429" }} />
      {/* Blue orb right */}
      <div className="pointer-events-none absolute -right-32 top-1/4 h-[500px] w-[500px] rounded-full opacity-10 blur-[120px]" style={{ background: "#3B82F6" }} />
      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0A1628] to-transparent" />

      <div className="relative flex flex-col" style={{ minHeight: "calc(92vh - 1px)" }}>
        {/* Main content */}
        <div className="flex flex-1 flex-col justify-center px-4 pb-8 pt-32 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            {/* Label pill */}
            <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border px-4 py-2"
              style={{ borderColor: "rgba(240,180,41,0.3)", background: "rgba(240,180,41,0.08)" }}>
              <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: "#F0B429" }} />
              <span className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "#F0B429" }}>
                {t("hero_label")}
              </span>
            </div>

            {/* Headline */}
            <h1
              className="max-w-5xl font-black leading-[0.92] tracking-tight"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
                fontSize: "clamp(3.2rem, 9vw, 7.5rem)",
              }}
            >
              <span className="block text-white">{t("hero_h1_1")}</span>
              <span className="block" style={{ color: "rgba(255,255,255,0.45)" }}>{t("hero_h1_2")}</span>
              <span className="block" style={{ color: "#F0B429" }}>{t("hero_h1_accent")}</span>
            </h1>

            {/* Sub */}
            <p
              className="mt-8 max-w-2xl text-lg leading-relaxed"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {t("hero_sub")}
            </p>

            {/* Scroll hint */}
            <div className="mt-12 flex items-center gap-3">
              <div className="flex h-8 w-5 items-start justify-center rounded-full border pt-1.5" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
                <div className="h-1.5 w-1 animate-bounce rounded-full bg-white/40" />
              </div>
              <span className="text-xs font-medium tracking-wider text-white/30 uppercase">Cuộn để khám phá</span>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="px-6 py-7 transition-colors duration-200 hover:bg-white/[0.02]"
                  style={{
                    borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.07)" : undefined,
                  }}
                >
                  <StatCounter value={s.value} suffix={s.suffix} label={s.label} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
