import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Clock3,
  FileText,
  Newspaper,
  Radio,
  Route,
  ShieldCheck,
  Truck,
} from "lucide-react";
import {
  featuredNewsPost,
  marketSignals,
  newsPosts,
  topics,
  type NewsIconName,
} from "@/lib/news";

export const metadata: Metadata = {
  title: "Tin tức",
  description:
    "Cập nhật tin tức BenHub, góc nhìn thị trường vận tải công trình, logistics xây dựng, E-Ticket, GPS tracking và chuyển đổi số ngành xây dựng.",
  openGraph: {
    title: "Tin tức BenHub",
    description:
      "Góc nhìn vận tải công trình, dữ liệu thị trường và cập nhật sản phẩm từ BenHub.",
    url: "https://benhub.vn/tin-tuc",
    siteName: "BenHub",
    locale: "vi_VN",
    type: "website",
  },
};

const iconMap: Record<NewsIconName, typeof BarChart3> = {
  market: BarChart3,
  ticket: FileText,
  route: Route,
  fleet: Truck,
  trust: ShieldCheck,
  broadcast: Radio,
};

export default function NewsPage() {
  return (
    <div className="bg-slate-50 text-slate-950">
      <section className="relative overflow-hidden bg-[#050B18] pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url('/bg_login.png')" }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-slate-950/40 via-[#050B18]/85 to-[#050B18]" />
          <div className="absolute -left-24 top-24 h-96 w-96 rounded-full bg-orange-500/20 blur-[90px]" />
          <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-[110px]" />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.95) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.95) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
              <Newspaper className="h-4 w-4" />
              Tin tức BenHub
            </div>
            <h1
              className="font-black leading-[0.95] tracking-tight text-white"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
                fontSize: "clamp(3rem, 8vw, 6.5rem)",
              }}
            >
              Dữ liệu, thị trường và vận tải công trình.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
              Cập nhật góc nhìn từ BenHub về chuyển đổi số logistics xây dựng,
              vận hành đội xe, E-Ticket, GPS tracking và những cơ hội đang mở ra
              trong hạ tầng Việt Nam.
            </p>
          </div>

          <article className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 shadow-2xl shadow-black/30 backdrop-blur md:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-72 bg-slate-900 p-6 md:min-h-full md:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.32),transparent_36%),radial-gradient(circle_at_80%_75%,rgba(59,130,246,0.22),transparent_32%)]" />
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white">
                    Nổi bật
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    BenHub Journal
                  </span>
                </div>
                <div className="mt-20">
                  <p
                    className="font-black leading-none text-white/10"
                    style={{
                      fontFamily: "var(--font-barlow), system-ui, sans-serif",
                      fontSize: "clamp(5rem, 14vw, 10rem)",
                    }}
                  >
                    01
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 lg:p-10">
              <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-400">
                <span className="rounded-full bg-orange-500/10 px-3 py-1 text-orange-300">
                  {featuredNewsPost.category}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {featuredNewsPost.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-3.5 w-3.5" />
                  {featuredNewsPost.readTime}
                </span>
              </div>

              <h2
                className="font-black leading-tight text-white"
                style={{
                  fontFamily: "var(--font-barlow), system-ui, sans-serif",
                  fontSize: "clamp(2rem, 4vw, 3.3rem)",
                }}
              >
                {featuredNewsPost.title}
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-slate-300 md:text-base">
                {featuredNewsPost.excerpt}
              </p>
              <Link
                href={`/tin-tuc/${featuredNewsPost.slug}`}
                className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-950/30 transition hover:-translate-y-0.5 hover:bg-orange-600"
              >
                Đọc bài viết
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
                Bản tin chuyên đề
              </p>
              <h2
                className="font-black leading-tight text-slate-950"
                style={{
                  fontFamily: "var(--font-barlow), system-ui, sans-serif",
                  fontSize: "clamp(2.2rem, 5vw, 4rem)",
                }}
              >
                Những tín hiệu đáng chú ý.
              </h2>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:justify-end">
              {topics.map((topic) => (
                <button
                  key={topic.label}
                  type="button"
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition ${
                    topic.active
                      ? "border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-100"
                      : "border-slate-200 bg-white text-slate-600 hover:border-orange-200 hover:text-orange-600"
                  }`}
                >
                  {topic.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {newsPosts.slice(1).map(({ slug, icon, category, title, excerpt, date, readTime }) => {
              const Icon = iconMap[icon];

              return (
                <article
                  key={slug}
                  className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100/60"
                >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-500 transition group-hover:border-orange-100 group-hover:bg-orange-50 group-hover:text-orange-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                    {category}
                  </span>
                </div>

                <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5" />
                    {readTime}
                  </span>
                </div>

                <h3 className="text-xl font-black leading-snug text-slate-950 transition group-hover:text-orange-600">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {excerpt}
                </p>
                <Link
                  href={`/tin-tuc/${slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-orange-600 transition group-hover:gap-3"
                >
                  Đọc thêm
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] bg-slate-950">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-72 p-8 md:p-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.28),transparent_34%),radial-gradient(circle_at_80%_80%,rgba(251,191,36,0.18),transparent_30%)]" />
                <div className="relative">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
                    Market radar
                  </p>
                  <h2
                    className="mt-4 font-black leading-tight text-white"
                    style={{
                      fontFamily: "var(--font-barlow), system-ui, sans-serif",
                      fontSize: "clamp(2rem, 5vw, 4rem)",
                    }}
                  >
                    Theo dõi những động lực đang kéo ngành đi lên.
                  </h2>
                </div>
              </div>

              <div className="border-t border-white/10 p-8 md:p-10 lg:border-l lg:border-t-0">
                <div className="grid gap-3 sm:grid-cols-2">
                  {marketSignals.map((signal) => (
                    <div
                      key={signal}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <p className="text-sm font-bold text-white">{signal}</p>
                      <p className="mt-2 text-xs leading-relaxed text-slate-400">
                        Dữ liệu dự án, tuyến vận chuyển và nhu cầu vật liệu sẽ
                        tiếp tục là nền tảng cho điều phối thông minh.
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-3xl border border-orange-400/20 bg-orange-500/10 p-5">
                  <p className="text-sm font-bold text-orange-200">
                    Muốn nhận bản tin BenHub?
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    Liên hệ đội ngũ để nhận cập nhật về thị trường, sản phẩm và
                    cơ hội hợp tác trong logistics xây dựng.
                  </p>
                  <a
                    href="mailto:contact@benhub.vn?subject=Dang%20ky%20ban%20tin%20BenHub"
                    className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-orange-600"
                  >
                    Đăng ký nhận tin
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
