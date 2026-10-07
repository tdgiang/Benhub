import { ArrowDown, Award, Building2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { StatCounter } from "@/components/ui/StatCounter";

export function HeroSection() {
  const t = useTranslations("AboutUs");

  const stats = [
    { value: t("hero_s1_value"), suffix: t("hero_s1_suffix"), label: t("hero_s1_label") },
    { value: t("hero_s2_value"), suffix: t("hero_s2_suffix"), label: t("hero_s2_label") },
    { value: t("hero_s3_value"), suffix: t("hero_s3_suffix"), label: t("hero_s3_label") },
    { value: t("hero_s4_value"), suffix: t("hero_s4_suffix"), label: t("hero_s4_label") },
  ] as const;

  const proofs = [t("hero_proof_1"), t("hero_proof_2"), t("hero_proof_3")] as const;

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#050B18", minHeight: "min(80vh, 780px)" }}
    >
      <HeroBackground />

      <div
        className="relative z-10 flex flex-col"
        style={{ minHeight: "min(80vh, 780px)" }}
      >
        <div className="flex flex-1 flex-col justify-center px-4 pb-6 pt-24 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <div className="fade-up mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/6 px-5 py-2.5 text-sm font-medium backdrop-blur-xl">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              <Award className="h-4 w-4 text-orange-400" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-200">
                {t("hero_label")}
              </span>
            </div>

            <h1
              className="fade-up max-w-5xl font-black leading-[1.08] tracking-tight text-white"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
                fontSize: "clamp(2.75rem, 8vw, 6.5rem)",
                animationDelay: "0.1s",
              }}
            >
              <span className="block">{t("hero_h1_1")}</span>
              <span className="block text-white/50">{t("hero_h1_2")}</span>
              <span
                className="mt-1 inline-block bg-clip-text pb-1 text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #F97316 0%, #FBBF24 45%, #F97316 100%)",
                }}
              >
                {t("hero_h1_accent")}
              </span>
            </h1>

            <p
              className="fade-up mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl"
              style={{ animationDelay: "0.2s" }}
            >
              {t("hero_sub")}
            </p>

            <div
              className="fade-up mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: "0.3s" }}
            >
              <Link
                href="/doi-tac"
                className="btn-glow inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
                }}
              >
                <Building2 className="h-4 w-4" />
                {t("hero_cta_primary")}
              </Link>
              <a
                href="#about-story"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/8 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-white/25 hover:bg-white/12"
              >
                {t("hero_cta_secondary")}
              </a>
            </div>

            <div
              className="fade-up mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-5"
              style={{ animationDelay: "0.4s" }}
            >
              {proofs.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 text-sm text-slate-400"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                  {item}
                </span>
              ))}
            </div>

            <a
              href="#about-story"
              className="fade-up mt-8 inline-flex items-center gap-3 text-white/35 transition hover:text-white/55"
              style={{ animationDelay: "0.5s" }}
            >
              <span className="flex h-8 w-5 items-start justify-center rounded-full border border-white/20 pt-1.5">
                <span className="h-1.5 w-1 animate-bounce rounded-full bg-white/50" />
              </span>
              <span className="text-xs font-medium uppercase tracking-wider">
                {t("hero_scroll")}
              </span>
              <ArrowDown className="h-3.5 w-3.5 opacity-60" />
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 bg-[#050B18]/80 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`px-4 py-5 transition-colors hover:bg-white/4 sm:px-6 ${
                    i < stats.length - 1 ? "md:border-r md:border-white/10" : ""
                  } ${i % 2 === 0 ? "border-r border-white/10" : ""} ${
                    i < 2 ? "border-b border-white/10 md:border-b-0" : ""
                  }`}
                >
                  <StatCounter
                    value={s.value}
                    suffix={s.suffix}
                    label={s.label}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg_login.png')" }}
      />
      <div className="absolute inset-0 bg-slate-950/50" />
      <div className="absolute inset-0 bg-linear-to-b from-slate-950/55 via-slate-950/20 to-[#050B18]/70" />
      <div className="absolute inset-0 bg-linear-to-r from-[#050B18]/75 via-[#050B18]/25 to-[#050B18]/40" />

      <div
        className="absolute -top-32 -left-32 h-[600px] w-[700px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(ellipse, #F97316 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute top-1/4 -right-20 h-[500px] w-[500px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(ellipse, #3B82F6 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="absolute -bottom-20 left-1/4 h-[400px] w-[600px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(ellipse, #F59E0B 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <svg
        viewBox="0 0 900 500"
        className="absolute inset-0 h-full w-full opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M150,80 Q280,150 380,260 Q460,350 520,430"
          stroke="#F97316"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="14 8"
          className="route-dash"
        />
        <path
          d="M100,220 Q220,200 340,170 Q480,135 620,200 Q720,250 800,310"
          stroke="#F97316"
          strokeWidth="1"
          fill="none"
          strokeDasharray="10 12"
          className="route-dash-slow"
        />
        {[
          { cx: 150, cy: 80 },
          { cx: 380, cy: 260 },
          { cx: 520, cy: 430 },
          { cx: 800, cy: 310 },
        ].map(({ cx, cy }, i) => (
          <g key={i}>
            <circle
              cx={cx}
              cy={cy}
              r={8}
              fill="#F97316"
              opacity="0.12"
              className="pulse-city"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
            <circle cx={cx} cy={cy} r={3.5} fill="#F97316" opacity="0.8" />
          </g>
        ))}
      </svg>

      <div
        className="absolute inset-x-0 bottom-0 h-48"
        style={{ background: "linear-gradient(to top, #050B18, transparent)" }}
      />
    </div>
  );
}
