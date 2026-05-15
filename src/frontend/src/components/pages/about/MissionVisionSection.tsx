import { useTranslations } from "next-intl";
import { Rocket, Target } from "lucide-react";
import { FadeUp } from "@/components/ui/FadeUp";

export function MissionVisionSection() {
  const t = useTranslations("AboutUs");

  return (
    <section className="bg-[#0F2246] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <p
            className="mb-10 text-center text-xs font-bold uppercase tracking-[0.22em]"
            style={{ color: "rgba(240,180,41,0.7)" }}
          >
            {t("mv_label")}
          </p>
        </FadeUp>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Mission */}
          <FadeUp delay={0}>
            <div
              className="h-full rounded-2xl border p-8 md:p-10"
              style={{
                borderColor: "rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0B429]/10">
                <Rocket className="h-6 w-6" style={{ color: "#F0B429" }} />
              </div>
              <p
                className="mb-3 text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: "rgba(240,180,41,0.7)" }}
              >
                {t("mv_mission_tag")}
              </p>
              <p
                className="text-xl font-semibold leading-snug text-white"
              >
                {t("mv_mission_text")}
              </p>
            </div>
          </FadeUp>

          {/* Vision */}
          <FadeUp delay={120}>
            <div
              className="h-full rounded-2xl border p-8 md:p-10"
              style={{
                borderColor: "rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0B429]/10">
                <Target className="h-6 w-6" style={{ color: "#F0B429" }} />
              </div>
              <p
                className="mb-3 text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: "rgba(240,180,41,0.7)" }}
              >
                {t("mv_vision_tag")}
              </p>
              <p className="text-xl font-semibold leading-snug text-white">
                {t("mv_vision_text")}
              </p>
              {/* Mini timeline */}
              <div className="mt-6 space-y-3">
                {[
                  { year: "2030", key: "mv_2030" },
                  { year: "2035", key: "mv_2035" },
                ].map((item) => (
                  <div key={item.year} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold"
                      style={{ background: "#F0B429", color: "#0F2246" }}
                    >
                      {item.year}
                    </span>
                    <span className="text-sm leading-snug text-slate-300">
                      {t(item.key as Parameters<typeof t>[0])}
                    </span>
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
