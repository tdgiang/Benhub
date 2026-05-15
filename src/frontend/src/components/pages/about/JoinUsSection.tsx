import Link from "next/link";
import { ArrowRight, Truck, User, Building2 } from "lucide-react";
import { useTranslations } from "next-intl";

const CARDS = [
  { key: "join_c1", icon: Truck, href: "/doi-tac/chu-doi-xe", color: "#F0B429" },
  { key: "join_c2", icon: User, href: "/dang-ky-tai-xe", color: "#F97316" },
  { key: "join_c3", icon: Building2, href: "/doi-tac/chu-dau-tu", color: "#3B82F6" },
] as const;

export function JoinUsSection() {
  const t = useTranslations("AboutUs");

  return (
    <section className="relative overflow-hidden bg-[#0A1628] py-28 md:py-36">
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Gold orb */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-15 blur-[120px]"
        style={{ background: "radial-gradient(#F0B429, #C8941A)" }}
      />
      {/* Chapter watermark */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-4 select-none text-center font-black leading-none opacity-[0.025] text-white"
        style={{
          fontFamily: "var(--font-barlow), system-ui, sans-serif",
          fontSize: "clamp(12rem, 25vw, 28rem)",
        }}
        aria-hidden="true"
      >
        08
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {/* Label */}
        <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border px-4 py-2"
          style={{ borderColor: "rgba(240,180,41,0.25)", background: "rgba(240,180,41,0.06)" }}>
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#F0B429]" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F0B429]">
            Tham gia ngay
          </span>
        </div>

        <h2
          className="font-black leading-[0.92] tracking-tight"
          style={{
            fontFamily: "var(--font-barlow), system-ui, sans-serif",
            fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
          }}
        >
          <span className="block" style={{ color: "rgba(255,255,255,0.5)" }}>{t("join_h2_1")}</span>
          <span className="block text-white">{t("join_h2_2")}</span>
          <span className="block" style={{ color: "#F0B429" }}>{t("join_h2_accent")}</span>
        </h2>

        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-slate-400">
          {t("join_sub")}
        </p>

        {/* CTAs */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            href="/doi-tac"
            className="group inline-flex cursor-pointer items-center gap-2.5 rounded-2xl px-8 py-4 text-sm font-bold shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
            style={{
              background: "#F0B429",
              color: "#0F2246",
              boxShadow: "0 8px 30px rgba(240,180,41,0.35)",
            }}
          >
            {t("join_cta1")}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="#"
            className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border-2 px-8 py-4 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/8"
            style={{ borderColor: "rgba(255,255,255,0.2)" }}
          >
            {t("join_cta2")}
          </Link>
        </div>

        {/* Divider */}
        <div className="my-14 flex items-center gap-4">
          <div className="flex-1 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }} />
          <span className="text-xs font-medium uppercase tracking-widest text-white/25">
            Chọn vai trò của bạn
          </span>
          <div className="flex-1 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }} />
        </div>

        {/* Role cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {CARDS.map(({ key, icon: Icon, href, color }) => (
            <Link
              key={key}
              href={href}
              className="group flex cursor-pointer flex-col items-center gap-3 rounded-2xl p-6 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-200 group-hover:scale-110"
                style={{ background: `${color}18`, border: `1px solid ${color}25` }}
              >
                <Icon className="h-6 w-6" style={{ color }} />
              </div>
              <span>{t(key as Parameters<typeof t>[0])}</span>
              <ArrowRight
                className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                style={{ color }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
