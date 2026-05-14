import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, BadgeCheck, CalendarDays, Clock3, Home } from 'lucide-react'
import {
  getCategoryById,
  getNewsPostBySlug,
  getRelatedNewsPosts,
  newsPosts,
  type NewsPost,
} from '@/lib/news'
import { ReadingProgress } from '@/components/news/ReadingProgress'
import { ShareButtons } from '@/components/news/ShareButtons'
import { ArticleSidebar, type Heading } from '@/components/news/ArticleSidebar'
import { MobileTOC } from '@/components/news/MobileTOC'

type PageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return newsPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getNewsPostBySlug(slug)
  if (!post) return { title: 'Không tìm thấy bài viết' }
  return {
    title: `${post.title} | BenHub`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://benhub.vn/tin-tuc/${post.slug}`,
      siteName: 'BenHub',
      locale: 'vi_VN',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
    },
  }
}

/* ─── Hero image placeholder ─── */
function HeroImage({ post }: { post: NewsPost }) {
  const cat = getCategoryById(post.categoryId)
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        background: cat.gradient,
        aspectRatio: '21 / 9',
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.9) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.9) 1px,transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-black text-white/10 select-none"
          style={{
            fontFamily: 'var(--font-barlow), system-ui, sans-serif',
            fontSize: 'clamp(8rem, 20vw, 18rem)',
          }}
        >
          {post.heroIndex}
        </span>
      </div>
    </div>
  )
}

/* ─── Category badge ─── */
function CategoryBadge({ categoryId }: { categoryId: string }) {
  const cat = getCategoryById(categoryId as Parameters<typeof getCategoryById>[0])
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold text-white"
      style={{ backgroundColor: cat.color }}
    >
      {cat.label}
    </span>
  )
}

/* ─── Related article card ─── */
function RelatedCard({ post }: { post: NewsPost }) {
  const cat = getCategoryById(post.categoryId)
  return (
    <Link
      href={`/tin-tuc/${post.slug}`}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100/60"
    >
      <div
        className="aspect-[16/9] w-full"
        style={{ background: cat.gradient }}
      >
        <div className="flex h-full items-end justify-end p-4">
          <span
            className="font-black leading-none text-white/20 select-none"
            style={{
              fontFamily: 'var(--font-barlow), system-ui, sans-serif',
              fontSize: '4rem',
            }}
          >
            {post.heroIndex}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <CategoryBadge categoryId={post.categoryId} />
        <h3 className="mt-3 text-base font-bold leading-snug text-slate-950 transition group-hover:text-orange-600">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-orange-600">
          Đọc tiếp
          <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  )
}

