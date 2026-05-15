import { useTranslations } from "next-intl";
import { StatCounter } from "@/components/ui/StatCounter";

export function HeroSection() {
  const t = useTranslations("AboutUs");

  const stats = [
    { value: "5000", suffix: "+", label: t("hero_s1_label") },
    { value: "10", suffix: "+", label: t("hero_s2_label") },
    { value: "6", suffix: "", label: t("hero_s3_label") },
    { value: t("hero_s4_val"), suffix: "", label: t("hero_s4_label") },
  ] as const;

  return (
    <section className="relative overflow-hidden bg-[#0F2246] pt-28 pb-0">
      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow blobs */}
      <div className="pointer-events-none absolute -left-32 top-20 h-[500px] w-[500px] rounded-full bg-[#F0B429]/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Label */}
        <p
          className="mb-4 text-sm font-bold uppercase tracking-[0.22em]"
          style={{ color: "#F0B429" }}
        >
          {t("hero_label")}
        </p>

        {/* Headline */}
        <h1
          className="max-w-4xl font-black leading-[0.95] tracking-tight text-white"
          style={{
            fontFamily: "var(--font-barlow), system-ui, sans-serif",
            fontSize: "clamp(3rem, 8vw, 6rem)",
          }}
        >
          {t("hero_h1_1")}
          <br />
          {t("hero_h1_2")}
          <br />
          <span style={{ color: "#F0B429" }}>{t("hero_h1_accent")}</span>
        </h1>

        {/* Sub */}
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
          {t("hero_sub")}
        </p>
      </div>

      {/* Stats bar */}
      <div
        className="relative mt-16 border-t"
        style={{ borderColor: "rgba(255,255,255,0.1)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-px md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="px-6 py-8"
                style={{
                  borderRight:
                    i < stats.length - 1
                      ? "1px solid rgba(255,255,255,0.08)"
                      : undefined,
                }}
              >
                <StatCounter value={s.value} suffix={s.suffix} label={s.label} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
