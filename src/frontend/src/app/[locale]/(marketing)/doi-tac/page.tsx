import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronDown,
  Factory,
  Handshake,
  Landmark,
  Mail,
  Phone,
  ShieldCheck,
  Truck,
  Zap,
} from "lucide-react";
import { PartnerSignupForm } from "@/components/marketing/PartnerSignupForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isVi = locale !== "en";
  return {
    title: isVi
      ? "Hợp Tác Đối Tác | BenHub — Logistics Công Trình"
      : "Partner With Us | BenHub — Construction Logistics",
    description: isVi
      ? "Tham gia hệ sinh thái BenHub với tư cách chủ đầu tư, đội xe, mỏ vật liệu, tổ chức tài chính hoặc nhà đầu tư."
      : "Join BenHub's ecosystem as an investor, fleet owner, material supplier, financial institution or strategic investor.",
  };
}

const segments = [
  { icon: Truck, titleVi: "Chủ Đội Xe", titleEn: "Fleet Owners", descVi: "Tham gia mạng lưới — đội xe luôn có việc, doanh thu minh bạch, quản lý từ một app duy nhất.", descEn: "Join the network — your fleet always has work, revenue is transparent, managed from one app." },
  { icon: Building2, titleVi: "Chủ Đầu Tư / Tổng Thầu", titleEn: "Investors / Contractors", descVi: "Dashboard 24/7, phát hiện gian lận tức thì, đối soát tự động — không mất tài sản.", descEn: "24/7 dashboard, instant fraud detection, auto reconciliation — no asset loss." },
  { icon: Factory, titleVi: "Mỏ Vật Liệu / Nhà Cung Ứng", titleEn: "Material Suppliers", descVi: "Kết nối trực tiếp với hàng trăm dự án xây dựng, báo giá realtime và đặt hàng dễ dàng.", descEn: "Connect directly with hundreds of construction projects, realtime pricing and easy ordering." },
  { icon: Landmark, titleVi: "Tổ Chức Tài Chính", titleEn: "Financial Institutions", descVi: "Hợp tác cung cấp dịch vụ factoring, bảo hiểm và tài chính chuỗi cung ứng cho hệ sinh thái.", descEn: "Partner to provide factoring, insurance and supply chain finance services for the ecosystem." },
  { icon: Handshake, titleVi: "Nhà Đầu Tư Chiến Lược", titleEn: "Strategic Investors", descVi: "Đầu tư vào Construction Logistics OS đầu tiên của Việt Nam trong thị trường 60–80 tỷ USD.", descEn: "Invest in Vietnam's first Construction Logistics OS in a USD 60–80B market." },
  { icon: Zap, titleVi: "Đối Tác Công Nghệ", titleEn: "Tech Partners", descVi: "Tích hợp giải pháp IoT, AI, dữ liệu vận tải vào hệ sinh thái BenHub mở rộng.", descEn: "Integrate IoT, AI, and transport data solutions into the expanding BenHub ecosystem." },
];

const advantages = [
  { icon: ShieldCheck, titleVi: "Dữ liệu GPS thực tế", titleEn: "Real GPS data", descVi: "Toàn bộ chuyến xe đều có GPS proof, watermark thời gian và tọa độ xác thực.", descEn: "All trips have GPS proof, time watermarks and verified coordinates." },
  { icon: CheckCircle2, titleVi: "Đối soát tự động 100%", titleEn: "100% auto reconciliation", descVi: "Không còn đối soát thủ công. Hệ thống tự tổng hợp khối lượng và cập nhật công nợ realtime.", descEn: "No more manual reconciliation. System auto-aggregates volume and updates payables realtime." },
  { icon: BadgeCheck, titleVi: "Mô hình scalable toàn quốc", titleEn: "Nationally scalable model", descVi: "Asset-light platform — mở rộng nhanh ra 63 tỉnh thành mà không cần hạ tầng vật lý lớn.", descEn: "Asset-light platform — rapidly expand to 63 provinces without large physical infrastructure." },
];

