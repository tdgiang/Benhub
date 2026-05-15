"use client";

import { useEffect, useRef, useState } from "react";
import {
  BarChart3,
  Building2,
  Factory,
  Plane,
  Route,
  Ship,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";

export function MarketSection() {
  const t = useTranslations("Market");
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  const stats = [
    {
      value: t("stat_1_val"),
      label: t("stat_1_label"),
      sub: t("stat_1_sub"),
      tone: "from-orange-500 to-amber-400",
    },
    {
      value: t("stat_2_val"),
      label: t("stat_2_label"),
      sub: t("stat_2_sub"),
      tone: "from-blue-500 to-cyan-400",
    },
    {
      value: t("stat_3_val"),
      label: t("stat_3_label"),
      sub: t("stat_3_sub"),
      tone: "from-emerald-500 to-lime-400",
    },
  ];

  const infra = [
    { icon: Route, label: t("infra_1"), sub: t("infra_1_sub") },
    { icon: Plane, label: t("infra_2"), sub: t("infra_2_sub") },
    { icon: Factory, label: t("infra_3"), sub: t("infra_3_sub") },
    { icon: Building2, label: t("infra_4"), sub: t("infra_4_sub") },
    { icon: Zap, label: t("infra_5"), sub: t("infra_5_sub") },
    { icon: Ship, label: t("infra_6"), sub: t("infra_6_sub") },
  ];

  const marketSignals = [
    { label: t("signal_1"), value: t("signal_1_val") },
    { label: t("signal_2"), value: t("signal_2_val") },
    { label: t("signal_3"), value: t("signal_3_val") },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="market"
      ref={sectionRef}
      className="relative overflow-hidden py-8 text-slate-950 md:py-12"
      style={{ background: "#F8FAFC" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-size-[72px_72px]" />
        <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-orange-200/55 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-cyan-200/45 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <h2
              className="font-black leading-none tracking-tight text-slate-950"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
                fontSize: "clamp(2.4rem, 6vw, 4rem)",
              }}
            >
              {t("h2")}
            </h2>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
                  {t("intel_label")}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {t("intel_desc")}
                </p>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-orange-100 bg-orange-50 text-orange-600">
                <BarChart3 className="h-5 w-5" />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {marketSignals.map((signal) => (
                <div
                  key={signal.label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="text-xs text-slate-500">{signal.label}</p>
                  <p className="mt-2 text-xl font-black text-slate-950">
                    {signal.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
          {stats.map(({ value, label, sub, tone }) => (
            <div
              key={label}
              className={`group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100/60 ${
                visible ? "count-visible" : "opacity-0"
              }`}
            >
              <div
                className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${tone}`}
              />
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-orange-100/0 blur-2xl transition group-hover:bg-orange-100" />
              <div className="relative z-10">
                <p
                  className="font-black leading-none text-slate-950"
                  style={{
                    fontFamily: "var(--font-barlow), system-ui, sans-serif",
                    fontSize: "clamp(2.3rem, 5vw, 3.6rem)",
                  }}
                >
                  {value}
                </p>
                <p className="mt-4 text-base font-bold text-slate-900">
                  {label}
                </p>
                <p className="mt-1 text-sm text-slate-500">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <p className="mb-5 text-center text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
            {t("infra_header")}
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {infra.map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-100/50"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-500 transition group-hover:border-orange-100 group-hover:bg-orange-50 group-hover:text-orange-600">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-950">{label}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
