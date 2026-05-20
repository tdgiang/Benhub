import { cache } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, Home } from 'lucide-react'
import { ReadingProgress } from '@/components/news/ReadingProgress'
import { ShareButtons } from '@/components/news/ShareButtons'
import { ArticleSidebar, type Heading, type RelatedPost } from '@/components/news/ArticleSidebar'
import { MobileTOC } from '@/components/news/MobileTOC'
import { getServerBackendBaseUrl } from '@/lib/server-backend-url'

const BACKEND = getServerBackendBaseUrl()

const GRADIENTS = [
  'linear-gradient(135deg, #c2410c 0%, #f97316 50%, #fb923c 100%)',
  'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #2563eb 100%)',
  'linear-gradient(135deg, #052e16 0%, #0f6e56 50%, #14b8a6 100%)',
  'linear-gradient(135deg, #1e293b 0%, #475569 50%, #64748b 100%)',
  'linear-gradient(135deg, #78350f 0%, #b45309 50%, #f59e0b 100%)',
]

interface ApiPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  coverImage: string | null
  status: string
  createdAt: string
  updatedAt: string
}

const fetchPostBySlug = cache(async (slug: string): Promise<ApiPost | null> => {
  try {
    const res = await fetch(`${BACKEND}/api/v1/posts/slug/${slug}`, {
      cache: 'no-store',
    })
    if (!res.ok) return null
    const body = await res.json()
    return body?.data ?? null
  } catch {
    return null
  }
})

const fetchRelatedPosts = cache(async (excludeSlug: string): Promise<ApiPost[]> => {
  try {
    const res = await fetch(
      `${BACKEND}/api/v1/posts?status=PUBLISHED&limit=4&sortBy=createdAt&sortOrder=desc`,
      { cache: 'no-store' },
    )
    if (!res.ok) return []
    const body = await res.json()
    const items: ApiPost[] = body?.data?.items ?? []
    return items.filter((p) => p.slug !== excludeSlug).slice(0, 3)
  } catch {
    return []
  }
})

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

function estimateReadTime(content: string) {
  const words = content
    .replace(/<[^>]+>/g, '')
    .split(/\s+/)
    .filter(Boolean).length
  return `${Math.max(1, Math.round(words / 200))} phút đọc`
}

function getGradient(index: number) {
  return GRADIENTS[index % GRADIENTS.length]
}

function processContent(html: string): { processedHtml: string; headings: Heading[] } {
  const headings: Heading[] = []
  let i = 0
  const processedHtml = html.replace(
    /<(h[23])([^>]*)>([\s\S]*?)<\/\1>/gi,
    (_, tag: string, attrs: string, inner: string) => {
      const id = `heading-${i}`
      const text = inner.replace(/<[^>]+>/g, '').trim()
      headings.push({ id, text, level: tag.toLowerCase() === 'h2' ? 2 : 3 })
      i++
      return `<${tag}${attrs} id="${id}">${inner}</${tag}>`
    },
  )
  return { processedHtml, headings }
}

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await fetchPostBySlug(slug)
  if (!post) return { title: 'Không tìm thấy bài viết' }
  return {
    title: `${post.title} | BenHub`,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      url: `https://benhub.vn/tin-tuc/${post.slug}`,
      siteName: 'BenHub',
      type: 'article',
      publishedTime: post.createdAt,
    },
  }
}

