import {
  ArrowRight,
  BarChart2,
  Clock,
  FileText,
  Phone,
  Radar,
  TrendingDown,
} from "lucide-react";
import { useTranslations } from "next-intl";

export function ProblemSection() {
  const t = useTranslations("Problem");

  const painPoints = [
    {
      num: "01",
      icon: TrendingDown,
      title: t("p1_title"),
      description: t("p1_desc"),
      stat: t("p1_stat"),
      statLabel: t("p1_label"),
      accent: "from-red-500 to-orange-500",
      panel: "bg-red-50 text-red-600 border-red-100",
      featured: true,
    },
    {
      num: "02",
      icon: Phone,
      title: t("p2_title"),
      description: t("p2_desc"),
      stat: t("p2_stat"),
      statLabel: t("p2_label"),
      accent: "from-orange-500 to-amber-500",
      panel: "bg-orange-50 text-orange-600 border-orange-100",
    },
    {
      num: "03",
      icon: FileText,
      title: t("p3_title"),
      description: t("p3_desc"),
      stat: t("p3_stat"),
      statLabel: t("p3_label"),
      accent: "from-amber-500 to-yellow-500",
      panel: "bg-amber-50 text-amber-700 border-amber-100",
    },
    {
      num: "04",
      icon: Clock,
      title: t("p4_title"),
      description: t("p4_desc"),
      stat: t("p4_stat"),
      statLabel: t("p4_label"),
      accent: "from-purple-500 to-fuchsia-500",
      panel: "bg-purple-50 text-purple-600 border-purple-100",
    },
    {
      num: "05",
      icon: BarChart2,
      title: t("p5_title"),
      description: t("p5_desc"),
      stat: t("p5_stat"),
      statLabel: t("p5_label"),
      accent: "from-blue-500 to-cyan-500",
      panel: "bg-blue-50 text-blue-600 border-blue-100",
    },
  ];

  const lossMetrics = [
    { label: t("loss_1"), value: t("loss_1_val"), width: "w-[78%]" },
    { label: t("loss_2"), value: t("loss_2_val"), width: "w-[64%]" },
    { label: t("loss_3"), value: t("loss_3_val"), width: "w-[88%]" },
  ];

  return (
    <section
      id="problem"
      className="relative overflow-hidden py-4 md:py-8"
      style={{ background: "#F8FAFC" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-size-[56px_56px]" />
        <div className="absolute -left-32 top-16 h-72 w-72 rounded-full bg-orange-200/45 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-slate-300/45 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_420px] lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-orange-600 shadow-sm">
              <Radar className="h-4 w-4" />
              {t("badge")}
            </p>
            <h2
              className="font-black leading-none tracking-tight text-slate-950"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
                fontSize: "clamp(2.7rem, 6vw, 5rem)",
              }}
            >
              {t("h2_1")}
              <br />
              <span className="text-orange-400">{t("h2_2")}</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
              {t("desc")}
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-5 text-white shadow-2xl shadow-slate-300">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="mt-2 text-sm text-slate-400">{t("radar_label")}</p>
              </div>
            </div>

            <div className="space-y-4">
              {lossMetrics.map((item) => (
                <div key={item.label}>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="text-slate-400">{item.label}</span>
                    <span className="font-bold text-white">{item.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div
                      className={`${item.width} h-full rounded-full bg-linear-to-r from-orange-500 to-amber-300`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p
                className="font-black leading-none text-orange-300"
                style={{
                  fontFamily: "var(--font-barlow), system-ui, sans-serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                }}
              >
                {t("loss_highlight")}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {t("loss_detail")}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {painPoints.map(
            ({
              num,
              icon: Icon,
              title,
              description,
              stat,
              statLabel,
              accent,
              panel,
              featured,
            }) => (
              <article
                key={num}
                className={`group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100/60 ${
                  featured ? "lg:col-span-2" : "lg:col-span-2"
                }`}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${accent}`}
                />
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-slate-100 transition duration-300 group-hover:bg-orange-100" />

                <div className="relative z-10">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${panel}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span
                      className="font-black leading-none text-orange-500 transition-colors duration-300 group-hover:text-orange-200"
                      style={{
                        fontFamily: "var(--font-barlow), system-ui, sans-serif",
                        fontSize: "4rem",
                      }}
                    >
                      {num}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-950">{title}</h3>
                  <p className="mt-3 min-h-20 text-sm leading-relaxed text-slate-500">
                    {description}
                  </p>

                  <div className="mt-6 flex items-end justify-between gap-4 border-t border-slate-100 pt-5">
                    <div>
                      <p
                        className="font-black leading-none text-slate-950"
                        style={{
                          fontFamily:
                            "var(--font-barlow), system-ui, sans-serif",
                          fontSize: "clamp(2rem, 4vw, 3rem)",
                        }}
                      >
                        {stat}
                      </p>
                      <p className="mt-1 text-xs font-medium text-slate-400">
                        {statLabel}
                      </p>
                    </div>
                    <div className="h-10 w-10 rounded-full border border-slate-200 bg-slate-50 text-slate-400 transition group-hover:border-orange-200 group-hover:bg-orange-50 group-hover:text-orange-500">
                      <ArrowRight className="m-2.5 h-5 w-5" />
                    </div>
                  </div>
                </div>
              </article>
            ),
          )}

          <article className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300 sm:col-span-2 lg:col-span-2">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.28),transparent_36%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent)]" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-orange-300">
                  {t("insight_label")}
                </p>
                <h3
                  className="font-black leading-tight"
                  style={{
                    fontFamily: "var(--font-barlow), system-ui, sans-serif",
                    fontSize: "clamp(1.9rem, 4vw, 2.7rem)",
                  }}
                >
                  {t("insight_title")}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">
                  {t("insight_desc")}
                </p>
              </div>

              <a
                href="#solution"
                className="mt-8 inline-flex items-center gap-2 self-start rounded-2xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-950/30 transition hover:-translate-y-0.5 hover:bg-orange-600"
              >
                {t("cta")}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
