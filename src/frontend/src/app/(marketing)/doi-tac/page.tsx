import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  Cpu,
  Factory,
  Handshake,
  Landmark,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Network,
  Phone,
  ShieldCheck,
  TrendingUp,
  Truck,
  Wallet,
  Zap,
} from "lucide-react";
import { PartnerSignupForm } from "@/components/marketing/PartnerSignupForm";

export const metadata: Metadata = {
  title: "Hợp Tác Đối Tác | BenHub — Logistics Công Trình",
  description:
    "Tham gia hệ sinh thái BenHub với tư cách chủ đầu tư, đội xe, mỏ vật liệu, tổ chức tài chính hoặc nhà đầu tư. Nền tảng số duy nhất cho logistics xây dựng Việt Nam.",
  keywords:
    "đối tác BenHub, hợp tác logistics xây dựng, chủ đầu tư, đội xe, mỏ vật liệu, đầu tư BenHub",
  openGraph: {
    title: "Hợp Tác Cùng BenHub — Hệ Sinh Thái Logistics Công Trình",
    description:
      "Tham gia nền tảng số hóa logistics xây dựng hàng đầu Việt Nam cùng 5,000+ tài xế và 10+ dự án đang vận hành.",
    url: "https://benhub.vn/doi-tac",
    siteName: "BenHub",
    locale: "vi_VN",
    type: "website",
  },
};

/* ─── Data ─── */
const partnerSegments = [
  {
    icon: Building2,
    tag: "Chủ Đầu Tư / Tổng Thầu",
    headline: "Kiểm soát toàn bộ logistics công trường trong một màn hình.",
    benefits: [
      "Dashboard realtime theo dõi tất cả chuyến xe",
      "Giảm thất thoát vật liệu xuống gần 0%",
      "Đối soát tự động, báo cáo khối lượng tức thì",
    ],
    cta: "Yêu cầu demo",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    tagBg: "bg-blue-50 text-blue-700",
    borderHover: "hover:border-blue-200",
    shadowHover: "hover:shadow-blue-100/60",
  },
  {
    icon: Truck,
    tag: "Đội Xe Địa Phương",
    headline: "Biến đội xe thành doanh nghiệp vận hành bằng dữ liệu.",
    benefits: [
      "Nhận việc đều từ hệ sinh thái BenHub",
      "Quản lý toàn bộ đội xe trên 1 app",
      "Doanh thu realtime, ứng tiền nhanh",
    ],
    cta: "Đăng ký đội xe",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    tagBg: "bg-orange-50 text-orange-700",
    borderHover: "hover:border-orange-200",
    shadowHover: "hover:shadow-orange-100/60",
  },
  {
    icon: Factory,
    tag: "Mỏ Vật Liệu / Nhà Cung Ứng",
    headline: "Kết nối nguồn cung vật liệu trực tiếp với công trường.",
    benefits: [
      "Đơn hàng ổn định từ hàng nghìn dự án",
      "Logistics tối ưu, giao đúng lịch",
      "Thanh toán minh bạch, không qua trung gian",
    ],
    cta: "Kết nối ngay",
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
    tagBg: "bg-teal-50 text-teal-700",
    borderHover: "hover:border-teal-200",
    shadowHover: "hover:shadow-teal-100/60",
  },
  {
    icon: Landmark,
    tag: "Tài Chính / Bảo Hiểm",
    headline: "Mở sản phẩm tài chính cho đội xe dựa trên dữ liệu thực.",
    benefits: [
      "GPS + E-Ticket cung cấp dữ liệu tín dụng thực",
      "Cơ sở để triển khai factoring, ứng tiền",
      "Tích hợp API với nền tảng BenHub Finance",
    ],
    cta: "Trao đổi mô hình",
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
    tagBg: "bg-slate-100 text-slate-700",
    borderHover: "hover:border-slate-300",
    shadowHover: "hover:shadow-slate-100/60",
  },
  {
    icon: Cpu,
    tag: "Công Nghệ / Tích Hợp",
    headline: "Truy cập dữ liệu vận hành để xây sản phẩm mới.",
    benefits: [
      "API tích hợp dữ liệu GPS, E-Ticket, đội xe",
      "Co-development với đội kỹ thuật BenHub",
      "Môi trường sandbox & revenue share",
    ],
    cta: "Liên hệ kỹ thuật",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    tagBg: "bg-violet-50 text-violet-700",
    borderHover: "hover:border-violet-200",
    shadowHover: "hover:shadow-violet-100/60",
  },
  {
    icon: TrendingUp,
    tag: "Nhà Đầu Tư Chiến Lược",
    headline: "Đầu tư vào infrastructure layer của logistics xây dựng VN.",
    benefits: [
      "Thị trường 60–80 tỷ USD, số hóa < 5%",
      "Mô hình asset-light, platform-first",
      "Roadmap rõ ràng đến 2035 và IPO",
    ],
    cta: "Tải Pitch Deck",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    tagBg: "bg-amber-50 text-amber-700",
    borderHover: "hover:border-amber-200",
    shadowHover: "hover:shadow-amber-100/60",
  },
] as const;

