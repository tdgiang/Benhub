import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  ChevronDown,
  Clock,
  MapPin,
  Phone,
  QrCode,
  Route,
  Shield,
  Smartphone,
  Star,
  Truck,
  Wallet,
  Zap,
} from "lucide-react";
import { DriverSignupForm } from "@/components/marketing/DriverSignupForm";

export const metadata: Metadata = {
  title: "Đăng Ký Tài Xế | BenHub — Nhận Cuốc Xe Ổn Định",
  description:
    "Tham gia mạng lưới tài xế BenHub — nhận cuốc xe đều hàng ngày, E-Ticket thay phiếu giấy, ứng tiền nhanh không chờ cuối tháng.",
  keywords:
    "đăng ký tài xế BenHub, lái xe ben, tìm việc tài xế, cuốc xe ổn định, tài xế xe tải",
  openGraph: {
    title: "Đăng Ký Tài Xế BenHub — Nhận Cuốc Xe Ổn Định",
    description:
      "Cuốc xe đều. Thu nhập rõ ràng. Thanh toán nhanh. Tham gia 5,000+ tài xế BenHub.",
    url: "https://benhub.vn/dang-ky-tai-xe",
    siteName: "BenHub",
    locale: "vi_VN",
    type: "website",
  },
};

/* ─── trust stats ─── */
const stats = [
  { value: "5,000+", label: "Tài xế đã tham gia", icon: Truck },
  { value: "10+", label: "Tỉnh thành hoạt động", icon: MapPin },
  { value: "24h", label: "Phản hồi sau đăng ký", icon: Clock },
  { value: "4.8★", label: "Đánh giá từ tài xế", icon: Star },
];

/* ─── benefits ─── */
const benefits = [
  {
    icon: Zap,
    title: "Cuốc xe đều hàng ngày",
    desc: "Smart Dispatch tự động điều phối, không cần chờ cò hoặc tìm mối quen. Xe không bao giờ nằm yên quá 1 ngày.",
  },
  {
    icon: Banknote,
    title: "Thu nhập minh bạch",
    desc: "Xem doanh thu realtime trên app, biết chính xác từng chuyến được trả bao nhiêu. Không có khoản trừ ẩn.",
  },
  {
    icon: QrCode,
    title: "E-Ticket thay phiếu giấy",
    desc: "Mỗi chuyến có E-Ticket số với mã QR và GPS proof. Không bao giờ mất phiếu, không tranh cãi khối lượng.",
  },
  {
    icon: Wallet,
    title: "Ứng tiền nhanh",
    desc: "Không cần chờ cuối tháng. BenHub Finance hỗ trợ ứng tiền sớm ngay khi chuyến được xác thực.",
  },
  {
    icon: Route,
    title: "GPS bảo vệ quyền lợi",
    desc: "Mọi hành trình đều có dấu thời gian và tọa độ GPS. Bằng chứng rõ ràng bảo vệ bạn trong mọi tranh chấp.",
  },
  {
    icon: Shield,
    title: "Hỗ trợ vận hành 24/7",
    desc: "Đội vận hành BenHub luôn sẵn sàng hỗ trợ khi có sự cố. Bạn không bao giờ xử lý một mình.",
  },
];

/* ─── steps ─── */
const steps = [
  {
    num: "01",
    icon: Smartphone,
    title: "Đăng ký online",
    desc: "Điền form đăng ký chỉ mất 2 phút — họ tên, số điện thoại, biển số xe và khu vực hoạt động.",
  },
  {
    num: "02",
    icon: Phone,
    title: "BenHub liên hệ xác nhận",
    desc: "Đội vận hành sẽ gọi lại trong 24h để xác nhận thông tin xe, khu vực và lịch chạy phù hợp.",
  },
  {
    num: "03",
    icon: Truck,
    title: "Nhận chuyến qua app",
    desc: "Cài BenHub Driver, nhận lệnh điều phối. GPS bật tự động, E-Ticket tạo ngay khi chuyến bắt đầu.",
  },
  {
    num: "04",
    icon: Wallet,
    title: "Nhận tiền minh bạch",
    desc: "Đối soát tự động sau mỗi chuyến. Có thể ứng tiền sớm hoặc nhận thanh toán theo kỳ qua BenHub Finance.",
  },
];

