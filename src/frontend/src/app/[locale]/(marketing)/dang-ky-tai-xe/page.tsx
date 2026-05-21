import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isVi = locale !== "en";
  return {
    title: isVi
      ? "Đăng Ký Tài Xế | BenHub — Nhận Cuốc Xe Ổn Định"
      : "Register as Driver | BenHub — Get Consistent Trips",
    description: isVi
      ? "Tham gia mạng lưới tài xế BenHub — nhận cuốc xe đều hàng ngày, E-Ticket thay phiếu giấy, ứng tiền nhanh không chờ cuối tháng."
      : "Join BenHub's driver network — consistent daily trips, digital E-Ticket, advance payment without waiting.",
  };
}

const stats = [
  {
    value: "5,000+",
    labelVi: "Tài xế đã tham gia",
    labelEn: "Drivers joined",
    icon: Truck,
  },
  {
    value: "10+",
    labelVi: "Tỉnh thành hoạt động",
    labelEn: "Provinces active",
    icon: MapPin,
  },
  {
    value: "24h",
    labelVi: "Phản hồi sau đăng ký",
    labelEn: "Response time",
    icon: Clock,
  },
  {
    value: "4.8★",
    labelVi: "Đánh giá từ tài xế",
    labelEn: "Driver rating",
    icon: Star,
  },
];

const benefits = [
  {
    icon: Zap,
    titleVi: "Cuốc xe đều hàng ngày",
    titleEn: "Consistent daily trips",
    descVi:
      "Smart Dispatch tự động điều phối, không cần chờ cò hoặc tìm mối quen.",
    descEn: "Smart Dispatch auto-coordinates, no need to wait for middlemen.",
  },
  {
    icon: Banknote,
    titleVi: "Thu nhập minh bạch",
    titleEn: "Transparent income",
    descVi:
      "Xem doanh thu realtime trên app, biết chính xác từng chuyến được trả bao nhiêu.",
    descEn:
      "View revenue realtime in app, know exactly how much each trip pays.",
  },
  {
    icon: QrCode,
    titleVi: "E-Ticket thay phiếu giấy",
    titleEn: "E-Ticket replaces paper",
    descVi:
      "Mỗi chuyến có E-Ticket số với mã QR và GPS proof. Không bao giờ mất phiếu.",
    descEn: "Every trip has a digital E-Ticket with QR code and GPS proof.",
  },
  {
    icon: Wallet,
    titleVi: "Ứng tiền nhanh",
    titleEn: "Fast advance payment",
    descVi:
      "Không cần chờ cuối tháng. BenHub Finance hỗ trợ ứng tiền sớm ngay khi chuyến được xác thực.",
    descEn:
      "No waiting until end of month. BenHub Finance supports early advance.",
  },
  {
    icon: Route,
    titleVi: "GPS bảo vệ quyền lợi",
    titleEn: "GPS protects your rights",
    descVi:
      "Mọi hành trình đều có dấu thời gian và tọa độ GPS. Bằng chứng rõ ràng.",
    descEn: "Every journey has timestamps and GPS coordinates. Clear evidence.",
  },
  {
    icon: Shield,
    titleVi: "Hỗ trợ vận hành 24/7",
    titleEn: "24/7 operational support",
    descVi: "Đội vận hành BenHub luôn sẵn sàng hỗ trợ khi có sự cố.",
    descEn:
      "BenHub operations team is always ready to help when incidents occur.",
  },
];

const steps = [
  {
    num: "01",
    icon: Smartphone,
    titleVi: "Đăng ký online",
    titleEn: "Register online",
    descVi:
      "Điền form đăng ký chỉ mất 2 phút — họ tên, số điện thoại, biển số xe và khu vực hoạt động.",
    descEn: "Fill in the registration form in just 2 minutes.",
  },
  {
    num: "02",
    icon: Phone,
    titleVi: "BenHub liên hệ xác nhận",
    titleEn: "BenHub contacts for verification",
    descVi:
      "Đội vận hành sẽ gọi lại trong 24h để xác nhận thông tin xe, khu vực và lịch chạy phù hợp.",
    descEn: "Operations team will call back within 24h to confirm details.",
  },
  {
    num: "03",
    icon: Truck,
    titleVi: "Nhận chuyến qua app",
    titleEn: "Receive trips via app",
    descVi:
      "Cài BenHub Driver, nhận lệnh điều phối. GPS bật tự động, E-Ticket tạo ngay khi chuyến bắt đầu.",
    descEn: "Install BenHub Driver, receive dispatch orders.",
  },
  {
    num: "04",
    icon: Wallet,
    titleVi: "Nhận tiền minh bạch",
    titleEn: "Receive transparent payment",
    descVi:
      "Đối soát tự động sau mỗi chuyến. Có thể ứng tiền sớm hoặc nhận thanh toán theo kỳ.",
    descEn: "Automatic reconciliation after each trip. Can advance early.",
  },
];

