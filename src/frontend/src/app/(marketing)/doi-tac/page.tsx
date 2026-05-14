import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Building2,
  Clock3,
  Factory,
  FileCheck2,
  Handshake,
  MapPinned,
  Network,
  ShieldCheck,
  TrendingUp,
  Truck,
  UsersRound,
} from "lucide-react";
import { PartnerSignupForm } from "@/components/marketing/PartnerSignupForm";

export const metadata: Metadata = {
  title: "Đối tác",
  description:
    "Đăng ký hợp tác cùng BenHub để triển khai logistics xây dựng số cho chủ đầu tư, tổng thầu, đội xe, mỏ vật liệu, tài chính và nhà đầu tư chiến lược.",
  openGraph: {
    title: "Đăng ký đối tác BenHub",
    description:
      "Cùng BenHub xây hạ tầng số cho vận tải công trình Việt Nam.",
    url: "https://benhub.vn/doi-tac",
    siteName: "BenHub",
    locale: "vi_VN",
    type: "website",
  },
};

const partnerGroups = [
  {
    icon: Building2,
    title: "Chủ đầu tư / Tổng thầu",
    description:
      "Chuẩn hóa điều phối xe, E-Ticket, GPS tracking và đối soát theo dự án.",
  },
  {
    icon: Factory,
    title: "Mỏ vật liệu / Nhà cung ứng",
    description:
      "Kết nối nguồn vật liệu với nhu cầu công trường, giảm chờ xe và lệch khối lượng.",
  },
  {
    icon: Truck,
    title: "Đội xe địa phương",
    description:
      "Tham gia mạng lưới vận tải số, nhận việc đều hơn và quản lý doanh thu minh bạch.",
  },
  {
    icon: Banknote,
    title: "Tài chính / Nhà đầu tư",
    description:
      "Cùng phát triển các lớp finance, data, marketplace và carbon ESG trên dữ liệu vận hành.",
  },
];

const processSteps = [
  "Tiếp nhận thông tin và phân loại mô hình hợp tác",
  "Trao đổi nhu cầu, khu vực triển khai và dữ liệu hiện có",
  "Đề xuất pilot với KPI vận hành rõ ràng",
  "Mở rộng thành cụm vận tải số nếu pilot đạt mục tiêu",
];

const proofPoints = [
  "E-Ticket thay phiếu giấy",
  "GPS tracking theo chuyến",
  "Dashboard đối soát realtime",
  "Mô hình platform-first",
];

const heroMetrics = [
  {
    value: "30-60",
    label: "ngày để chạy pilot có KPI",
  },
  {
    value: "4",
    label: "nhóm đối tác ưu tiên",
  },
  {
    value: "1 ngày",
    label: "phản hồi bước tiếp theo",
  },
];

const trustBadges = [
  {
    icon: FileCheck2,
    title: "Dữ liệu chuyến xe xác thực",
    description: "E-Ticket, GPS và trạng thái nghiệm thu nằm trong một luồng.",
  },
  {
    icon: UsersRound,
    title: "Thiết kế cho nhiều bên",
    description: "Chủ đầu tư, tổng thầu, đội xe, mỏ vật liệu và tài chính cùng nhìn một dữ liệu.",
  },
  {
    icon: TrendingUp,
    title: "Mở rộng theo cụm vận hành",
    description: "Từ một dự án pilot đến mạng lưới logistics công trình theo khu vực.",
  },
];