/* ─── testimonials ─── */
const testimonials = [
  {
    initials: "HN",
    name: "Anh Nguyễn Văn Hùng",
    role: "Chủ 3 xe ben — TP.HCM",
    rating: 5,
    quote:
      "Từ khi tham gia BenHub, xe tôi không còn nằm yên quá 1 ngày. Cuốc đều, thanh toán rõ ràng, không còn phải đợi mối quen gọi nữa.",
    gradient: "from-orange-600 to-amber-500",
  },
  {
    initials: "MT",
    name: "Anh Trần Minh Tuấn",
    role: "Tài xế độc lập — Bình Dương",
    rating: 5,
    quote:
      "E-Ticket thay hết phiếu giấy, tôi không còn lo mất phiếu hay bị cãi số km nữa. Mọi chuyến đều có GPS proof rõ ràng.",
    gradient: "from-blue-700 to-blue-500",
  },
  {
    initials: "DL",
    name: "Anh Lê Văn Dũng",
    role: "Chủ 5 xe ben — Đồng Nai",
    rating: 5,
    quote:
      "Tính năng ứng tiền của BenHub Finance giúp tôi xoay vòng dòng tiền rất tốt. Không còn lo chi phí dầu giữa tháng nữa.",
    gradient: "from-teal-700 to-teal-500",
  },
];

/* ─── FAQ ─── */
const faqs = [
  {
    q: "Đăng ký tham gia BenHub có mất phí không?",
    a: "Hoàn toàn miễn phí. BenHub không thu bất kỳ phí đăng ký nào. Bạn chỉ cần điền form và chờ đội vận hành liên hệ xác nhận.",
  },
  {
    q: "Tôi cần loại bằng lái nào để tham gia?",
    a: "BenHub nhận tài xế có bằng B2 trở lên. Ưu tiên bằng C, D, F cho xe tải nặng và xe ben. Bạn cần cung cấp thông tin bằng lái khi xác minh tài khoản.",
  },
  {
    q: "Tôi đang lái xe cho công ty, có đăng ký riêng được không?",
    a: "Bạn có thể đăng ký với tư cách tài xế độc lập nếu xe thuộc sở hữu cá nhân. Nếu xe của công ty, cần có xác nhận từ chủ xe — BenHub cũng hợp tác trực tiếp với các đội xe.",
  },
  {
    q: "BenHub thanh toán như thế nào và khi nào?",
    a: "Mỗi chuyến hoàn thành sẽ được đối soát tự động. BenHub Finance hỗ trợ ứng tiền sớm (không cần chờ cuối tháng) hoặc thanh toán định kỳ theo kỳ đã thống nhất.",
  },
  {
    q: "Tôi ở tỉnh xa Hà Nội và TP.HCM có tham gia được không?",
    a: "BenHub đang mở rộng khắp Việt Nam, ưu tiên các tỉnh có dự án hạ tầng lớn như Bình Dương, Đồng Nai, Long An, Quảng Ngãi, Thanh Hóa... Hãy đăng ký và đội vận hành sẽ xác nhận khu vực phù hợp.",
  },
];

/* ═══════════════ SECTIONS ═══════════════ */

