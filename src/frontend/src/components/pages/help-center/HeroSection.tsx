import { LifeBuoy } from "lucide-react";
import { useTranslations } from "next-intl";
import { FadeUp } from "@/components/ui/FadeUp";

export function HeroSection() {
  const t = useTranslations("HelpCenter");

  return (
    <section
      className="relative overflow-hidden pt-28 pb-14 md:pt-32 md:pb-16"
      style={{ background: "#0F172A" }}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, #F97316 0%, transparent 70%)", opacity: 0.15 }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <FadeUp>
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/6 px-5 py-2.5 backdrop-blur-xl">
            <LifeBuoy className="h-4 w-4 text-orange-400" />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-200">
              {t("hero_label")}
            </span>
          </div>
          <h1
            className="font-black leading-tight text-white"
            style={{
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
              fontSize: "clamp(2.4rem, 5.5vw, 3.8rem)",
            }}
          >
            {t("hero_h2")}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-400 md:text-lg">
            {t("hero_sub")}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