export default function PartnerPage() {
  return (
    <div className="bg-slate-50 text-slate-950">
      <section
        id="top"
        className="relative overflow-hidden bg-[#050B18] pt-28 pb-16 md:pt-32 md:pb-20"
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
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
              <Handshake className="h-4 w-4" />
              BenHub partnership
            </div>

            <h1
              className="max-w-3xl font-black leading-[0.95] tracking-tight text-white"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
                fontSize: "clamp(3rem, 8vw, 6.5rem)",
              }}
            >
              Trở thành đối tác vận hành cùng BenHub.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
              Nếu bạn là chủ đầu tư, tổng thầu, đội xe, mỏ vật liệu, tổ chức tài
              chính hoặc nhà đầu tư chiến lược, hãy để lại thông tin để BenHub
              cùng trao đổi cách xây một cụm logistics công trình có dữ liệu,
              minh bạch và có thể mở rộng.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#partner-form"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-orange-950/30 transition hover:-translate-y-0.5 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300/40"
              >
                Điền thông tin hợp tác
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="mailto:contact@benhub.vn?subject=Hop%20tac%20voi%20BenHub"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/8 px-6 py-3.5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/12 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/20"
              >
                Trao đổi qua email
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {heroMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-3xl border border-white/10 bg-white/6 p-4 backdrop-blur"
                >
                  <p
                    className="font-black leading-none text-white"
                    style={{
                      fontFamily: "var(--font-barlow), system-ui, sans-serif",
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                    }}
                  >
                    {metric.value}
                  </p>
                  <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-400">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
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
                  <Network className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                    Mục tiêu
                  </p>
                  <p className="font-bold text-white">
                    Tạo mạng lưới vận tải công trình số
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                BenHub ưu tiên các hợp tác có khả năng đo được kết quả sau
                30-60 ngày: giảm thời gian đối soát, tăng tỷ lệ chuyến đúng dữ
                liệu, giảm tranh cãi phiếu và cải thiện năng suất đội xe.
              </p>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <PartnerSignupForm />
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-8">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {trustBadges.map(({ icon: Icon, title, description }) => (
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
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
                Hợp tác dành cho ai
              </p>
              <h2
                className="font-black leading-tight text-slate-950"
                style={{
                  fontFamily: "var(--font-barlow), system-ui, sans-serif",
                  fontSize: "clamp(2.2rem, 5vw, 4rem)",
                }}
              >
                Bốn nhóm đối tác BenHub đang ưu tiên.
              </h2>
            </div>
            <a
              href="#partner-form"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-100"
            >
              Đăng ký ngay
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {partnerGroups.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100/60"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-500 transition group-hover:border-orange-100 group-hover:bg-orange-50 group-hover:text-orange-600">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-black text-slate-950">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] bg-slate-950">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
              <div className="relative min-h-72 p-8 md:p-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(249,115,22,0.28),transparent_34%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.18),transparent_30%)]" />
                <div className="relative">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
                    Quy trình sau đăng ký
                  </p>
                  <h2
                    className="mt-4 font-black leading-tight text-white"
                    style={{
                      fontFamily: "var(--font-barlow), system-ui, sans-serif",
                      fontSize: "clamp(2rem, 5vw, 4rem)",
                    }}
                  >
                    Từ thông tin ban đầu đến pilot có KPI.
                  </h2>
                </div>
              </div>

              <div className="border-t border-white/10 p-8 md:p-10 lg:border-l lg:border-t-0">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
                  <Clock3 className="h-4 w-4 text-orange-300" />
                  Quy trình minh bạch
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {processSteps.map((step, index) => (
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

                <div className="mt-6 flex flex-col gap-4 rounded-3xl border border-orange-400/20 bg-orange-500/10 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-bold text-orange-200">
                      Sẵn sàng trao đổi?
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Gửi form phía trên, BenHub sẽ phản hồi theo thông tin bạn
                      cung cấp.
                    </p>
                  </div>
                  <a
                    href="#partner-form"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300/40"
                  >
                    Điền form
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6">
              <MapPinned className="mb-4 h-6 w-6 text-orange-500" />
              <h3 className="font-black text-slate-950">
                Ưu tiên cụm vận hành có dữ liệu thực
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                BenHub phù hợp nhất với dự án, đội xe hoặc nguồn vật liệu có
                nhu cầu vận chuyển lặp lại và cần minh bạch đối soát.
              </p>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6">
              <ShieldCheck className="mb-4 h-6 w-6 text-orange-500" />
              <h3 className="font-black text-slate-950">
                Dữ liệu liên hệ chỉ dùng cho trao đổi hợp tác
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Form chỉ thu thập thông tin cần thiết để đội ngũ BenHub liên hệ
                lại, không yêu cầu mật khẩu, tài khoản hay tài liệu nhạy cảm.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