const quickStats = [
  { value: "5,000+", label: "Tài xế đang vận hành", icon: Truck },
  { value: "10+", label: "Tỉnh thành hoạt động", icon: BarChart3 },
  { value: "24h", label: "Phản hồi đối tác mới", icon: MessageSquare },
  { value: "60–80B", label: "USD quy mô thị trường", icon: TrendingUp },
];

const marketStats = [
  {
    value: "60–80",
    unit: "tỷ USD",
    label: "Quy mô ngành xây dựng VN mỗi năm",
    icon: BarChart3,
    sub: "Tăng trưởng ổn định 8–10%/năm",
  },
  {
    value: "100,000+",
    unit: "xe ben",
    label: "Đang hoạt động tại Việt Nam",
    icon: Truck,
    sub: "Phần lớn vẫn vận hành thủ công",
  },
  {
    value: "<5%",
    unit: "số hóa",
    label: "Mức độ số hóa logistics công trình",
    icon: CircleDot,
    sub: "Khoảng trống BenHub đang lấp đầy",
  },
];

const advantages = [
  {
    num: "01",
    icon: Network,
    title: "Nền tảng kết nối đa bên",
    desc: "BenHub là layer dữ liệu trung gian kết nối tất cả bên tham gia vào một luồng vận hành thống nhất — không phải ứng dụng đơn lẻ.",
    metric: "6 nhóm đối tác cùng kết nối",
  },
  {
    num: "02",
    icon: LayoutDashboard,
    title: "Dữ liệu vận hành thực",
    desc: "Mọi chuyến xe đều tạo ra GPS proof, E-Ticket số và dấu thời gian. Dữ liệu có cấu trúc, sẵn sàng cho AI và tài chính.",
    metric: "100% chuyến xe được ghi nhận",
  },
  {
    num: "03",
    icon: Zap,
    title: "Tích hợp nhanh qua API",
    desc: "Đối tác có thể tích hợp trong vài tuần, không mất vài tháng. Tài liệu đầy đủ, môi trường test sẵn sàng.",
    metric: "Onboarding trong 2–4 tuần",
  },
  {
    num: "04",
    icon: ShieldCheck,
    title: "Kiến trúc mở rộng toàn quốc",
    desc: "Mô hình cụm địa phương cho phép nhân rộng nhanh theo từng tỉnh, dự án mà không tăng độ phức tạp vận hành.",
    metric: "Mở rộng theo từng cụm tỉnh",
  },
];

const faqs = [
  {
    q: "BenHub hợp tác với đối tác theo mô hình nào?",
    a: "Tùy loại đối tác: Chủ đầu tư và tổng thầu thường bắt đầu bằng pilot 1–3 tháng. Đội xe tham gia mạng lưới trực tiếp. Tài chính và công nghệ đàm phán mô hình API hoặc revenue share. Nhà đầu tư liên hệ trực tiếp đội sáng lập.",
  },
  {
    q: "Tôi là chủ đầu tư, BenHub có demo không?",
    a: "Có. Điền form hoặc liên hệ trực tiếp — đội ngũ BenHub sẽ sắp xếp demo trực tuyến hoặc tại dự án trong vòng 2 ngày làm việc. Demo bao gồm luồng từ lệnh vận chuyển đến đối soát realtime.",
  },
  {
    q: "Tôi có đội xe, cần chuẩn bị gì trước khi tham gia?",
    a: "Chỉ cần thông tin xe, tài xế và khu vực hoạt động. BenHub cung cấp app tài xế, hỗ trợ onboarding và đào tạo sử dụng. Không yêu cầu thiết bị phần cứng đặc biệt.",
  },
  {
    q: "Dữ liệu của đối tác được bảo mật như thế nào?",
    a: "Mỗi đối tác có không gian dữ liệu riêng biệt. BenHub không chia sẻ dữ liệu vận hành của đối tác cho bên thứ ba ngoài hợp đồng. Dữ liệu được mã hóa và lưu trữ trên hạ tầng cloud tuân thủ tiêu chuẩn bảo mật.",
  },
  {
    q: "Nhà đầu tư có thể tìm thêm thông tin ở đâu?",
    a: "Điền form với loại đối tác 'Nhà đầu tư chiến lược' để nhận Pitch Deck và lịch gặp với đội sáng lập. Hoặc liên hệ trực tiếp qua email investor@benhub.vn.",
  },
];

