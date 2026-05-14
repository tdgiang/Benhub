import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Clock3,
  FileText,
  Newspaper,
  PenLine,
  Quote,
} from "lucide-react";
import {
  getNewsPostBySlug,
  getRelatedNewsPosts,
  newsPosts,
} from "@/lib/news";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return newsPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsPostBySlug(slug);

  if (!post) {
    return {
      title: "Không tìm thấy bài viết",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://benhub.vn/tin-tuc/${post.slug}`,
      siteName: "BenHub",
      locale: "vi_VN",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getNewsPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedNewsPosts(post.slug);

  return (
    <article className="bg-slate-50 text-slate-950">
      <section className="relative overflow-hidden bg-[#050B18] pt-28 pb-14 md:pt-32 md:pb-20">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-18"
            style={{ backgroundImage: "url('/bg_login.png')" }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-slate-950/35 via-[#050B18]/88 to-[#050B18]" />
          <div className="absolute -left-28 top-24 h-96 w-96 rounded-full bg-orange-500/20 blur-[90px]" />
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

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/tin-tuc"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-300 transition hover:text-orange-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại Tin tức
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-300">
                  <Newspaper className="h-4 w-4" />
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400">
                  <CalendarDays className="h-4 w-4" />
                  {post.date}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400">
                  <Clock3 className="h-4 w-4" />
                  {post.readTime}
                </span>
              </div>

              <h1
                className="max-w-5xl font-black leading-[0.98] tracking-tight text-white"
                style={{
                  fontFamily: "var(--font-barlow), system-ui, sans-serif",
                  fontSize: "clamp(3rem, 7vw, 6rem)",
                }}
              >
                {post.title}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-300 md:text-lg">
                {post.dek}
              </p>
            </div>

            <aside className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-black/20 backdrop-blur">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                    BenHub Journal
                  </p>
                  <p className="mt-2 text-sm font-bold text-white">
                    Bản ghi chiến lược vận hành
                  </p>
                </div>
                <p
                  className="font-black leading-none text-white/10"
                  style={{
                    fontFamily: "var(--font-barlow), system-ui, sans-serif",
                    fontSize: "4rem",
                  }}
                >
                  {post.heroIndex}
                </p>
              </div>

              <div className="space-y-4 border-t border-white/10 pt-5">
                <div className="flex items-center gap-3">
                  <PenLine className="h-4 w-4 text-orange-300" />
                  <div>
                    <p className="text-xs text-slate-500">Tác giả</p>
                    <p className="text-sm font-semibold text-slate-200">
                      {post.author}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-orange-300" />
                  <div>
                    <p className="text-xs text-slate-500">Chuyên mục</p>
                    <p className="text-sm font-semibold text-slate-200">
                      {post.category}
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[320px_1fr] lg:px-8">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
                Điểm chính
              </p>
              <div className="space-y-4">
                {post.takeaways.map((takeaway) => (
                  <div key={takeaway} className="flex gap-3">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                    <p className="text-sm leading-relaxed text-slate-700">
                      {takeaway}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-8 rounded-[2rem] border border-orange-200 bg-orange-50 p-6 md:p-8">
              <Quote className="mb-4 h-8 w-8 text-orange-500" />
              <p
                className="font-black italic leading-tight text-slate-950"
                style={{
                  fontFamily: "var(--font-barlow), system-ui, sans-serif",
                  fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
                }}
              >
                {post.excerpt}
              </p>
            </div>

            <div className="space-y-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
              {post.sections.map((section, index) => (
                <section key={section.heading}>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-white">
                      {index + 1}
                    </span>
                    <h2
                      className="font-black leading-tight text-slate-950"
                      style={{
                        fontFamily: "var(--font-barlow), system-ui, sans-serif",
                        fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                      }}
                    >
                      {section.heading}
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-base leading-8 text-slate-700"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
                Đọc tiếp
              </p>
              <h2
                className="font-black leading-tight text-slate-950"
                style={{
                  fontFamily: "var(--font-barlow), system-ui, sans-serif",
                  fontSize: "clamp(2rem, 5vw, 3.6rem)",
                }}
              >
                Bài viết liên quan.
              </h2>
            </div>
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 transition hover:gap-3"
            >
              Xem tất cả tin tức
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/tin-tuc/${relatedPost.slug}`}
                className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100/60"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                    {relatedPost.category}
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-orange-500" />
                </div>
                <h3 className="text-lg font-black leading-snug text-slate-950 transition group-hover:text-orange-600">
                  {relatedPost.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
                  {relatedPost.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
