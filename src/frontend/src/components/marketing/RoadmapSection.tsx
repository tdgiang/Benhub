import { useTranslations } from "next-intl";

export function RoadmapSection() {
  const t = useTranslations("Roadmap");

  const phases = [
    {
      period: t("p1_period"),
      tag: t("p1_tag"),
      tagStyle: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
      title: t("p1_title"),
      current: true,
      kpis: [t("p1_k1"), t("p1_k2"), t("p1_k3"), t("p1_k4")],
    },
    {
      period: t("p2_period"),
      tag: t("p2_tag"),
      tagStyle: "bg-slate-600/50 text-slate-400 border border-slate-600",
      title: t("p2_title"),
      current: false,
      kpis: [t("p2_k1"), t("p2_k2"), t("p2_k3"), t("p2_k4")],
    },
    {
      period: t("p3_period"),
      tag: t("p3_tag"),
      tagStyle: "bg-slate-700/50 text-slate-500 border border-slate-700",
      title: t("p3_title"),
      current: false,
      kpis: [t("p3_k1"), t("p3_k2"), t("p3_k3"), t("p3_k4")],
    },
  ];

  return (
    <section id="roadmap" className="py-8 md:py-12 bg-slate-900">
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
            {t("h2")}
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">{t("desc")}</p>
        </div>

        {/* Timeline indicator */}
        <div className="flex items-center gap-0 mb-8 overflow-x-auto pb-2">
          {phases.map((p, i) => (
            <div key={p.period} className="flex items-center shrink-0">
              <div
                className={`w-3 h-3 rounded-full shrink-0 ${p.current ? "bg-orange-500" : "bg-slate-600"}`}
              />
              <div
                className={`h-px w-24 sm:w-40 ${i < phases.length - 1 ? (p.current ? "bg-linear-to-r from-orange-500 to-slate-600" : "bg-slate-700") : "hidden"}`}
              />
            </div>
          ))}
        </div>

        {/* Phase cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {phases.map(({ period, tag, tagStyle, title, current, kpis }) => (
            <div
              key={period}
              className={`rounded-2xl p-7 border transition-all duration-200 ${
                current
                  ? "border-orange-500 bg-slate-800"
                  : "border-slate-700 bg-slate-800/50"
              }`}
            >
              {/* Top */}
              <div className="flex items-center justify-between mb-5">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${tagStyle}`}
                >
                  {current && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 mr-1.5 animate-pulse" />
                  )}
                  {tag}
                </span>
                <span
                  className="font-black text-slate-400 text-sm"
                  style={{
                    fontFamily: "var(--font-barlow), system-ui, sans-serif",
                  }}
                >
                  {period}
                </span>
              </div>

              {/* Title */}
              <h3
                className={`font-black leading-tight mb-5 ${current ? "text-white" : "text-slate-300"}`}
                style={{
                  fontFamily: "var(--font-barlow), system-ui, sans-serif",
                  fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
                }}
              >
                {title}
              </h3>

              {/* Orange top border for current */}
              {current && (
                <div className="h-0.5 w-full bg-orange-500 rounded-full mb-5 -mt-1" />
              )}

              {/* KPIs */}
              <ul className="space-y-2.5">
                {kpis.map((k) => (
                  <li key={k} className="flex items-start gap-3">
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 mt-2 ${current ? "bg-orange-500" : "bg-slate-500"}`}
                    />
                    <span
                      className={`text-sm leading-relaxed ${current ? "text-slate-200" : "text-slate-400"}`}
                    >
                      {k}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