export default async function PartnerPage({
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
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/bg_login.png')" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-[#050B18]/80 to-[#050B18]" />
          <div className="absolute -left-32 -top-20 h-[600px] w-[600px] rounded-full opacity-25" style={{ background: "radial-gradient(ellipse, #F97316 0%, transparent 70%)", filter: "blur(90px)" }} />
          <div className="absolute -right-20 bottom-0 h-[500px] w-[500px] rounded-full opacity-15" style={{ background: "radial-gradient(ellipse, #3B82F6 0%, transparent 70%)", filter: "blur(100px)" }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
              <Handshake className="h-4 w-4" />
              {isVi ? "Chương trình đối tác BenHub" : "BenHub Partner Program"}
            </div>

            <h1 className="font-black leading-[0.92] tracking-tight text-white" style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif", fontSize: "clamp(3rem, 7vw, 6rem)" }}>
              {isVi ? "Cùng BenHub xây dựng logistics công trình" : "Build the Future of Construction Logistics"}
              <br />
              <span className="text-orange-400">{isVi ? "thông minh hơn." : "Together with BenHub."}</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
              {isVi
                ? "Chúng tôi đang tìm kiếm đối tác ở mọi mắt xích của chuỗi — từ chủ đầu tư, đội xe, mỏ vật liệu đến tổ chức tài chính và công nghệ."
                : "We're looking for partners across the entire chain — from investors, fleet owners, material suppliers to financial institutions and tech companies."}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-400">
              {[
                isVi ? "Phản hồi trong 1 ngày làm việc" : "Response within 1 business day",
                isVi ? "Không yêu cầu độc quyền" : "No exclusivity required",
                isVi ? "Hỗ trợ onboarding toàn trình" : "Full onboarding support",
              ].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <BadgeCheck className="h-4 w-4 text-orange-400" />
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#hop-tac" className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-orange-500 px-6 py-3.5 text-sm font-black text-white shadow-xl shadow-orange-950/30 transition hover:-translate-y-0.5 hover:bg-orange-600">
                {isVi ? "Đăng ký hợp tác ngay" : "Register to partner"}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#hinh-thuc" className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-white/15 px-6 py-3.5 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/8">
                {isVi ? "Xem các hình thức" : "View partnership types"}
                <ChevronDown className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership segments */}
      <section id="hinh-thuc" className="bg-slate-50 py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
              {isVi ? "Hình thức hợp tác" : "Partnership types"}
            </p>
            <h2 className="font-black leading-tight text-slate-950" style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif", fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
              {isVi ? "Bạn muốn hợp tác theo cách nào?" : "How would you like to partner?"}
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {segments.map(({ icon: Icon, titleVi, titleEn, descVi, descEn }) => (
              <div key={titleVi} className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100/60">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-100 bg-orange-50 transition group-hover:border-orange-200 group-hover:bg-orange-100">
                  <Icon className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-lg font-black leading-snug text-slate-950">{isVi ? titleVi : titleEn}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{isVi ? descVi : descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform advantages */}
      <section className="py-10 md:py-14" style={{ background: "#050B18" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
              {isVi ? "Lợi thế nền tảng" : "Platform advantages"}
            </p>
            <h2 className="font-black leading-tight text-white" style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif", fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
              {isVi ? "Tại sao đối tác chọn BenHub?" : "Why do partners choose BenHub?"}
            </h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {advantages.map(({ icon: Icon, titleVi, titleEn, descVi, descEn }) => (
              <div key={titleVi} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-orange-400/20 hover:bg-white/8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/15">
                  <Icon className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-lg font-black text-white">{isVi ? titleVi : titleEn}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{isVi ? descVi : descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact info */}
      <section className="bg-slate-50 py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <a href="mailto:partner@benhub.vn" className="flex items-center gap-4 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:border-orange-200 hover:shadow-lg">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50">
                <Mail className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-950">partner@benhub.vn</p>
                <p className="mt-0.5 text-xs text-slate-500">{isVi ? "Email đội phát triển đối tác" : "Partner development email"}</p>
              </div>
            </a>
            <a href="tel:1800000000" className="flex items-center gap-4 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:border-orange-200 hover:shadow-lg">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50">
                <Phone className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-950">1800 xxx xxx</p>
                <p className="mt-0.5 text-xs text-slate-500">{isVi ? "Hotline miễn phí, T2–T6 8:00–17:30" : "Free hotline, Mon–Fri 8:00–17:30"}</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="hop-tac" className="py-10 md:py-14" style={{ background: "#050B18" }}>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_560px]">
            <div className="flex flex-col justify-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
                {isVi ? "Bắt đầu hợp tác" : "Start partnering"}
              </p>
              <h2 className="font-black leading-[0.95] tracking-tight text-white" style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif", fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}>
                {isVi ? "Một bước để gia nhập hệ sinh thái BenHub." : "One step to join the BenHub ecosystem."}
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-slate-300">
                {isVi
                  ? "Điền form và đội phát triển đối tác BenHub sẽ liên hệ trong vòng 1 ngày làm việc. Trao đổi mở, không ràng buộc, không mất phí."
                  : "Fill in the form and BenHub's partner development team will contact within 1 business day. Open discussion, no commitment."}
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { numVi: "01", numEn: "01", textVi: "Điền form — chỉ mất 2 phút", textEn: "Fill form — 2 minutes" },
                  { numVi: "02", numEn: "02", textVi: "BenHub liên hệ xác nhận nhu cầu", textEn: "BenHub contacts to confirm needs" },
                  { numVi: "03", numEn: "03", textVi: "Demo hoặc pilot theo thỏa thuận", textEn: "Demo or pilot as agreed" },
                ].map(({ numVi, textVi, textEn }) => (
                  <div key={numVi} className="flex items-center gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-sm font-black text-orange-300" style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}>{numVi}</span>
                    <p className="text-sm font-semibold text-slate-300">{isVi ? textVi : textEn}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <PartnerSignupForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
