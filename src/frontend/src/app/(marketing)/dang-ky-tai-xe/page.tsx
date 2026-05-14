import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Clock3,
  FileCheck2,
  MapPinned,
  Route,
  ShieldCheck,
  Smartphone,
  TicketCheck,
  Truck,
} from "lucide-react";
import { DriverSignupForm } from "@/components/marketing/DriverSignupForm";

export const metadata: Metadata = {
  title: "Đăng ký tài xế",
  description:
    "Tài xế xe ben đăng ký tham gia BenHub để nhận chuyến phù hợp, dùng E-Ticket, theo dõi thu nhập và đối soát minh bạch.",
  openGraph: {
    title: "Đăng ký tài xế BenHub",
    description:
      "Nhận chuyến xe công trình phù hợp, thu nhập rõ ràng và E-Ticket không thất lạc.",
    url: "https://benhub.vn/dang-ky-tai-xe",
    siteName: "BenHub",
    locale: "vi_VN",
    type: "website",
  },
};

const benefits = [
  {
    icon: Route,
    title: "Nhận chuyến phù hợp khu vực",
    description:
      "BenHub ghi nhận khu vực hoạt động, biển số và lịch sẵn sàng để kết nối chuyến phù hợp hơn.",
  },
  {
    icon: TicketCheck,
    title: "E-Ticket không thất lạc",
    description:
      "Phiếu chuyến được số hóa, có thời gian và dữ liệu hành trình để giảm tranh cãi cuối kỳ.",
  },
  {
    icon: Banknote,
    title: "Thu nhập rõ từng chuyến",
    description:
      "Mỗi chuyến xe được ghi nhận minh bạch, giúp tài xế và đội xe theo dõi dễ hơn.",
  },
];

const steps = [
  "Điền thông tin tài xế và biển số xe",
  "BenHub xác nhận khu vực, loại xe và lịch chạy",
  "Kết nối chuyến phù hợp khi có nhu cầu dự án",
  "Theo dõi chuyến bằng GPS và E-Ticket",
];

const proofPoints = [
  "Không thu phí đăng ký qua form",
  "Chỉ dùng dữ liệu để liên hệ vận hành",
  "Phù hợp tài xế xe ben / xe công trình",
  "Có thể trao đổi lịch chạy linh hoạt",
];

export default function DriverSignupPage() {
  return (
    <div className="bg-slate-50 text-slate-950">
      <section
        id="top"
        className="relative overflow-hidden bg-[#050B18] pt-28 pb-16 md:pt-32 md:pb-20"
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-24"
            style={{ backgroundImage: "url('/bg_login.png')" }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-slate-950/35 via-[#050B18]/88 to-[#050B18]" />
          <div className="absolute -left-24 top-24 h-96 w-96 rounded-full bg-orange-500/20 blur-[90px]" />
          <div className="absolute right-0 bottom-0 h-[460px] w-[460px] rounded-full bg-blue-500/10 blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.95) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.95) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div className="lg:pt-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
              <Truck className="h-4 w-4" />
              Tài xế BenHub
            </div>

            <h1
              className="max-w-3xl font-black leading-[0.95] tracking-tight text-white"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
                fontSize: "clamp(3rem, 8vw, 6.5rem)",
              }}
            >
              Đăng ký nhận chuyến xe công trình minh bạch.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
              BenHub giúp tài xế xe ben kết nối với nhu cầu vận tải công trình,
              ghi nhận chuyến bằng E-Ticket và giảm tranh cãi đối soát cuối kỳ.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#driver-form"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-orange-950/30 transition hover:-translate-y-0.5 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300/40"
              >
                Điền thông tin tài xế
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/#ecosystem"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/8 px-6 py-3.5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/12 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/20"
              >
                Xem hệ sinh thái
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {proofPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm font-semibold text-slate-200"
                >
                  <BadgeCheck className="h-4 w-4 text-orange-300" />
                  {point}
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 text-white">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                    Lợi ích
                  </p>
                  <p className="font-bold text-white">
                    Chuyến rõ, phiếu rõ, thu nhập rõ
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                Khi có chuyến phù hợp, đội ngũ BenHub sẽ liên hệ để xác nhận
                thông tin vận hành. Tài xế không cần tạo tài khoản ngay tại bước
                đăng ký này.
              </p>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <DriverSignupForm />
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-8">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-orange-500 shadow-sm">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="font-black text-slate-950">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] bg-slate-950">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
              <div className="relative min-h-72 p-8 md:p-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(249,115,22,0.28),transparent_34%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.18),transparent_30%)]" />
                <div className="relative">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
                    Quy trình đăng ký
                  </p>
                  <h2
                    className="mt-4 font-black leading-tight text-white"
                    style={{
                      fontFamily: "var(--font-barlow), system-ui, sans-serif",
                      fontSize: "clamp(2rem, 5vw, 4rem)",
                    }}
                  >
                    Từ thông tin ban đầu đến chuyến xe phù hợp.
                  </h2>
                </div>
              </div>

              <div className="border-t border-white/10 p-8 md:p-10 lg:border-l lg:border-t-0">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
                  <Clock3 className="h-4 w-4 text-orange-300" />
                  Không thu phí đăng ký qua form
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {steps.map((step, index) => (
                    <div
                      key={step}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-sm font-black text-white">
                        {index + 1}
                      </div>
                      <p className="text-sm leading-relaxed text-slate-300">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <FileCheck2 className="mb-4 h-5 w-5 text-orange-300" />
                    <p className="text-sm font-bold text-white">
                      E-Ticket giúp giảm mất phiếu
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-slate-400">
                      Chuyến được ghi nhận số hóa để đối soát thuận tiện hơn.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <ShieldCheck className="mb-4 h-5 w-5 text-orange-300" />
                    <p className="text-sm font-bold text-white">
                      Thông tin được dùng đúng mục đích
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-slate-400">
                      BenHub chỉ liên hệ để xác nhận nhu cầu chạy xe và khu vực.
                    </p>
                  </div>
                </div>

                <a
                  href="#driver-form"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300/40"
                >
                  Điền form đăng ký
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6">
            <MapPinned className="mb-4 h-6 w-6 text-orange-500" />
            <h3 className="font-black text-slate-950">
              Ưu tiên tài xế có khu vực hoạt động rõ ràng
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Càng rõ khu vực thường chạy, biển số và thời gian sẵn sàng, BenHub
              càng dễ kết nối bạn với nhu cầu vận tải phù hợp.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
