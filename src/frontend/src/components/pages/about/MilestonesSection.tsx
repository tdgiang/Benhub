import { useTranslations } from "next-intl";
import { Check, Clock, Eye } from "lucide-react";
import { FadeUp } from "@/components/ui/FadeUp";

const PHASES = [
  {
    num: "01",
    periodKey: "p1_period",
    titleKey: "p1_title",
    badgeKey: "p1_badge",
    state: "active" as const,
    items: ["p1_k1", "p1_k2", "p1_k3", "p1_k4", "p1_k5"] as const,
  },
  {
    num: "02",
    periodKey: "p2_period",
    titleKey: "p2_title",
    badgeKey: "p2_badge",
    state: "upcoming" as const,
    items: ["p2_k1", "p2_k2", "p2_k3", "p2_k4", "p2_k5"] as const,
  },
  {
    num: "03",
    periodKey: "p3_period",
    titleKey: "p3_title",
    badgeKey: "p3_badge",
    state: "vision" as const,
    items: ["p3_k1", "p3_k2", "p3_k3", "p3_k4", "p3_k5"] as const,
  },
] as const;

const STATE_CONFIG = {
  active: {
    bg: "rgba(240,180,41,0.12)",
    border: "rgba(240,180,41,0.3)",
    numColor: "#F0B429",
    badgeBg: "rgba(240,180,41,1)",
    badgeColor: "#0F2246",
    dotBg: "#F0B429",
    dotIcon: <Check className="h-3 w-3 stroke-[#0F2246] stroke-[3]" />,
  },
  upcoming: {
    bg: "rgba(255,255,255,0.04)",
    border: "rgba(255,255,255,0.1)",
    numColor: "rgba(255,255,255,0.12)",
    badgeBg: "rgba(255,255,255,0.08)",
    badgeColor: "rgba(255,255,255,0.6)",
    dotBg: "rgba(255,255,255,0.15)",
    dotIcon: <Clock className="h-3 w-3 text-white/40" />,
  },
  vision: {
    bg: "rgba(59,130,246,0.06)",
    border: "rgba(59,130,246,0.2)",
    numColor: "rgba(59,130,246,0.3)",
    badgeBg: "rgba(59,130,246,0.15)",
    badgeColor: "rgba(147,197,253,0.9)",
    dotBg: "rgba(59,130,246,0.2)",
    dotIcon: <Eye className="h-3 w-3 text-blue-400/60" />,
  },
} as const;

export function MilestonesSection() {
  const t = useTranslations("AboutUs");

  return (
    <section className="relative overflow-hidden bg-[#050E1F] py-14 md:py-20">
      {/* Scanline overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)",
        }}
      />
      {/* Chapter watermark */}
      <div
        className="pointer-events-none absolute -right-6 top-0 select-none font-black leading-none opacity-[0.025] text-white"
        style={{
          fontFamily: "var(--font-barlow), system-ui, sans-serif",
          fontSize: "clamp(12rem, 25vw, 28rem)",
        }}
        aria-hidden="true"
      >
        05
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8" style={{ background: "rgba(240,180,41,0.5)" }} />
            <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "rgba(240,180,41,0.7)" }}>
              {t("mil_label")}
            </p>
          </div>
          <h2
            className="font-black leading-tight text-white"
            style={{
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
              fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
            }}
          >
            {t("mil_h2")}
          </h2>
        </FadeUp>

        {/* Phases grid */}
        <div className="grid gap-5 lg:grid-cols-3">
          {PHASES.map((phase, i) => {
            const cfg = STATE_CONFIG[phase.state];
            return (
              <FadeUp key={phase.num} delay={i * 130}>
                <div
                  className="relative flex h-full flex-col rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
                  style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
                >
                  {/* Phase number */}
                  <span
                    className="absolute right-6 top-5 font-black leading-none"
                    style={{
                      fontFamily: "var(--font-barlow), system-ui, sans-serif",
                      fontSize: "5rem",
                      color: cfg.numColor,
                    }}
                  >
                    {phase.num}
                  </span>

                  {/* Badge */}
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <span
                      className="rounded-full px-3 py-1 text-xs font-bold"
                      style={{ background: cfg.badgeBg, color: cfg.badgeColor }}
                    >
                      {t(phase.badgeKey as Parameters<typeof t>[0])}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      {t(phase.periodKey as Parameters<typeof t>[0])}
                    </span>
                  </div>

                  {/* Title */}
                  <p
                    className="mb-6 font-black leading-tight text-white"
                    style={{
                      fontFamily: "var(--font-barlow), system-ui, sans-serif",
                      fontSize: "1.5rem",
                    }}
                  >
                    {t(phase.titleKey as Parameters<typeof t>[0])}
                  </p>

                  {/* Items */}
                  <ul className="mt-auto space-y-3">
                    {phase.items.map((key) => (
                      <li key={key} className="flex items-start gap-3">
                        <div
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                          style={{ background: cfg.dotBg }}
                        >
                          {cfg.dotIcon}
                        </div>
                        <span className="text-sm leading-snug text-slate-300">
                          {t(key as Parameters<typeof t>[0])}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
