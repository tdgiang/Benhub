import { useTranslations } from "next-intl";
import { Eye, Zap, ShieldCheck, Sparkles, Network } from "lucide-react";
import { FadeUp } from "@/components/ui/FadeUp";

const VALUE_ICONS = [Eye, Zap, ShieldCheck, Sparkles, Network] as const;

const VALUE_KEYS = [
  { name: "v1_name", en: "v1_en", desc: "v1_desc" },
  { name: "v2_name", en: "v2_en", desc: "v2_desc" },
  { name: "v3_name", en: "v3_en", desc: "v3_desc" },
  { name: "v4_name", en: "v4_en", desc: "v4_desc" },
  { name: "v5_name", en: "v5_en", desc: "v5_desc" },
] as const;

export function CoreValuesSection() {
  const t = useTranslations("AboutUs");

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp className="mb-12 text-center">
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.22em]"
            style={{ color: "#F0B429" }}
          >
            {t("values_label")}
          </p>
          <h2
            className="font-black leading-tight text-[#0F2246]"
            style={{
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            {t("values_h2")}
          </h2>
        </FadeUp>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {VALUE_KEYS.map((keys, i) => {
            const Icon = VALUE_ICONS[i];
            return (
              <FadeUp key={keys.name} delay={i * 80}>
                <div
                  className="group h-full cursor-default rounded-xl border-l-4 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ borderLeftColor: "#F0B429" }}
                >
                  <div
                    className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ background: "rgba(240,180,41,0.12)" }}
                  >
                    <Icon className="h-5 w-5" style={{ color: "#F0B429" }} />
                  </div>
                  <p
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: "#0F2246" }}
                  >
                    {t(keys.name as Parameters<typeof t>[0])}
                  </p>
                  <p className="mt-0.5 text-[11px] font-medium text-slate-400">
                    {t(keys.en as Parameters<typeof t>[0])}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {t(keys.desc as Parameters<typeof t>[0])}
                  </p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