/* ═══════════════════════════════ SECTIONS ═══════════════════════════════ */

function HeroSection() {
  return (
    <section
      className="relative overflow-hidden pb-12 pt-24 md:pb-16 md:pt-28"
      style={{ background: "#050B18" }}
      aria-label="Hero"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url('/bg_login.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-[#050B18]/80 to-[#050B18]" />
        <div
          className="absolute -right-24 -top-16 h-[560px] w-[560px] rounded-full opacity-25"
          style={{
            background: "radial-gradient(ellipse, #F97316 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        <div
          className="absolute -bottom-16 -left-16 h-[480px] w-[480px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(ellipse, #2563eb 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.9) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.9) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-400/25 bg-orange-500/12 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
          <Handshake className="h-4 w-4" />
          Chương trình đối tác BenHub
        </div>

        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
          {/* Left — copy */}
          <div>
            <h1
              className="font-black leading-[0.93] tracking-tight text-white"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
                fontSize: "clamp(2.8rem, 7vw, 6.2rem)",
              }}
            >
              Cùng BenHub xây dựng logistics công trình
              <span className="text-orange-400"> thông minh hơn.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
              Chúng tôi đang tìm kiếm đối tác ở mọi mắt xích của chuỗi — từ
              chủ đầu tư, đội xe, mỏ vật liệu đến tổ chức tài chính và công
              nghệ. Cùng nhau số hóa ngành 60–80 tỷ USD.
            </p>

            {/* Trust signals */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              {[
                "Phản hồi trong 1 ngày làm việc",
                "Không yêu cầu độc quyền",
                "Hỗ trợ onboarding toàn trình",
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-xs font-semibold text-slate-200"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-orange-400" />
                  {item}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#hop-tac"
                className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-orange-500 px-6 py-3.5 text-sm font-black text-white shadow-xl shadow-orange-950/30 transition hover:-translate-y-0.5 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-400/50"
              >
                Đăng ký hợp tác ngay
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#doi-tac-types"
                className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-white/20 px-6 py-3.5 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/8"
              >
                Xem các hình thức
                <ChevronDown className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right — partner cards preview */}
          <div className="hidden lg:block">
            <div className="rounded-[2rem] border border-white/12 bg-white/6 p-6 shadow-2xl shadow-black/40 backdrop-blur-md">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Đối tác đang tham gia
              </p>
              <div className="space-y-2.5">
                {[
                  { icon: Building2, label: "Chủ Đầu Tư / Tổng Thầu", color: "text-blue-400", bg: "bg-blue-500/15" },
                  { icon: Truck, label: "Đội Xe Địa Phương", color: "text-orange-400", bg: "bg-orange-500/15" },
                  { icon: Factory, label: "Mỏ Vật Liệu / Nhà Cung Ứng", color: "text-teal-400", bg: "bg-teal-500/15" },
                  { icon: Landmark, label: "Tài Chính / Bảo Hiểm", color: "text-slate-300", bg: "bg-slate-500/20" },
                  { icon: Cpu, label: "Công Nghệ / Tích Hợp", color: "text-violet-400", bg: "bg-violet-500/15" },
                  { icon: TrendingUp, label: "Nhà Đầu Tư Chiến Lược", color: "text-amber-400", bg: "bg-amber-500/15" },
                ].map(({ icon: Icon, label, color, bg }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-3 transition hover:border-white/15 hover:bg-white/8"
                  >
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${bg}`}>
                      <Icon className={`h-4 w-4 ${color}`} />
                    </div>
                    <span className="text-sm font-semibold text-slate-200">{label}</span>
                    <BadgeCheck className="ml-auto h-4 w-4 shrink-0 text-orange-400/70" />
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4">
                <p className="text-xs text-slate-400">Tất cả kết nối qua BenHub Platform</p>
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_2px_rgba(52,211,153,0.5)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Quick stats bar below hero ── */
function QuickStatsBar() {
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 divide-x divide-slate-100 sm:grid-cols-4">
          {quickStats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3 px-4 py-5 sm:px-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-50">
                <Icon className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p
                  className="font-black leading-none text-slate-950"
                  style={{
                    fontFamily: "var(--font-barlow), system-ui, sans-serif",
                    fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                  }}
                >
                  {value}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PartnerSegmentsSection() {
  return (
    <section id="doi-tac-types" className="bg-slate-50 py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
            Hình thức hợp tác
          </p>
          <h2
            className="font-black leading-tight text-slate-950"
            style={{
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            }}
          >
            Bạn muốn hợp tác theo cách nào?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Chọn hình thức phù hợp với vai trò của bạn. Tất cả đều dẫn đến một
            mục tiêu chung: logistics công trình minh bạch và hiệu quả hơn.
          </p>
        </div>

        {/* Grid 2×3 */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partnerSegments.map(({ icon: Icon, tag, headline, benefits, cta, iconBg, iconColor, tagBg, borderHover, shadowHover }) => (
            <a
              key={tag}
              href="#hop-tac"
              className={`group flex cursor-pointer flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl ${borderHover} ${shadowHover} focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200`}
            >
              {/* Icon + Tag row */}
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconBg}`}>
                  <Icon className={`h-6 w-6 ${iconColor}`} />
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${tagBg}`}>
                  {tag}
                </span>
              </div>

              {/* Headline */}
              <h3 className="text-base font-black leading-snug text-slate-950 transition-colors group-hover:text-orange-600">
                {headline}
              </h3>

              {/* Benefits */}
              <ul className="mt-4 flex-1 space-y-2.5">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <BadgeCheck
                      className="mt-0.5 h-4 w-4 shrink-0 text-orange-500"
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-snug text-slate-600">{b}</span>
                  </li>
                ))}
              </ul>

              {/* CTA — arrow only moves, no layout shift */}
              <div className="mt-5 flex items-center gap-2 text-sm font-bold text-orange-600">
                {cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </a>
          ))}
        </div>

        {/* Footer hint */}
        <p className="mt-8 text-center text-sm text-slate-500">
          Không chắc hình thức nào phù hợp?{" "}
          <a
            href="mailto:partner@benhub.vn"
            className="font-semibold text-orange-600 underline-offset-2 hover:underline"
          >
            Liên hệ trực tiếp →
          </a>
        </p>
      </div>
    </section>
  );
}

function MarketSection() {
  return (
    <section
      className="py-10 md:py-14"
      style={{ background: "#0F172A" }}
      aria-labelledby="market-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
              Cơ hội thị trường
            </p>
            <h2
              id="market-heading"
              className="font-black leading-tight text-white"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              }}
            >
              Khoảng trống 60–80 tỷ USD đang chờ được lấp đầy.
            </h2>
          </div>
          <p className="text-base leading-relaxed text-slate-300">
            Ngành xây dựng Việt Nam tăng trưởng mạnh nhờ cao tốc Bắc-Nam, sân
            bay Long Thành và làn sóng FDI. Nhưng logistics vận tải công trình
            vẫn vận hành bằng điện thoại, phiếu giấy và Excel — đây là khoảng
            trống BenHub đang lấp đầy.
          </p>
        </div>

        {/* Stats — dùng bg cao hơn để đọc được */}
        <div className="grid gap-4 md:grid-cols-3">
          {marketStats.map(({ value, unit, label, icon: Icon, sub }) => (
            <div
              key={label}
              className="rounded-[2rem] border border-slate-700 bg-slate-800 p-7"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/20">
                <Icon className="h-6 w-6 text-orange-400" />
              </div>
              <p
                className="font-black leading-none text-white"
                style={{
                  fontFamily: "var(--font-barlow), system-ui, sans-serif",
                  fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                }}
              >
                {value}
              </p>
              <p className="mt-1 text-sm font-bold text-orange-300">{unit}</p>
              <p className="mt-3 text-sm font-medium text-slate-300">{label}</p>
              <p className="mt-1 text-xs text-slate-500">{sub}</p>
            </div>
          ))}
        </div>

        {/* Callout — bg đậm hơn để đọc được */}
        <div className="mt-6 rounded-[2rem] border border-orange-500/30 bg-orange-500/15 p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-500/25">
              <Zap className="h-6 w-6 text-orange-300" />
            </div>
            <div>
              <p className="text-base font-black text-white md:text-lg">
                Quy mô cực lớn — Số hóa cực thấp.
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-300">
                Đây là đặc điểm hiếm có của một thị trường trưởng thành nhưng
                chưa có nền tảng số nào thống trị. BenHub đang chiếm vị thế đó
                — và đây là cơ hội cho mọi đối tác cùng tham gia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── NEW: 3-step partnership process ── */
function ProcessSection() {
  return (
    <section className="bg-white py-10 md:py-14" aria-labelledby="process-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
            Quy trình hợp tác
          </p>
          <h2
            id="process-heading"
            className="font-black leading-tight text-slate-950"
            style={{
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            }}
          >
            Chỉ 3 bước để bắt đầu.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600">
            Quy trình đơn giản, không ràng buộc. Từ lần liên hệ đầu tiên đến
            pilot vận hành thực tế chỉ mất vài tuần.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              step: "01",
              icon: Mail,
              title: "Gửi thông tin",
              desc: "Điền form đăng ký hoặc gửi email. Chỉ mất 2 phút, không cần tài liệu phức tạp.",
              detail: "Phản hồi trong 1 ngày làm việc",
            },
            {
              step: "02",
              icon: Phone,
              title: "Trao đổi nhu cầu",
              desc: "Đội BenHub sẽ liên hệ để hiểu rõ nhu cầu, khu vực và mô hình hợp tác phù hợp.",
              detail: "Demo / meeting 30–45 phút",
            },
            {
              step: "03",
              icon: Wallet,
              title: "Pilot & Scale",
              desc: "Bắt đầu từ một cụm nhỏ, đo kết quả thực tế, rồi mở rộng theo nhịp độ phù hợp.",
              detail: "Pilot từ 1–3 tháng",
            },
          ].map(({ step, icon: Icon, title, desc, detail }, i) => (
            <div key={step} className="relative flex flex-col items-start">
              {/* Connector */}
              {i < 2 && (
                <div
                  className="absolute top-6 left-[calc(100%+12px)] hidden h-px w-6 md:block"
                  style={{ background: "rgba(249,115,22,0.25)" }}
                  aria-hidden="true"
                />
              )}
              <div className="w-full rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
                {/* Step number + icon */}
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 shadow-lg shadow-orange-200">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span
                    className="font-black leading-none text-slate-200"
                    style={{
                      fontFamily: "var(--font-barlow), system-ui, sans-serif",
                      fontSize: "2.5rem",
                    }}
                  >
                    {step}
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>

                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-600">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {detail}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="#hop-tac"
            className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-orange-500 px-7 py-4 text-sm font-black text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-orange-600"
          >
            Bắt đầu bước 1 ngay hôm nay
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function AdvantagesSection() {
  return (
    <section className="bg-slate-50 py-10 md:py-14" aria-labelledby="adv-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
            Lợi thế nền tảng
          </p>
          <h2
            id="adv-heading"
            className="font-black leading-tight text-slate-950"
            style={{
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            }}
          >
            Tại sao đối tác chọn BenHub?
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {advantages.map(({ num, icon: Icon, title, desc, metric }) => (
            <div
              key={title}
              className="group flex gap-5 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-100/50"
            >
              {/* Number */}
              <div className="shrink-0">
                <span
                  className="font-black leading-none text-orange-100 transition group-hover:text-orange-200"
                  style={{
                    fontFamily: "var(--font-barlow), system-ui, sans-serif",
                    fontSize: "3rem",
                    lineHeight: 1,
                  }}
                >
                  {num}
                </span>
              </div>
              <div>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-50 transition group-hover:bg-orange-100">
                  <Icon className="h-5 w-5 text-orange-500" />
                </div>
                <h3 className="text-lg font-black leading-snug text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
                <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                  <BadgeCheck className="h-3.5 w-3.5 text-orange-500" />
                  {metric}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="bg-white py-10 md:py-14" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
            Câu hỏi thường gặp
          </p>
          <h2
            id="faq-heading"
            className="font-black leading-tight text-slate-950"
            style={{
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
            }}
          >
            Giải đáp về hợp tác.
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map(({ q, a }) => (
            <details
              key={q}
              className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50 shadow-sm open:border-orange-300 open:bg-white open:shadow-md"
            >
              <summary className="flex cursor-pointer select-none list-none items-center justify-between gap-4 px-6 py-5 text-sm font-bold text-slate-950 transition hover:text-orange-600 [&::-webkit-details-marker]:hidden">
                <span>{q}</span>
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition group-open:rotate-180 group-open:border-orange-300 group-open:bg-orange-50 group-open:text-orange-500"
                  aria-hidden="true"
                >
                  <ChevronDown className="h-4 w-4" />
                </span>
              </summary>
              <div className="border-l-4 border-orange-400 mx-6 mb-5 mt-1 pl-4">
                <p className="text-sm leading-relaxed text-slate-600">{a}</p>
              </div>
            </details>
          ))}
        </div>

        {/* Direct contact card */}
        <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50">
          <div className="flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:text-left">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100">
              <MessageSquare className="h-6 w-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-slate-950">Còn câu hỏi khác?</p>
              <p className="mt-0.5 text-sm text-slate-500">
                Đội ngũ BenHub sẵn sàng trao đổi trực tiếp với bạn.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:justify-end">
              <a
                href="mailto:partner@benhub.vn"
                className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-orange-300 hover:text-orange-600"
              >
                <Mail className="h-4 w-4" />
                partner@benhub.vn
              </a>
              <a
                href="#hop-tac"
                className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-orange-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600"
              >
                Điền form
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormSection() {
  return (
    <section
      id="hop-tac"
      className="relative overflow-hidden py-10 md:py-14"
      style={{ background: "#050B18" }}
      aria-labelledby="form-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(ellipse, #F97316 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 h-[320px] w-[320px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(ellipse, #2563eb 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_580px]">
          {/* Left pitch */}
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
              Bắt đầu hợp tác
            </p>
            <h2
              id="form-heading"
              className="font-black leading-[0.95] tracking-tight text-white"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
                fontSize: "clamp(2.6rem, 6vw, 5rem)",
              }}
            >
              Một bước để gia nhập hệ sinh thái BenHub.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-300">
              Điền form và đội phát triển đối tác BenHub sẽ liên hệ trong vòng
              1 ngày làm việc. Trao đổi mở, không ràng buộc, không mất phí.
            </p>

            {/* Process recap */}
            <div className="mt-8 space-y-4">
              {[
                { step: "01", label: "Điền form — chỉ mất 2 phút" },
                { step: "02", label: "BenHub liên hệ xác nhận nhu cầu" },
                { step: "03", label: "Demo hoặc pilot theo thỏa thuận" },
              ].map(({ step, label }) => (
                <div key={step} className="flex items-center gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-sm font-black text-white shadow-lg shadow-orange-950/30">
                    {step}
                  </div>
                  <p className="text-sm font-semibold text-slate-200">{label}</p>
                </div>
              ))}
            </div>

            {/* Contact alt */}
            <div className="mt-8 rounded-2xl border border-white/12 bg-white/6 p-5 backdrop-blur-sm">
              <p className="mb-3 text-sm font-semibold text-slate-300">
                Muốn liên hệ trực tiếp?
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:partner@benhub.vn"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/15 bg-white/8 px-4 py-2 text-xs font-bold text-slate-200 transition hover:border-white/30 hover:bg-white/12"
                >
                  <Mail className="h-4 w-4 text-orange-400" />
                  partner@benhub.vn
                </a>
                <a
                  href="mailto:investor@benhub.vn"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/15 bg-white/8 px-4 py-2 text-xs font-bold text-slate-200 transition hover:border-white/30 hover:bg-white/12"
                >
                  <TrendingUp className="h-4 w-4 text-amber-400" />
                  investor@benhub.vn
                </a>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div>
            <PartnerSignupForm />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════ PAGE ═══════════════════════════════ */
export default function PartnerPage() {
  return (
    <main>
      <HeroSection />
      <QuickStatsBar />
      <PartnerSegmentsSection />
      <MarketSection />
      <ProcessSection />
      <AdvantagesSection />
      <FAQSection />
      <FormSection />
    </main>
  );
}
