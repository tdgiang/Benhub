import Link from "next/link";
import { ArrowRight, Truck, User, Building2 } from "lucide-react";
import { useTranslations } from "next-intl";

const CARDS = [
  { key: "join_c1", icon: Truck, href: "/doi-tac/chu-doi-xe" },
  { key: "join_c2", icon: User, href: "/dang-ky-tai-xe" },
  { key: "join_c3", icon: Building2, href: "/doi-tac/chu-dau-tu" },
] as const;

export function JoinUsSection() {
  const t = useTranslations("AboutUs");

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: "linear-gradient(135deg, #0F2246 0%, #1E3A5F 100%)" }}
    >
      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="pointer-events-none absolute -right-32 top-0 h-[400px] w-[400px] rounded-full bg-[#F0B429]/10 blur-[100px]" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2
          className="font-black leading-[0.95] tracking-tight text-white"
          style={{
            fontFamily: "var(--font-barlow), system-ui, sans-serif",
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
          }}
        >
          {t("join_h2_1")}
          <br />
          {t("join_h2_2")}
          <br />
          <span style={{ color: "#F0B429" }}>{t("join_h2_accent")}</span>
        </h2>

        <p className="mt-6 text-lg leading-relaxed text-slate-300">{t("join_sub")}</p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/doi-tac"
            className="inline-flex cursor-pointer items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-bold shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            style={{ background: "#F0B429", color: "#0F2246" }}
          >
            {t("join_cta1")}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#"
            className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border-2 px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            style={{ borderColor: "rgba(255,255,255,0.3)" }}
          >
            {t("join_cta2")}
          </Link>
        </div>

        {/* Mini cards */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {CARDS.map(({ key, icon: Icon, href }) => (
            <Link
              key={key}
              href={href}
              className="group flex cursor-pointer items-center justify-center gap-3 rounded-2xl border px-5 py-4 text-sm font-bold text-white transition hover:border-[#F0B429]/50 hover:bg-[#F0B429]/10"
              style={{ borderColor: "rgba(255,255,255,0.12)" }}
            >
              <Icon className="h-5 w-5 shrink-0 text-[#F0B429]" />
              {t(key as Parameters<typeof t>[0])}
              <ArrowRight className="ml-auto h-4 w-4 opacity-40 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
