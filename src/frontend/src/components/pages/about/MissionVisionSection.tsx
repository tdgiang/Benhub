import { useTranslations } from "next-intl";
import { Rocket, Target } from "lucide-react";
import { FadeUp } from "@/components/ui/FadeUp";

export function MissionVisionSection() {
  const t = useTranslations("AboutUs");

  return (
    <section className="relative overflow-hidden bg-[#0A1628] py-24 md:py-32">
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Chapter watermark */}
      <div
        className="pointer-events-none absolute -left-10 bottom-0 select-none font-black leading-none opacity-[0.03] text-white"
        style={{
          fontFamily: "var(--font-barlow), system-ui, sans-serif",
          fontSize: "clamp(12rem, 25vw, 26rem)",
        }}
        aria-hidden="true"
      >
        02
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp className="mb-14 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8" style={{ background: "rgba(240,180,41,0.4)" }} />
            <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "rgba(240,180,41,0.7)" }}>
              {t("mv_label")}
            </p>
            <div className="h-px w-8" style={{ background: "rgba(240,180,41,0.4)" }} />
          </div>
        </FadeUp>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Mission card */}
          <FadeUp delay={0}>
            <div
              className="group relative h-full overflow-hidden rounded-2xl p-px transition-all duration-300 hover:shadow-2xl hover:shadow-[#F0B429]/10"
              style={{ background: "linear-gradient(135deg, rgba(240,180,41,0.3), rgba(240,180,41,0.05) 60%, rgba(255,255,255,0.05))" }}
            >
              <div
                className="relative h-full rounded-2xl p-8 md:p-10"
                style={{ background: "linear-gradient(135deg, rgba(15,34,70,0.95), rgba(10,22,40,0.98))" }}
              >
                {/* Icon */}
                <div
                  className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ background: "rgba(240,180,41,0.12)", border: "1px solid rgba(240,180,41,0.2)" }}
                >
                  <Rocket className="h-7 w-7" style={{ color: "#F0B429" }} />
                </div>
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "rgba(240,180,41,0.6)" }}>
                  {t("mv_mission_tag")}
                </p>
                <p
                  className="text-xl font-semibold leading-[1.5] text-white md:text-2xl"
                >
                  {t("mv_mission_text")}
                </p>
                {/* Decorative corner */}
                <div
                  className="absolute right-6 top-6 h-20 w-20 rounded-full opacity-10 blur-2xl"
                  style={{ background: "#F0B429" }}
                />
              </div>
            </div>
          </FadeUp>

          {/* Vision card */}
          <FadeUp delay={140}>
            <div
              className="group relative h-full overflow-hidden rounded-2xl p-px transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
              style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.3), rgba(59,130,246,0.05) 60%, rgba(255,255,255,0.05))" }}
            >
              <div
                className="relative h-full rounded-2xl p-8 md:p-10"
                style={{ background: "linear-gradient(135deg, rgba(15,34,70,0.95), rgba(10,22,40,0.98))" }}
              >
                {/* Icon */}
                <div
                  className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.2)" }}
                >
                  <Target className="h-7 w-7 text-blue-400" />
                </div>
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "rgba(147,197,253,0.7)" }}>
                  {t("mv_vision_tag")}
                </p>
                <p className="text-xl font-semibold leading-[1.5] text-white md:text-2xl">
                  {t("mv_vision_text")}
                </p>
                {/* Timeline */}
                <div className="mt-8 space-y-3">
                  {[
                    { year: "2030", key: "mv_2030" },
                    { year: "2035", key: "mv_2035" },
                  ].map((item, i) => (
                    <div key={item.year} className="flex items-start gap-3">
                      <div
                        className="mt-0.5 shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-black"
                        style={i === 0
                          ? { background: "rgba(240,180,41,0.15)", color: "#F0B429", border: "1px solid rgba(240,180,41,0.2)" }
                          : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }
                        }
                      >
                        {item.year}
                      </div>
                      <p className="text-sm leading-snug text-slate-300">{t(item.key as Parameters<typeof t>[0])}</p>
                    </div>
                  ))}
                </div>
                <div
                  className="absolute right-6 top-6 h-20 w-20 rounded-full opacity-10 blur-2xl"
                  style={{ background: "#3B82F6" }}
                />
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
