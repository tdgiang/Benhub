import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import { FadeUp } from "@/components/ui/FadeUp";

const PHASES = [
  {
    period: "p1_period",
    title: "p1_title",
    badge: "p1_badge",
    badgeActive: true,
    items: ["p1_k1", "p1_k2", "p1_k3", "p1_k4", "p1_k5"],
  },
  {
    period: "p2_period",
    title: "p2_title",
    badge: "p2_badge",
    badgeActive: false,
    items: ["p2_k1", "p2_k2", "p2_k3", "p2_k4", "p2_k5"],
  },
  {
    period: "p3_period",
    title: "p3_title",
    badge: "p3_badge",
    badgeActive: false,
    items: ["p3_k1", "p3_k2", "p3_k3", "p3_k4", "p3_k5"],
  },
] as const;

export function MilestonesSection() {
  const t = useTranslations("AboutUs");

  return (
    <section className="bg-[#0F2246] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp className="mb-14 text-center">
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.22em]"
            style={{ color: "rgba(240,180,41,0.7)" }}
          >
            {t("mil_label")}
          </p>
          <h2
            className="font-black leading-tight text-white"
            style={{
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
            }}
          >
            {t("mil_h2")}
          </h2>
        </FadeUp>

        {/* Connector line — desktop only */}
        <div className="hidden lg:block">
          <div className="relative mb-4 flex items-start justify-between">
            {/* Connecting line */}
            <div
              className="absolute top-5 left-[16.66%] right-[16.66%] h-0.5"
              style={{ background: "linear-gradient(90deg, #F0B429, #1E3A5F, #1E3A5F)" }}
            />
            {PHASES.map((phase, i) => (
              <FadeUp key={phase.period} delay={i * 150} className="relative w-[30%]">
                <div className="text-center">
                  <div
                    className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border-4"
                    style={{
                      background: phase.badgeActive ? "#F0B429" : "#1E3A5F",
                      borderColor: phase.badgeActive ? "#F0B429" : "rgba(255,255,255,0.2)",
                    }}
                  >
                    <span className="text-xs font-black" style={{ color: phase.badgeActive ? "#0F2246" : "rgba(255,255,255,0.5)" }}>
                      {i + 1}
                    </span>
                  </div>
                  <span
                    className="inline-block rounded-full px-3 py-1 text-xs font-bold"
                    style={
                      phase.badgeActive
                        ? { background: "#F0B429", color: "#0F2246" }
                        : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }
                    }
                  >
                    {t(phase.badge as Parameters<typeof t>[0])}
                  </span>
                  <p
                    className="mt-2 text-sm font-semibold"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {t(phase.period as Parameters<typeof t>[0])}
                  </p>
                  <p
                    className="mt-1 font-black text-white"
                    style={{
                      fontFamily: "var(--font-barlow), system-ui, sans-serif",
                      fontSize: "1.35rem",
                    }}
                  >
                    {t(phase.title as Parameters<typeof t>[0])}
                  </p>
                  <ul className="mt-4 space-y-2 text-left">
                    {phase.items.map((key) => (
                      <li key={key} className="flex items-start gap-2">
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0"
                          style={{ color: phase.badgeActive ? "#F0B429" : "rgba(255,255,255,0.3)" }}
                        />
                        <span className="text-sm leading-snug text-slate-300">
                          {t(key as Parameters<typeof t>[0])}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Mobile — vertical */}
        <div className="space-y-6 lg:hidden">
          {PHASES.map((phase, i) => (
            <FadeUp key={phase.period} delay={i * 100}>
              <div
                className="rounded-2xl border p-6"
                style={{
                  borderColor: phase.badgeActive ? "#F0B429" : "rgba(255,255,255,0.1)",
                  background: phase.badgeActive ? "rgba(240,180,41,0.06)" : "rgba(255,255,255,0.03)",
                }}
              >
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span
                    className="rounded-full px-3 py-1 text-xs font-bold"
                    style={
                      phase.badgeActive
                        ? { background: "#F0B429", color: "#0F2246" }
                        : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }
                    }
                  >
                    {t(phase.badge as Parameters<typeof t>[0])}
                  </span>
                  <span className="text-sm text-slate-400">
                    {t(phase.period as Parameters<typeof t>[0])}
                  </span>
                </div>
                <p
                  className="mb-4 font-black text-white"
                  style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif", fontSize: "1.4rem" }}
                >
                  {t(phase.title as Parameters<typeof t>[0])}
                </p>
                <ul className="space-y-2">
                  {phase.items.map((key) => (
                    <li key={key} className="flex items-start gap-2">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: phase.badgeActive ? "#F0B429" : "rgba(255,255,255,0.3)" }}
                      />
                      <span className="text-sm leading-snug text-slate-300">
                        {t(key as Parameters<typeof t>[0])}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