function HeroSection() {
  return (
    <section
      className="relative overflow-hidden pb-12 pt-24 md:pb-16 md:pt-28"
      style={{ background: "#050B18" }}
      aria-label="Hero"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/bg_login.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-[#050B18]/80 to-[#050B18]" />
        {/* Orange glow — top-left */}
        <div
          className="absolute -left-32 -top-20 h-[600px] w-[600px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(ellipse, #F97316 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        {/* Blue glow — bottom-right */}
        <div
          className="absolute -bottom-20 right-0 h-[500px] w-[500px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(ellipse, #3B82F6 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_420px]">
          {/* Left — copy */}
          <div>
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
              <Truck className="h-4 w-4" />
              Tuyển tài xế xe ben toàn quốc
            </div>

            {/* Headline */}
            <h1
              className="font-black leading-[0.92] tracking-tight text-white"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
                fontSize: "clamp(3.2rem, 8vw, 7rem)",
              }}
            >
              Nhận Cuốc Xe Ổn Định.
              <br />
              <span className="text-orange-400">Thu Nhập Rõ Ràng.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
              BenHub kết nối tài xế xe ben với hàng nghìn chuyến vận chuyển từ
              các dự án hạ tầng lớn. E-Ticket số, GPS tracking và ứng tiền nhanh
              — không cần cò, không chờ cuối tháng.
            </p>

            {/* Social proof */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-400">
              <span className="flex items-center gap-1.5">
                <BadgeCheck className="h-4 w-4 text-orange-400" />
                5,000+ tài xế đã tham gia
              </span>
              <span className="flex items-center gap-1.5">
                <BadgeCheck className="h-4 w-4 text-orange-400" />
                Đăng ký miễn phí
              </span>
              <span className="flex items-center gap-1.5">
                <BadgeCheck className="h-4 w-4 text-orange-400" />
                Phản hồi trong 24h
              </span>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#dang-ky"
                className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-orange-500 px-6 py-3.5 text-sm font-black text-white shadow-xl shadow-orange-950/30 transition hover:-translate-y-0.5 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-400/50"
              >
                Đăng ký ngay — Miễn phí
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#loi-ich"
                className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-white/15 px-6 py-3.5 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/8"
              >
                Tìm hiểu thêm
                <ChevronDown className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right — income highlight card */}
          <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-black/30 backdrop-blur-sm md:p-8">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-300">
              Với BenHub, tài xế có thể
            </p>
            <h2
              className="font-black leading-tight text-white"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              }}
            >
              Vận hành đội xe như một doanh nghiệp thực sự
            </h2>

            <div className="mt-6 space-y-4 border-t border-white/10 pt-5">
              {[
                { icon: Zap, text: "Cuốc xe đều — không phụ thuộc mối quen" },
                { icon: QrCode, text: "E-Ticket số — không mất phiếu bao giờ" },
                {
                  icon: Wallet,
                  text: "Ứng tiền trước cuối tháng qua BenHub Finance",
                },
                { icon: Route, text: "GPS proof cho mọi chuyến xe" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-orange-500/15">
                    <Icon className="h-4 w-4 text-orange-400" />
                  </div>
                  <p className="text-sm font-semibold text-slate-200">{text}</p>
                </div>
              ))}
            </div>

            <a
              href="#dang-ky"
              className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-orange-600"
            >
              Bắt đầu ngay hôm nay
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStats() {
  return (
    <section className="border-b border-slate-200 bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3 py-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-50">
                <Icon className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p
                  className="font-black leading-none text-slate-950"
                  style={{
                    fontFamily: "var(--font-barlow), system-ui, sans-serif",
                    fontSize: "clamp(1.3rem, 2vw, 1.6rem)",
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
    </section>
  );
}

function BenefitsSection() {
  return (
    <section id="loi-ich" className="bg-slate-50 py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
            Tại sao chọn BenHub?
          </p>
          <h2
            className="font-black leading-tight text-slate-950"
            style={{
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
            }}
          >
            Mọi thứ một tài xế cần để vận hành tốt hơn.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            BenHub không chỉ là app gọi xe — đây là hạ tầng số cho cả chuỗi vận
            hành của bạn.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100/60"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-100 bg-orange-50 transition group-hover:border-orange-200 group-hover:bg-orange-100">
                <Icon className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-black leading-snug text-slate-950">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section
      className="py-10 md:py-14"
      style={{ background: "#0F172A" }}
      aria-labelledby="how-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
            Quy trình đơn giản
          </p>
          <h2
            id="how-heading"
            className="font-black leading-tight text-white"
            style={{
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
            }}
          >
            Chỉ 4 bước để bắt đầu nhận chuyến.
          </h2>
        </div>

        {/* Steps */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ num, icon: Icon, title, desc }, i) => (
            <div key={num} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div
                  className="absolute top-10 left-full z-10 hidden h-px w-5 lg:block"
                  style={{ background: "rgba(249,115,22,0.3)" }}
                  aria-hidden="true"
                />
              )}
              <div className="rounded-[2rem] border border-white/8 bg-white/5 p-6 backdrop-blur-sm transition hover:border-orange-400/20 hover:bg-white/8">
                {/* Number + icon */}
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 shadow-lg shadow-orange-950/40">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span
                    className="font-black leading-none text-white/15"
                    style={{
                      fontFamily: "var(--font-barlow), system-ui, sans-serif",
                      fontSize: "2.5rem",
                    }}
                  >
                    {num}
                  </span>
                </div>
                <h3 className="text-lg font-black leading-snug text-white">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex justify-center">
          <a
            href="#dang-ky"
            className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-orange-500 px-7 py-4 text-sm font-black text-white shadow-xl shadow-orange-950/30 transition hover:-translate-y-0.5 hover:bg-orange-600"
          >
            Bắt đầu với bước 1 ngay bây giờ
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section
      className="bg-white py-10 md:py-14"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
            Tài xế nói gì
          </p>
          <h2
            id="testimonials-heading"
            className="font-black leading-tight text-slate-950"
            style={{
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
            }}
          >
            Từ những người đã tham gia.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map(
            ({ initials, name, role, rating, quote, gradient }) => (
              <figure
                key={name}
                className="flex flex-col rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm"
              >
                {/* Stars */}
                <div className="mb-4 flex gap-0.5" aria-label={`${rating} sao`}>
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-orange-400 text-orange-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="flex-1 text-sm leading-relaxed text-slate-700">
                  &ldquo;{quote}&rdquo;
                </blockquote>

                {/* Author */}
                <figcaption className="mt-6 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-sm font-black text-white`}
                  >
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-950">{name}</p>
                    <p className="text-xs text-slate-500">{role}</p>
                  </div>
                </figcaption>
              </figure>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section
      className="bg-slate-50 py-10 md:py-14"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
            Câu hỏi thường gặp
          </p>
          <h2
            id="faq-heading"
            className="font-black leading-tight text-slate-950"
            style={{
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
              fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
            }}
          >
            Giải đáp thắc mắc.
          </h2>
        </div>

        {/* Accordion — native details/summary, zero JS */}
        <div className="space-y-3">
          {faqs.map(({ q, a }) => (
            <details
              key={q}
              className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm open:border-orange-200 open:shadow-md open:shadow-orange-100/50"
            >
              <summary className="flex cursor-pointer select-none list-none items-center justify-between gap-4 px-6 py-5 text-sm font-bold text-slate-950 transition hover:text-orange-600 [&::-webkit-details-marker]:hidden">
                <span>{q}</span>
                {/* Rotate icon via CSS open state */}
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition group-open:rotate-180 group-open:border-orange-200 group-open:text-orange-500"
                  aria-hidden="true"
                >
                  <ChevronDown className="h-4 w-4" />
                </span>
              </summary>
              <div className="border-t border-slate-100 px-6 pb-5 pt-4">
                <p className="text-sm leading-relaxed text-slate-600">{a}</p>
              </div>
            </details>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="text-sm font-semibold text-slate-700">
            Còn câu hỏi khác?
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Liên hệ đội ngũ BenHub để được tư vấn trực tiếp.
          </p>
          <a
            href="mailto:contact@benhub.vn?subject=Hỏi về đăng ký tài xế BenHub"
            className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            Gửi email cho chúng tôi
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function FormSection() {
  return (
    <section
      id="dang-ky"
      className="py-10 md:py-14"
      style={{ background: "#050B18" }}
      aria-labelledby="form-heading"
    >
      {/* Background glows */}
      <div
        className="pointer-events-none absolute inset-x-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute left-1/4 top-0 h-96 w-96 -translate-y-1/2 rounded-full opacity-20"
          style={{
            background: "radial-gradient(ellipse, #F97316 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_560px]">
          {/* Left — pitch */}
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
              Đăng ký tham gia
            </p>
            <h2
              id="form-heading"
              className="font-black leading-[0.95] tracking-tight text-white"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
                fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
              }}
            >
              Tham gia mạng lưới tài xế BenHub ngay hôm nay.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-300">
              Điền form này và đội vận hành sẽ liên hệ trong vòng 24h để xác
              nhận khu vực chạy xe và các chuyến phù hợp với lịch của bạn.
            </p>

            {/* Mini checklist */}
            <div className="mt-8 space-y-3">
              {[
                "Đăng ký hoàn toàn miễn phí",
                "Không yêu cầu đóng phí hay thế chấp",
                "Chỉ cần 2 phút để điền form",
                "Hỗ trợ toàn quốc, ưu tiên khu vực có dự án lớn",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <BadgeCheck className="h-5 w-5 shrink-0 text-orange-400" />
                  <p className="text-sm font-semibold text-slate-300">{item}</p>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div className="mt-10 flex items-center gap-4 rounded-2xl border border-white/8 bg-white/5 p-5 backdrop-blur-sm">
              <div className="flex -space-x-2">
                {["HN", "MT", "DL", "VK"].map((init, i) => (
                  <div
                    key={init}
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#050B18] text-xs font-black text-white"
                    style={{
                      background: ["#f97316", "#2563eb", "#0f6e56", "#b45309"][
                        i
                      ],
                    }}
                    aria-hidden="true"
                  >
                    {init}
                  </div>
                ))}
              </div>
              <p className="text-sm font-semibold text-slate-300">
                <span className="text-white">5,000+ tài xế</span> đã tham gia
                BenHub
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div>
            <DriverSignupForm />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ PAGE ═══════════════ */
export default function DriverSignupPage() {
  return (
    <main>
      <HeroSection />
      <TrustStats />
      <BenefitsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <FormSection />
    </main>
  );
}
