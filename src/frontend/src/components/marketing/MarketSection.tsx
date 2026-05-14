"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Building2,
  Factory,
  Plane,
  Radar,
  Route,
  Ship,
  Zap,
} from "lucide-react";

const stats = [
  {
    value: "60–80 tỷ USD",
    label: "Quy mô ngành xây dựng VN",
    sub: "Tăng trưởng 8–10%/năm",
    tone: "from-orange-500 to-amber-400",
  },
  {
    value: "100,000+",
    label: "Xe ben đang hoạt động",
    sub: "Phần lớn chưa có platform",
    tone: "from-blue-500 to-cyan-400",
  },
  {
    value: "< 5%",
    label: "Tỷ lệ số hóa hiện tại",
    sub: "Khoảng trống khổng lồ",
    tone: "from-emerald-500 to-lime-400",
  },
];

const infra = [
  { icon: Route, label: "Cao tốc Bắc Nam", sub: "Hạ tầng liên vùng" },
  { icon: Plane, label: "Sân bay Long Thành", sub: "Siêu dự án logistics" },
  { icon: Factory, label: "KCN & FDI", sub: "Mở rộng nhà máy" },
  { icon: Building2, label: "Đô thị hóa", sub: "Nhu cầu san lấp" },
  { icon: Zap, label: "Năng lượng tái tạo", sub: "Dự án quy mô lớn" },
  { icon: Ship, label: "Cảng biển", sub: "Kết nối chuỗi cung ứng" },
];

const marketSignals = [
  { label: "CAGR xây dựng", value: "8–10%" },
  { label: "Số hóa logistics công trình", value: "< 5%" },
  { label: "Giai đoạn mở rộng", value: "2025–2035" },
];

export function MarketSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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
            {/* <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-orange-600 shadow-sm">
              <Radar className="h-4 w-4" />
              Cơ hội thị trường
            </p> */}
            <h2
              className="font-black leading-none tracking-tight text-slate-950"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
                fontSize: "clamp(2.4rem, 6vw, 4rem)",
              }}
            >
              Thị trường khổng lồ nhưng chưa được số hóa.
            </h2>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
                  Market intelligence
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Nhu cầu hạ tầng tăng nhanh, nhưng vận tải công trình vẫn vận
                  hành rời rạc và thiếu dữ liệu.
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

        {/* <div className="mb-6 overflow-hidden rounded-[2rem] border border-orange-200 bg-white p-6 shadow-xl shadow-orange-100/60">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <p
              className="font-black italic leading-tight text-slate-950"
              style={{
                fontSize: "clamp(1.4rem, 3vw, 2.3rem)",
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
              }}
            >
              &ldquo;Ngành vận tải công trình Việt Nam: Quy mô cực lớn nhưng số hóa
              cực thấp.
              <span className="block text-orange-600">
                Đây là khoảng trống thị trường BenHub đang lấp đầy.
              </span>
              &rdquo;
            </p>
            <a
              href="#register"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-orange-600"
            >
              Đăng ký tham gia
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div> */}

        <div>
          <p className="mb-5 text-center text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
            Dự án hạ tầng đang tạo nhu cầu
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