/* ─── CTA Banner ─── */
function CTABanner() {
  return (
    <div className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 p-8 shadow-xl shadow-orange-200 md:p-10">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <h2
          className="font-black leading-tight text-white"
          style={{
            fontFamily: 'var(--font-barlow), system-ui, sans-serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          }}
        >
          Sẵn sàng tham gia hệ sinh thái BenHub?
        </h2>
        <p className="text-base text-orange-100">
          Hơn 5,000 xe và đội tài xế đã tin tưởng. Bắt đầu ngay hôm nay.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="/#register"
            className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-orange-600 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Đăng ký ngay
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="mailto:contact@benhub.vn?subject=Yêu cầu demo BenHub"
            className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border-2 border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
          >
            Xem demo
          </a>
        </div>
      </div>
    </div>
  )
}

/* ─── JSON-LD structured data ─── */
function ArticleJsonLd({ post, url }: { post: NewsPost; url: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Person', name: post.author.name },
    publisher: {
      '@type': 'Organization',
      name: 'BenHub Việt Nam',
      logo: { '@type': 'ImageObject', url: 'https://benhub.vn/logo.png' },
    },
    description: post.excerpt,
    url,
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/* ─── Breadcrumb JSON-LD ─── */
function BreadcrumbJsonLd({ post }: { post: NewsPost }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: 'https://benhub.vn' },
      { '@type': 'ListItem', position: 2, name: 'Tin tức', item: 'https://benhub.vn/tin-tuc' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://benhub.vn/tin-tuc/${post.slug}` },
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params
  const post = getNewsPostBySlug(slug)
  if (!post) notFound()

  const relatedPosts = getRelatedNewsPosts(post.slug)
  const cat = getCategoryById(post.categoryId)
  const pageUrl = `https://benhub.vn/tin-tuc/${post.slug}`

  const headings: Heading[] = post.sections.map((s, i) => ({
    id: `section-${i}`,
    text: s.heading,
    level: 2,
  }))

  const shortTitle = post.title.length > 40 ? post.title.slice(0, 40) + '…' : post.title

  return (
    <article className="bg-slate-50 text-slate-950">
      <ArticleJsonLd post={post} url={pageUrl} />
      <BreadcrumbJsonLd post={post} />
      <ReadingProgress />

      {/* ── Hero header ── */}
      <header className="relative overflow-hidden bg-[#050B18] pb-14 pt-28 md:pb-20 md:pt-32">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-18"
            style={{ backgroundImage: "url('/bg_login.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/35 via-[#050B18]/88 to-[#050B18]" />
          <div className="absolute -left-28 top-24 h-96 w-96 rounded-full bg-orange-500/20 blur-[90px]" />
          <div className="absolute bottom-0 right-0 h-[460px] w-[460px] rounded-full bg-blue-500/10 blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.95) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.95) 1px,transparent 1px)',
              backgroundSize: '72px 72px',
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8"
          >
            {/* Mobile breadcrumb */}
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-300 transition hover:text-orange-300 sm:hidden"
            >
              <ArrowLeft className="h-4 w-4" />
              Tin tức
            </Link>
            {/* Desktop breadcrumb */}
            <ol className="hidden items-center gap-2 text-sm font-semibold text-slate-400 sm:flex" role="list">
              <li>
                <Link href="/" className="flex items-center gap-1 transition hover:text-white">
                  <Home className="h-3.5 w-3.5" />
                  Trang chủ
                </Link>
              </li>
              <li aria-hidden="true" className="text-slate-600">/</li>
              <li>
                <Link href="/tin-tuc" className="transition hover:text-white">
                  Tin tức
                </Link>
              </li>
              <li aria-hidden="true" className="text-slate-600">/</li>
              <li className="truncate text-slate-300" aria-current="page">
                {shortTitle}
              </li>
            </ol>
          </nav>

          {/* Article header */}
          <div className="max-w-4xl">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <CategoryBadge categoryId={post.categoryId} />
              <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-400">
                <CalendarDays className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-400">
                <Clock3 className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>

            <h1
              className="font-black leading-[0.98] tracking-tight text-white"
              style={{
                fontFamily: 'var(--font-barlow), system-ui, sans-serif',
                fontSize: 'clamp(2.4rem, 6vw, 5.5rem)',
              }}
            >
              {post.title}
            </h1>

            <blockquote className="mt-6 border-l-[3px] border-orange-500 pl-4 text-base italic leading-relaxed text-slate-300 md:text-lg">
              {post.sapo}
            </blockquote>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/20 text-sm font-bold text-orange-300">
                  {post.author.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{post.author.name}</p>
                  <p className="text-xs text-slate-500">{post.author.title}</p>
                </div>
              </div>
              <ShareButtons url={pageUrl} title={post.title} />
            </div>
          </div>
        </div>
      </header>

      {/* ── Hero image ── */}
      <div className="w-full">
        <HeroImage post={post} />
      </div>

      {/* ── Body + Sidebar ── */}
      <div className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-10">
            {/* Main content */}
            <div className="min-w-0">
              {/* Mobile TOC */}
              <MobileTOC headings={headings} />

              {/* Takeaways card */}
              <div className="mb-8 rounded-2xl border border-orange-200 bg-orange-50 p-6">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-orange-600">
                  Điểm chính
                </p>
                <ul className="space-y-3">
                  {post.takeaways.map((item) => (
                    <li key={item} className="flex gap-3">
                      <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                      <span className="text-sm leading-relaxed text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Article sections */}
              <div className="space-y-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
                {post.sections.map((section, i) => (
                  <section key={section.heading} id={`section-${i}`} aria-labelledby={`heading-${i}`}>
                    <h2
                      id={`heading-${i}`}
                      className="mb-5 font-black leading-tight text-slate-950"
                      style={{
                        fontFamily: 'var(--font-barlow), system-ui, sans-serif',
                        fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                      }}
                    >
                      <span
                        className="mr-3 inline-flex h-9 w-9 items-center justify-center rounded-xl text-sm font-black text-white"
                        style={{ background: cat.gradient }}
                      >
                        {i + 1}
                      </span>
                      {section.heading}
                    </h2>
                    <div className="space-y-4">
                      {section.paragraphs.map((p, j) => (
                        <p
                          key={j}
                          className="max-w-prose text-base leading-[1.8] text-slate-700"
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                    {i < post.sections.length - 1 && (
                      <hr className="mt-10 border-slate-100" />
                    )}
                  </section>
                ))}
              </div>

              {/* Author bio */}
              <div className="mt-8 flex gap-5 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <div
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-lg font-black text-white"
                  style={{ background: cat.gradient }}
                >
                  {post.author.initials}
                </div>
                <div>
                  <p className="font-bold text-slate-950">{post.author.name}</p>
                  <p className="text-sm text-slate-500">{post.author.title}</p>
                  {post.author.bio && (
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {post.author.bio}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Sticky sidebar — desktop only */}
            <div className="mt-8 hidden lg:block lg:mt-0">
              <div className="sticky top-24">
                <ArticleSidebar headings={headings} relatedPosts={relatedPosts} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Related articles ── */}
      {relatedPosts.length > 0 && (
        <section className="pb-10 md:pb-14" aria-labelledby="related-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
                  Đọc tiếp
                </p>
                <h2
                  id="related-heading"
                  className="font-black leading-tight text-slate-950"
                  style={{
                    fontFamily: 'var(--font-barlow), system-ui, sans-serif',
                    fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                  }}
                >
                  Bài viết liên quan.
                </h2>
              </div>
              <Link
                href="/tin-tuc"
                className="inline-flex cursor-pointer items-center gap-2 text-sm font-bold text-orange-600 transition hover:gap-3"
              >
                Xem tất cả tin tức
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {relatedPosts.map((p) => (
                <RelatedCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <div className="pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CTABanner />
        </div>
      </div>
    </article>
  )
}
