"use client";

import { useState } from "react";
import { FileText, Cpu, Smartphone, Eye, CheckCircle2 } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: FileText,
    title: "Tạo lệnh vận chuyển",
    actor: "Chủ đầu tư / Tổng thầu",
    description:
      "Chủ đầu tư hoặc tổng thầu tạo lệnh trên BenHub Core: số chuyến, loại vật liệu, điểm nhận – điểm trả, thời gian. Hệ thống tự tính số xe cần thiết và thời gian hoàn thành.",
    highlights: [
      "Nhập lệnh online, không cần gọi điện",
      "Hệ thống tự tính xe cần thiết",
      "Xác nhận lệnh tức thì",
    ],
  },
  {
    num: "02",
    icon: Cpu,
    title: "AI Smart Dispatch",
    actor: "Hệ thống AI",
    description:
      "BenHub tự động matching với đội xe phù hợp nhất: gần nhất, đúng tải trọng, rating cao, có lịch trống. Không cần gọi điện. AI tối ưu tuyến đường và chi phí.",
    highlights: [
      "Matching tự động trong < 30 giây",
      "Tối ưu tuyến đường, tiết kiệm nhiên liệu",
      "Phân bổ theo rating & lịch sử",
    ],
  },
  {
    num: "03",
    icon: Smartphone,
    title: "Tài xế nhận chuyến",
    actor: "Tài xế",
    description:
      "Tài xế nhận thông báo qua app, xác nhận, bật GPS. E-Ticket tự động tạo với mã QR, watermark thời gian + tọa độ. Mọi thông tin chuyến đều được ghi nhận.",
    highlights: [
      "Nhận chuyến 1-tap trên app",
      "E-Ticket số tự tạo với mã QR",
      "GPS bật tự động, route được dẫn đường",
    ],
  },
  {
    num: "04",
    icon: Eye,
    title: "Giám sát realtime",
    actor: "Supervisor",
    description:
      "Supervisor theo dõi toàn bộ đội xe trên bản đồ. Phát hiện ngay nếu xe lệch tuyến, dừng bất thường, thiếu tải. Cảnh báo tức thì qua app.",
    highlights: [
      "Bản đồ realtime toàn đội xe",
      "Cảnh báo tự động: lệch tuyến, dừng bất thường",
      "Kiểm tra tải trọng từ xa",
    ],
  },
  {
    num: "05",
    icon: CheckCircle2,
    title: "Đối soát tự động",
    actor: "Hệ thống",
    description:
      "Khi chuyến hoàn thành: hệ thống tự tổng hợp khối lượng, so sánh lệnh vs thực tế, xuất báo cáo, cập nhật công nợ tức thì. Không cần nhân lực đối soát thủ công.",
    highlights: [
      "Báo cáo khối lượng tức thì",
      "Đối soát lệnh vs thực tế tự động",
      "Cập nhật công nợ realtime",
    ],
  },
];

export function HowItWorksSection() {
  const [active, setActive] = useState(0);
  const step = steps[active];
  const Icon = step.icon;

  return (
    <section
      id="how-it-works"
      className="py-8 md:py-12"
      style={{ background: "#F8FAFC" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <p className="text-orange-500 font-semibold text-xs uppercase tracking-[0.15em] mb-4">
            Cách hoạt động
          </p>
          <h2
            className="font-black text-slate-900 leading-tight mb-4"
            style={{
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            Từ lệnh vận chuyển
            <br />
            đến đối soát — tự động hoàn toàn
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            5 bước vận hành, toàn bộ số hóa — không một tờ giấy, không một cuộc
            điện thoại.
          </p>
        </div>

        {/* Desktop: Left step list + Right detail panel */}
        <div className="hidden lg:grid grid-cols-5 gap-8">
          {/* Left: Step buttons */}
          <div className="col-span-2 space-y-2">
            {steps.map((s, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200 cursor-pointer group ${
                  active === i
                    ? "bg-orange-500 shadow-md shadow-orange-500/20"
                    : "bg-slate-50 hover:bg-slate-100"
                }`}
              >
                <span
                  className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${
                    active === i
                      ? "bg-white/20 text-white"
                      : "bg-white text-slate-600 border border-slate-200"
                  }`}
                  style={{
                    fontFamily: "var(--font-barlow), system-ui, sans-serif",
                  }}
                >
                  {s.num}
                </span>
                <div className="min-w-0">
                  <p
                    className={`font-semibold text-sm truncate ${active === i ? "text-white" : "text-slate-900"}`}
                  >
                    {s.title}
                  </p>
                  <p
                    className={`text-xs mt-0.5 ${active === i ? "text-orange-100" : "text-slate-400"}`}
                  >
                    {s.actor}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Right: Detail panel */}
          <div className="col-span-3 bg-slate-50 border border-slate-200 rounded-2xl p-8 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/25">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p
                  className="text-orange-500 font-black text-3xl leading-none"
                  style={{
                    fontFamily: "var(--font-barlow), system-ui, sans-serif",
                  }}
                >
                  {step.num}
                </p>
                <p className="text-xs text-slate-400 uppercase tracking-wide">
                  {step.actor}
                </p>
              </div>
            </div>

            <h3
              className="font-black text-slate-900 mb-4 leading-tight"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
                fontSize: "1.8rem",
              }}
            >
              {step.title}
            </h3>
            <p className="text-slate-600 text-base leading-relaxed mb-6">
              {step.description}
            </p>

            <div className="space-y-2.5">
              {step.highlights.map((h) => (
                <div key={h} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                    <span className="w-2 h-2 rounded-full bg-orange-500 block" />
                  </div>
                  <span className="text-slate-700 text-sm">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Accordion */}
        <div className="lg:hidden space-y-3">
          {steps.map((s, i) => {
            const isOpen = active === i;
            return (
              <div
                key={i}
                className={`border rounded-xl overflow-hidden transition-all duration-200 ${isOpen ? "border-orange-400" : "border-slate-200"}`}
              >
                <button
                  onClick={() => setActive(isOpen ? -1 : i)}
                  className="w-full flex items-center gap-4 p-4 text-left cursor-pointer"
                >
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm shrink-0 ${
                      isOpen
                        ? "bg-orange-500 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                    style={{
                      fontFamily: "var(--font-barlow), system-ui, sans-serif",
                    }}
                  >
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 text-sm">
                      {s.title}
                    </p>
                    <p className="text-xs text-slate-400">{s.actor}</p>
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 border-t border-orange-100 pt-4">
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {s.description}
                    </p>
                    <div className="space-y-2">
                      {s.highlights.map((h) => (
                        <div key={h} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                          <span className="text-slate-600 text-xs">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