function ArticleJsonLd({ post, url }: { post: ApiPost; url: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Organization', name: 'BenHub Việt Nam' },
    publisher: {
      '@type': 'Organization',
      name: 'BenHub Việt Nam',
      logo: { '@type': 'ImageObject', url: 'https://benhub.vn/logo.png' },
    },
    description: post.excerpt ?? undefined,
    url,
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

  const [post, relatedApiPosts] = await Promise.all([
    fetchPostBySlug(slug),
    fetchRelatedPosts(slug),
  ])

  if (!post) notFound()

  const { processedHtml, headings } = processContent(post.content)
  const pageUrl = `https://benhub.vn/tin-tuc/${post.slug}`
  const shortTitle = post.title.length > 40 ? post.title.slice(0, 40) + '…' : post.title

  const relatedPosts: RelatedPost[] = relatedApiPosts.map((p, i) => ({
    slug: p.slug,
    title: p.title,
    gradient: getGradient(i),
    readTime: estimateReadTime(p.content),
  }))

  return (
    <article className="bg-slate-50 text-slate-950">
      <ArticleJsonLd post={post} url={pageUrl} />
      <ReadingProgress />

      <header className="relative overflow-hidden bg-[#050B18] pb-14 pt-28 md:pb-20 md:pt-32">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-18"
            style={{ backgroundImage: "url('/bg_login.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/35 via-[#050B18]/88 to-[#050B18]" />
          <div className="absolute -left-28 top-24 h-96 w-96 rounded-full bg-orange-500/20 blur-[90px]" />
          <div className="absolute bottom-0 right-0 h-[460px] w-[460px] rounded-full bg-blue-500/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-300 transition hover:text-orange-300 sm:hidden"
            >
              <ArrowLeft className="h-4 w-4" />
              Tin tức
            </Link>
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

          <div className="max-w-4xl">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-400">
                <CalendarDays className="h-4 w-4" />
                {formatDate(post.createdAt)}
              </span>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-400">
                <Clock3 className="h-4 w-4" />
                {estimateReadTime(post.content)}
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

            {post.excerpt && (
              <blockquote className="mt-6 border-l-[3px] border-orange-500 pl-4 text-base italic leading-relaxed text-slate-300 md:text-lg">
                {post.excerpt}
              </blockquote>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/20 text-sm font-bold text-orange-300">
                  BH
                </div>
                <div>
                  <p className="text-sm font-bold text-white">BenHub</p>
                  <p className="text-xs text-slate-500">Đội ngũ BenHub Việt Nam</p>
                </div>
              </div>
              <ShareButtons url={pageUrl} title={post.title} />
            </div>
          </div>
        </div>
      </header>

      {post.coverImage ? (
        <div className="w-full" style={{ aspectRatio: '21 / 9' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div
          className="relative w-full overflow-hidden"
          style={{ background: getGradient(0), aspectRatio: '21 / 9' }}
        >
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.9) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.9) 1px,transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>
      )}

      <div className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-10">
            <div className="min-w-0">
              <MobileTOC headings={headings} />
              <div className="space-y-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
                <div
                  className="article-content text-base leading-relaxed text-slate-700"
                  dangerouslySetInnerHTML={{ __html: processedHtml }}
                />
              </div>
              <div className="mt-8 flex gap-5 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <div
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-lg font-black text-white"
                  style={{ background: getGradient(0) }}
                >
                  BH
                </div>
                <div>
                  <p className="font-bold text-slate-950">BenHub</p>
                  <p className="text-sm text-slate-500">Đội ngũ BenHub Việt Nam</p>
                </div>
              </div>
            </div>

            <div className="mt-8 hidden lg:block lg:mt-0">
              <div className="sticky top-24">
                <ArticleSidebar headings={headings} relatedPosts={relatedPosts} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {relatedApiPosts.length > 0 && (
        <section className="pb-10 md:pb-14" aria-labelledby="related-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
                  Xem thêm
                </p>
                <h2
                  id="related-heading"
                  className="font-black leading-tight text-slate-950"
                  style={{
                    fontFamily: 'var(--font-barlow), system-ui, sans-serif',
                    fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                  }}
                >
                  Bài viết liên quan
                </h2>
              </div>
              <Link
                href="/tin-tuc"
                className="inline-flex cursor-pointer items-center gap-2 text-sm font-bold text-orange-600 transition hover:gap-3"
              >
                Xem tất cả
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {relatedApiPosts.map((p, i) => (
                <Link
                  key={p.slug}
                  href={`/tin-tuc/${p.slug}`}
                  className="group flex cursor-pointer flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100/60"
                >
                  <div className="aspect-[16/9] w-full" style={{ background: getGradient(i) }} />
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="mt-1 text-base font-bold leading-snug text-slate-950 transition group-hover:text-orange-600">
                      {p.title}
                    </h3>
                    {p.excerpt && (
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">{p.excerpt}</p>
                    )}
                    <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-orange-600">
                      Đọc tiếp
                      <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 p-8 shadow-xl shadow-orange-200 md:p-10">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
              <h2
                className="font-black leading-tight text-white"
                style={{
                  fontFamily: 'var(--font-barlow), system-ui, sans-serif',
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                }}
              >
                Tham gia BenHub ngay hôm nay
              </h2>
              <p className="text-base text-orange-100">
                Kết nối với hàng nghìn tài xế và chủ xe trên toàn quốc
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/#register"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-orange-600 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Đăng ký ngay
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="mailto:contact@benhub.vn?subject=Demo BenHub"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border-2 border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
                >
                  Xem demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
