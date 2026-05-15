import { X, Check } from "lucide-react";
import { useTranslations } from "next-intl";

export function SolutionSection() {
  const t = useTranslations("Solution");

  const rows = [
    { before: t("s1_before"), after: t("s1_after") },
    { before: t("s2_before"), after: t("s2_after") },
    { before: t("s3_before"), after: t("s3_after") },
    { before: t("s4_before"), after: t("s4_after") },
    { before: t("s5_before"), after: t("s5_after") },
  ];

  return (
    <section id="solution" className="py-8 md:py-12 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <p className="text-orange-400 font-semibold text-xs uppercase tracking-[0.15em] mb-4">
            {t("tag")}
          </p>
          <h2
            className="font-black text-white leading-tight mb-4"
            style={{
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            {t("h2_1")}
            <br />
            {t("h2_2")}
          </h2>
        </div>

        {/* Before / After Table */}
        <div className="rounded-2xl overflow-hidden border border-slate-700">
          {/* Header row */}
          <div className="grid grid-cols-2">
            <div className="flex items-center gap-3 px-6 py-4 bg-red-950/30 border-b border-slate-700">
              <div className="w-7 h-7 rounded-lg bg-red-500/20 flex items-center justify-center shrink-0">
                <X className="w-4 h-4 text-red-400" />
              </div>
              <span className="text-red-300 font-semibold text-sm uppercase tracking-wide">
                {t("before")}
              </span>
            </div>
            <div className="flex items-center gap-3 px-6 py-4 bg-green-950/30 border-b border-l border-slate-700">
              <div className="w-7 h-7 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-green-300 font-semibold text-sm uppercase tracking-wide">
                {t("after")}
              </span>
            </div>
          </div>

          {/* Data rows */}
          {rows.map(({ before, after }, i) => (
            <div
              key={i}
              className="grid grid-cols-2 group hover:bg-white/3 transition-colors"
            >
              <div className="flex items-start gap-3 px-6 py-4 bg-red-950/10 border-b border-slate-700/60">
                <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span className="text-slate-400 text-sm leading-relaxed">
                  {before}
                </span>
              </div>
              <div className="flex items-start gap-3 px-6 py-4 bg-green-950/10 border-b border-l border-slate-700/60">
                <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span className="text-slate-200 text-sm leading-relaxed font-medium">
                  {after}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <div className="mt-10 text-center">
          <p
            className="text-orange-400 font-black italic leading-tight"
            style={{
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            }}
          >
            &ldquo;{t("tagline")}&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
