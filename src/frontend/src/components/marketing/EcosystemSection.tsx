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

type TabId = "fleet" | "driver" | "investor" | "partner";

const tabs: { id: TabId; icon: typeof Truck; label: string }[] = [
  { id: "fleet", icon: Truck, label: "Chủ Đội Xe" },
  { id: "driver", icon: User, label: "Tài Xế" },
  { id: "investor", icon: Building2, label: "Chủ Đầu Tư / Tổng Thầu" },
  { id: "partner", icon: Briefcase, label: "Nhà Đầu Tư / Đối Tác" },
];

const content: Record<
  TabId,
  { headline: string; sub: string; benefits: string[]; cta: string }
> = {
  fleet: {
    headline: "Có việc đều. Quản lý dễ. Thu nhập tăng.",
    sub: "Tham gia hệ sinh thái BenHub — đội xe của bạn luôn có việc, doanh thu minh bạch, quản lý từ một app duy nhất.",
    benefits: [
      "Nhận cuốc xe ổn định từ mạng lưới dự án BenHub",
      "Quản lý toàn bộ đội xe, tài xế, bảo dưỡng trên app",
      "Theo dõi doanh thu realtime từng xe, từng ngày",
      "Đối soát công nợ tự động — không tranh cãi cuối tháng",
      "Tiếp cận BenHub Finance khi cần vốn vận hành",
    ],
    cta: "Đăng ký đội xe ngay →",
  },
  driver: {
    headline: "Cuốc xe đều. Thu nhập rõ. Không mất phiếu.",
    sub: "Tài xế BenHub luôn có việc, thu nhập được ghi nhận đầy đủ, E-Ticket thay phiếu giấy — không lo mất, không lo gian lận.",
    benefits: [
      "Nhận cuốc xe hàng ngày qua app — không cần quan hệ hay cò",
      "E-Ticket số hoá — không bao giờ mất phiếu, không tranh cãi",
      "Thu nhập được ghi nhận từng chuyến, rõ ràng minh bạch",
      "Ứng tiền nhanh sau mỗi chuyến — không chờ cuối tháng",
      "Đánh giá uy tín → cuốc xe tốt hơn, thu nhập cao hơn",
    ],
    cta: "Đăng ký lái xe ngay →",
  },
  investor: {
    headline: "Kiểm soát toàn bộ. Không thất thoát. Dữ liệu realtime.",
    sub: "BenHub cho bạn dashboard giám sát toàn bộ đội xe 24/7, phát hiện gian lận tức thì, báo cáo khối lượng tự động.",
    benefits: [
      "Dashboard realtime: biết mọi xe đang ở đâu, tiến độ thế nào",
      "Phát hiện thất thoát ngay lập tức — chở thiếu tải, lệch tuyến",
      "Báo cáo khối lượng tự động cuối ngày — không cần thủ công",
      "Đối soát công nợ trong vài phút thay vì vài tuần",
      "Bảo vệ tài sản chủ đầu tư bằng dữ liệu xác thực",
    ],
    cta: "Yêu cầu demo miễn phí →",
  },
  partner: {
    headline: "Cơ hội đầu tư vào hạ tầng số ngành xây dựng.",
    sub: "BenHub đang xây dựng Construction Logistics OS đầu tiên của Việt Nam trong thị trường 60–80 tỷ USD với tỷ lệ số hóa < 5%.",
    benefits: [
      "Market size: 60–80 tỷ USD/năm, tăng trưởng 8–10%/năm",
      "Asset-light platform model — scalable toàn quốc",
      "5 luồng doanh thu: SaaS, Marketplace, Finance, Data, Carbon",
      "Roadmap rõ ràng đến 2035 với tầm nhìn IPO",
      "Mô hình Holding địa phương — mở rộng nhanh, chi phí thấp",
    ],
    cta: "Liên hệ đội ngũ →",
  },
};

export function EcosystemSection() {
  const [active, setActive] = useState<TabId>("fleet");
  const c = content[active];

  return (
    <section id="ecosystem" className="py-8 md:py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-9">
          <p className="text-orange-500 font-semibold text-xs uppercase tracking-[0.15em] mb-4">
            Dành cho ai
          </p>
          <h2
            className="font-black text-slate-900 leading-tight"
            style={{
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            BenHub dành cho ai?
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
              {/* Illustration placeholder — abstract shape */}
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
                href="#register"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-colors cursor-pointer group"
              >
                {c.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Right benefits */}
            <div className="lg:col-span-3 p-8 lg:p-10">
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-6">
                Lợi ích dành cho bạn
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
