import { useTranslations } from "next-intl";
import { Eye, Zap, ShieldCheck, Sparkles, Network } from "lucide-react";
import { FadeUp } from "@/components/ui/FadeUp";

const VALUES = [
  { icon: Eye, nameKey: "v1_name", enKey: "v1_en", descKey: "v1_desc", color: "#F0B429" },
  { icon: Zap, nameKey: "v2_name", enKey: "v2_en", descKey: "v2_desc", color: "#F97316" },
  { icon: ShieldCheck, nameKey: "v3_name", enKey: "v3_en", descKey: "v3_desc", color: "#22C55E" },
  { icon: Sparkles, nameKey: "v4_name", enKey: "v4_en", descKey: "v4_desc", color: "#3B82F6" },
  { icon: Network, nameKey: "v5_name", enKey: "v5_en", descKey: "v5_desc", color: "#A78BFA" },
] as const;

export function CoreValuesSection() {
  const t = useTranslations("AboutUs");

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] py-14 md:py-20">
      {/* Chapter watermark */}
      <div
        className="pointer-events-none absolute -right-6 top-4 select-none font-black leading-none text-slate-200"
        style={{
          fontFamily: "var(--font-barlow), system-ui, sans-serif",
          fontSize: "clamp(10rem, 20vw, 22rem)",
        }}
        aria-hidden="true"
      >
        03
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-[#F0B429]" />
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#F0B429]">
              {t("values_label")}
            </p>
          </div>
          <h2
            className="font-black leading-tight text-[#0F2246]"
            style={{
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
              fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
            }}
          >
            {t("values_h2")}
          </h2>
        </FadeUp>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {VALUES.map(({ icon: Icon, nameKey, enKey, descKey, color }, i) => (
            <FadeUp key={nameKey} delay={i * 80}>
              <div
                className="group relative flex h-full cursor-default flex-col overflow-hidden rounded-2xl bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)" }}
              >
                {/* Gradient top bar */}
                <div
                  className="absolute inset-x-0 top-0 h-0.5 transition-all duration-300 group-hover:h-1"
                  style={{ background: color }}
                />

                {/* Index */}
                <span
                  className="mb-4 block font-black leading-none"
                  style={{
                    fontFamily: "var(--font-barlow), system-ui, sans-serif",
                    fontSize: "2.8rem",
                    color: "rgba(0,0,0,0.04)",
                  }}
                >
                  0{i + 1}
                </span>

                {/* Icon */}
                <div
                  className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${color}15` }}
                >
                  <Icon className="h-5 w-5" style={{ color }} />
                </div>

                {/* Name */}
                <p className="text-xs font-black uppercase tracking-wider text-[#0F2246]">
                  {t(nameKey as Parameters<typeof t>[0])}
                </p>
                <p className="mb-3 mt-0.5 text-[11px] font-medium" style={{ color: `${color}99` }}>
                  {t(enKey as Parameters<typeof t>[0])}
                </p>

                {/* Desc */}
                <p className="text-sm leading-relaxed text-slate-500">
                  {t(descKey as Parameters<typeof t>[0])}
                </p>

                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute bottom-0 right-0 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-10"
                  style={{ background: color }}
                />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