export default async function DriverSignupPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isVi = locale !== "en";

  return (
    <main>
      {/* Hero */}
      <section
        className="relative overflow-hidden pb-12 pt-24 md:pb-16 md:pt-28"
        style={{ background: "#050B18" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url('/bg_login.png')" }}
          />

          <div
            className="absolute -left-32 -top-20 h-[600px] w-[600px] rounded-full opacity-30"
            style={{
              background:
                "radial-gradient(ellipse, #F97316 0%, transparent 70%)",
              filter: "blur(90px)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_420px]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
                <Truck className="h-4 w-4" />
                {isVi
                  ? "Tuyển tài xế xe ben toàn quốc"
                  : "Recruiting dump truck drivers nationwide"}
              </div>
              <h1
                className="font-black leading-[0.92] tracking-tight text-white"
                style={{
                  fontFamily: "var(--font-barlow), system-ui, sans-serif",
                  fontSize: "clamp(2.8rem, 7vw, 5rem)",
                  lineHeight: "1.1",
                }}
              >
                {isVi ? "Nhận Cuốc Xe Ổn Định." : "Get Consistent Trips."}
                <br />
                <span className="text-orange-400">
                  {isVi ? "Thu Nhập Rõ Ràng." : "Clear Income."}
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
                {isVi
                  ? "BenHub kết nối tài xế xe ben với hàng nghìn chuyến vận chuyển từ các dự án hạ tầng lớn. E-Ticket số, GPS tracking và ứng tiền nhanh — không cần cò, không chờ cuối tháng."
                  : "BenHub connects dump truck drivers with thousands of trips from major infrastructure projects. Digital E-Ticket, GPS tracking and fast advance."}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-400">
                {[
                  isVi ? "5,000+ tài xế đã tham gia" : "5,000+ drivers joined",
                  isVi ? "Đăng ký miễn phí" : "Free registration",
                  isVi ? "Phản hồi trong 24h" : "Response within 24h",
                ].map((item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <BadgeCheck className="h-4 w-4 text-orange-400" />
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#dang-ky"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-orange-500 px-6 py-3.5 text-sm font-black text-white shadow-xl shadow-orange-950/30 transition hover:-translate-y-0.5 hover:bg-orange-600"
                >
                  {isVi ? "Đăng ký ngay — Miễn phí" : "Register Now — Free"}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#loi-ich"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-white/15 px-6 py-3.5 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/8"
                >
                  {isVi ? "Tìm hiểu thêm" : "Learn more"}
                  <ChevronDown className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-black/30 backdrop-blur-sm md:p-8">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-300">
                {isVi
                  ? "Với BenHub, tài xế có thể"
                  : "With BenHub, drivers can"}
              </p>
              <h2
                className="font-black leading-tight text-white"
                style={{
                  fontFamily: "var(--font-barlow), system-ui, sans-serif",
                  fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                }}
              >
                {isVi
                  ? "Vận hành đội xe như một doanh nghiệp thực sự"
                  : "Operate like a real business"}
              </h2>
              <div className="mt-6 space-y-4 border-t border-white/10 pt-5">
                {[
                  {
                    icon: Zap,
                    textVi: "Cuốc xe đều — không phụ thuộc mối quen",
                    textEn: "Consistent trips — no reliance on middlemen",
                  },
                  {
                    icon: QrCode,
                    textVi: "E-Ticket số — không mất phiếu bao giờ",
                    textEn: "Digital E-Ticket — never lose a slip",
                  },
                  {
                    icon: Wallet,
                    textVi: "Ứng tiền trước cuối tháng qua BenHub Finance",
                    textEn: "Advance payment via BenHub Finance",
                  },
                  {
                    icon: Route,
                    textVi: "GPS proof cho mọi chuyến xe",
                    textEn: "GPS proof for every trip",
                  },
                ].map(({ icon: Icon, textVi, textEn }) => (
                  <div key={textVi} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-orange-500/15">
                      <Icon className="h-4 w-4 text-orange-400" />
                    </div>
                    <p className="text-sm font-semibold text-slate-200">
                      {isVi ? textVi : textEn}
                    </p>
                  </div>
                ))}
              </div>
              <a
                href="#dang-ky"
                className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-orange-600"
              >
                {isVi ? "Bắt đầu ngay hôm nay" : "Get started today"}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="border-b border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map(({ value, labelVi, labelEn, icon: Icon }) => (
              <div key={labelVi} className="flex items-center gap-3 py-2">
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
                  <p className="mt-0.5 text-xs text-slate-500">
                    {isVi ? labelVi : labelEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="loi-ich" className="bg-slate-50 py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
              {isVi ? "Tại sao chọn BenHub?" : "Why choose BenHub?"}
            </p>
            <h2
              className="font-black leading-tight text-slate-950"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
              }}
            >
              {isVi
                ? "Mọi thứ một tài xế cần để vận hành tốt hơn."
                : "Everything a driver needs to operate better."}
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map(
              ({ icon: Icon, titleVi, titleEn, descVi, descEn }) => (
                <div
                  key={titleVi}
                  className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100/60"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-100 bg-orange-50 transition group-hover:border-orange-200 group-hover:bg-orange-100">
                    <Icon className="h-6 w-6 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-black leading-snug text-slate-950">
                    {isVi ? titleVi : titleEn}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {isVi ? descVi : descEn}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-10 md:py-14" style={{ background: "#0F172A" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
              {isVi ? "Quy trình đơn giản" : "Simple process"}
            </p>
            <h2
              className="font-black leading-tight text-white"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
              }}
            >
              {isVi
                ? "Chỉ 4 bước để bắt đầu nhận chuyến."
                : "Just 4 steps to start."}
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(
              ({ num, icon: Icon, titleVi, titleEn, descVi, descEn }) => (
                <div
                  key={num}
                  className="rounded-[2rem] border border-white/8 bg-white/5 p-6 backdrop-blur-sm transition hover:border-orange-400/20 hover:bg-white/8"
                >
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
                    {isVi ? titleVi : titleEn}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {isVi ? descVi : descEn}
                  </p>
                </div>
              ),
            )}
          </div>
          <div className="mt-12 flex justify-center">
            <a
              href="#dang-ky"
              className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-orange-500 px-7 py-4 text-sm font-black text-white shadow-xl shadow-orange-950/30 transition hover:-translate-y-0.5 hover:bg-orange-600"
            >
              {isVi
                ? "Bắt đầu với bước 1 ngay bây giờ"
                : "Start with step 1 right now"}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Form */}
      <section
        id="dang-ky"
        className="py-10 md:py-14"
        style={{ background: "#050B18" }}
      >
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_560px]">
            <div className="flex flex-col justify-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
                {isVi ? "Đăng ký tham gia" : "Register"}
              </p>
              <h2
                className="font-black leading-[0.95] tracking-tight text-white"
                style={{
                  fontFamily: "var(--font-barlow), system-ui, sans-serif",
                  fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                }}
              >
                {isVi
                  ? "Tham gia mạng lưới tài xế BenHub ngay hôm nay."
                  : "Join BenHub's driver network today."}
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-slate-300">
                {isVi
                  ? "Điền form này và đội vận hành sẽ liên hệ trong vòng 24h để xác nhận khu vực chạy xe và các chuyến phù hợp với lịch của bạn."
                  : "Fill in the form and the operations team will contact within 24h to confirm your area and suitable trips."}
              </p>
              <div className="mt-8 space-y-3">
                {(isVi
                  ? [
                      "Đăng ký hoàn toàn miễn phí",
                      "Không yêu cầu đóng phí hay thế chấp",
                      "Chỉ cần 2 phút để điền form",
                      "Hỗ trợ toàn quốc, ưu tiên khu vực có dự án lớn",
                    ]
                  : [
                      "Completely free registration",
                      "No deposit or collateral required",
                      "Only takes 2 minutes to fill",
                      "Nationwide support, priority for major project areas",
                    ]
                ).map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <BadgeCheck className="h-5 w-5 shrink-0 text-orange-400" />
                    <p className="text-sm font-semibold text-slate-300">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <DriverSignupForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
