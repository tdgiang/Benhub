"use client";

import { useState } from "react";
import {
  Truck,
  User,
  Building2,
  Briefcase,
  Check,
  ArrowRight,
} from "lucide-react";
import { useTranslations } from "next-intl";

type TabId = "fleet" | "driver" | "investor" | "partner";

export function EcosystemSection() {
  const [active, setActive] = useState<TabId>("fleet");
  const t = useTranslations("Ecosystem");

  const tabs: { id: TabId; icon: typeof Truck; label: string }[] = [
    { id: "fleet", icon: Truck, label: t("tab_fleet") },
    { id: "driver", icon: User, label: t("tab_driver") },
    { id: "investor", icon: Building2, label: t("tab_investor") },
    { id: "partner", icon: Briefcase, label: t("tab_partner") },
  ];

  const content: Record<
    TabId,
    { headline: string; sub: string; benefits: string[]; cta: string; href: string }
  > = {
    fleet: {
      headline: t("fleet_headline"),
      sub: t("fleet_sub"),
      benefits: [t("fleet_b1"), t("fleet_b2"), t("fleet_b3"), t("fleet_b4"), t("fleet_b5")],
      cta: t("fleet_cta"),
      href: "/doi-tac",
    },
    driver: {
      headline: t("driver_headline"),
      sub: t("driver_sub"),
      benefits: [t("driver_b1"), t("driver_b2"), t("driver_b3"), t("driver_b4"), t("driver_b5")],
      cta: t("driver_cta"),
      href: "/dang-ky-tai-xe",
    },
    investor: {
      headline: t("investor_headline"),
      sub: t("investor_sub"),
      benefits: [t("investor_b1"), t("investor_b2"), t("investor_b3"), t("investor_b4"), t("investor_b5")],
      cta: t("investor_cta"),
      href: "/doi-tac",
    },
    partner: {
      headline: t("partner_headline"),
      sub: t("partner_sub"),
      benefits: [t("partner_b1"), t("partner_b2"), t("partner_b3"), t("partner_b4"), t("partner_b5")],
      cta: t("partner_cta"),
      href: "/doi-tac",
    },
  };

  const c = content[active];

  return (
    <section id="ecosystem" className="py-8 md:py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-9">
          <p className="text-orange-500 font-semibold text-xs uppercase tracking-[0.15em] mb-4">
            {t("tag")}
          </p>
          <h2
            className="font-black text-slate-900 leading-tight"
            style={{
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            {t("h2")}
          </h2>
        </div>

        {/* Tab selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${
                active === id
                  ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-orange-300 hover:text-orange-600"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="grid lg:grid-cols-5">
            {/* Left dark panel */}
            <div className="lg:col-span-2 bg-slate-900 p-8 lg:p-10">
              {/* Illustration placeholder */}
              <div className="mb-8 flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 rounded-2xl bg-orange-500/10 border border-orange-500/20" />
                  <div className="absolute inset-3 rounded-xl bg-orange-500/15 border border-orange-500/25" />
                  <div className="absolute inset-6 rounded-lg bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
                    {(() => {
                      const Tab = tabs.find((t) => t.id === active)!;
                      return <Tab.icon className="w-10 h-10 text-white" />;
                    })()}
                  </div>
                </div>
              </div>

              <h3
                className="font-bold text-white text-xl leading-snug mb-3"
                style={{
                  fontFamily: "var(--font-barlow), system-ui, sans-serif",
                  fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)",
                }}
              >
                {c.headline}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                {c.sub}
              </p>

              <a
                href={c.href}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-colors cursor-pointer group"
              >
                {c.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Right benefits */}
            <div className="lg:col-span-3 p-8 lg:p-10">
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-6">
                {t("benefits_header")}
              </p>
              <ul className="space-y-5">
                {c.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-4 group">
                    <div className="w-6 h-6 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-200">
                      <Check className="w-3.5 h-3.5 text-orange-500 group-hover:text-white transition-colors duration-200" />
                    </div>
                    <span className="text-slate-700 text-[15px] leading-relaxed">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
