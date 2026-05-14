'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  Newspaper,
  Search,
  X,
} from 'lucide-react'
import {
  CATEGORIES,
  getCategoryById,
  newsPosts,
  type CategoryId,
  type NewsPost,
} from '@/lib/news'

const POSTS_PER_PAGE = 9

/* ─── Thumbnail placeholder ─── */
function Thumbnail({
  post,
  aspectClass = 'aspect-[16/9]',
}: {
  post: NewsPost
  aspectClass?: string
}) {
  const cat = getCategoryById(post.categoryId)
  return (
    <div
      className={`${aspectClass} w-full overflow-hidden rounded-xl`}
      style={{ background: cat.gradient }}
    >
      <div className="relative flex h-full w-full items-end justify-end p-4">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <span
          className="font-black leading-none text-white/20 select-none"
          style={{
            fontFamily: 'var(--font-barlow), system-ui, sans-serif',
            fontSize: 'clamp(4rem,10vw,7rem)',
          }}
        >
          {post.heroIndex}
        </span>
      </div>
    </div>
  )
}

/* ─── Category badge ─── */
function CategoryBadge({ categoryId }: { categoryId: CategoryId }) {
  const cat = getCategoryById(categoryId)
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold text-white"
      style={{ backgroundColor: cat.color }}
    >
      {cat.label}
    </span>
  )
}

/* ─── Featured article ─── */
function FeaturedArticle({ post }: { post: NewsPost }) {
  return (
    <Link
      href={`/tin-tuc/${post.slug}`}
      className="group mb-10 grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:shadow-xl hover:shadow-slate-200/80 md:grid-cols-[3fr_2fr]"
    >
      <div className="relative min-h-56 overflow-hidden md:min-h-full">
        <Thumbnail post={post} aspectClass="h-full min-h-56" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>

      <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <CategoryBadge categoryId={post.categoryId} />
          <span className="rounded-full border border-orange-200 bg-orange-50 px-2 py-0.5 text-xs font-bold text-orange-600">
            Nổi bật
          </span>
        </div>

        <h2
          className="font-black leading-tight text-slate-950 transition group-hover:text-orange-600"
          style={{
            fontFamily: 'var(--font-barlow), system-ui, sans-serif',
            fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
          }}
        >
          {post.title}
        </h2>

        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-600">
          {post.sapo}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5" />
            {post.readTime}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600">
            {post.author.initials}
          </div>
          <span className="text-sm font-semibold text-slate-700">{post.author.name}</span>
        </div>

        <span className="mt-6 inline-flex items-center gap-2 self-start rounded-2xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-100 transition group-hover:bg-orange-600">
          Đọc bài viết
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}

/* ─── Article card ─── */
function ArticleCard({ post }: { post: NewsPost }) {
  return (
    <Link
      href={`/tin-tuc/${post.slug}`}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100/60"
    >
      <div className="overflow-hidden rounded-t-[2rem]">
        <Thumbnail post={post} />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3">
          <CategoryBadge categoryId={post.categoryId} />
        </div>

        <h3 className="line-clamp-2 text-base font-bold leading-snug text-slate-950 transition group-hover:text-orange-600">
          {post.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">
          {post.excerpt}
        </p>

        <div className="mt-auto border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-[10px] font-bold text-orange-600">
              {post.author.initials}
            </div>
            <span className="flex-1 truncate text-xs font-semibold text-slate-600">
              {post.author.name}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              <Clock3 className="h-3 w-3" />
              {post.readTime}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">{post.date}</p>
        </div>
      </div>
    </Link>
  )
}

/* ─── Pagination ─── */
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  if (totalPages <= 1) return null

  const pages: (number | '...')[] = []
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else {
    pages.push(1)
    if (currentPage > 3) pages.push('...')
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) pages.push(i)
    if (currentPage < totalPages - 2) pages.push('...')
    pages.push(totalPages)
  }

  return (
    <nav
      className="mt-10 flex items-center justify-center gap-1.5"
      aria-label="Phân trang"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-9 cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 px-3 text-sm font-semibold text-slate-600 transition hover:border-orange-300 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Trước
      </button>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="flex h-9 w-9 items-center justify-center text-sm text-slate-400">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p as number)}
            className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-sm font-bold transition ${
              p === currentPage
                ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                : 'border border-slate-200 text-slate-600 hover:border-orange-300 hover:text-orange-600'
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-9 cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 px-3 text-sm font-semibold text-slate-600 transition hover:border-orange-300 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Tiếp
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </nav>
  )
}

/* ─── CTA Banner ─── */
function CTABanner() {
  return (
    <div className="mt-16 overflow-hidden rounded-[2rem] bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 p-8 shadow-xl shadow-orange-200 md:p-10">
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

/* ─── Main export ─── */
export function NewsListingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const activeCategory = (searchParams.get('category') as CategoryId | null) ?? null
  const currentPage = Math.max(1, Number(searchParams.get('page') ?? '1'))

  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchInput.trim()), 300)
    return () => clearTimeout(timer)
  }, [searchInput])

  const updateURL = useCallback(
    (params: Record<string, string | null>) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()))
      for (const [key, val] of Object.entries(params)) {
        if (val === null) current.delete(key)
        else current.set(key, val)
      }
      router.push(`/tin-tuc?${current.toString()}`, { scroll: false })
    },
    [router, searchParams],
  )

  const handleCategoryClick = (catId: CategoryId | null) => {
    updateURL({ category: catId, page: null })
  }

  const handlePageChange = (page: number) => {
    updateURL({ page: page === 1 ? null : String(page) })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isSearching = debouncedSearch.length > 0
  const isFiltering = !!activeCategory

  const filteredPosts = newsPosts.filter((p) => {
    if (isSearching) {
      const q = debouncedSearch.toLowerCase()
      return (
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      )
    }
    if (activeCategory) return p.categoryId === activeCategory
    return true
  })

  const featuredPost = newsPosts.find((p) => p.isFeatured)
  const gridPosts =
    isSearching || isFiltering
      ? filteredPosts
      : filteredPosts.filter((p) => !p.isFeatured)

  const totalPages = Math.ceil(gridPosts.length / POSTS_PER_PAGE)
  const pagedPosts = gridPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  )

  const categoryCountMap = Object.fromEntries(
    CATEGORIES.map((cat) => [
      cat.id,
      newsPosts.filter((p) => p.categoryId === cat.id).length,
    ]),
  )

  return (
    <div className="bg-slate-50 text-slate-950">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#050B18] pb-14 pt-28 md:pb-20 md:pt-32">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url('/bg_login.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-[#050B18]/85 to-[#050B18]" />
          <div className="absolute -left-24 top-24 h-96 w-96 rounded-full bg-orange-500/20 blur-[90px]" />
          <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-[110px]" />
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
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
            <Newspaper className="h-4 w-4" />
            Tin tức & Insights
          </div>
          <h1
            className="mt-4 font-black leading-[0.95] tracking-tight text-white"
            style={{
              fontFamily: 'var(--font-barlow), system-ui, sans-serif',
              fontSize: 'clamp(3rem, 8vw, 6.5rem)',
            }}
          >
            Tin Tức & Góc Nhìn
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
            Cập nhật mới nhất từ BenHub và ngành logistics xây dựng Việt Nam
          </p>

          <div className="mt-8 flex max-w-xl items-center gap-3 rounded-2xl border border-white/10 bg-white/8 px-4 py-3 backdrop-blur-sm transition focus-within:border-orange-400/50 focus-within:bg-white/12">
            <Search className="h-5 w-5 shrink-0 text-slate-400" />
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Tìm kiếm bài viết, chủ đề, từ khóa..."
              aria-label="Tìm kiếm bài viết"
              className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput('')}
                aria-label="Xóa tìm kiếm"
                className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-slate-600 text-slate-300 transition hover:bg-slate-500"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ── Featured ── */}
          {!isSearching && !isFiltering && featuredPost && (
            <FeaturedArticle post={featuredPost} />
          )}

          {/* ── Category filter ── */}
          {!isSearching && (
            <div
              className="mb-8 flex gap-2 overflow-x-auto pb-1"
              role="tablist"
              aria-label="Lọc theo chủ đề"
            >
              <button
                type="button"
                role="tab"
                aria-selected={!activeCategory}
                onClick={() => handleCategoryClick(null)}
                className={`shrink-0 cursor-pointer rounded-full border px-4 py-2 text-sm font-bold transition ${
                  !activeCategory
                    ? 'border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-100'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-orange-200 hover:text-orange-600'
                }`}
              >
                Tất cả ({newsPosts.length})
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`shrink-0 cursor-pointer rounded-full border px-4 py-2 text-sm font-bold transition ${
                    activeCategory === cat.id
                      ? 'border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-100'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-orange-200 hover:text-orange-600'
                  }`}
                >
                  {cat.label} ({categoryCountMap[cat.id] ?? 0})
                </button>
              ))}
            </div>
          )}

          {/* ── Article grid ── */}
          {pagedPosts.length > 0 ? (
            <>
              {isSearching && (
                <p className="mb-5 text-sm text-slate-500">
                  Tìm thấy{' '}
                  <span className="font-bold text-slate-900">{filteredPosts.length}</span> kết quả
                  cho &ldquo;<span className="font-bold text-orange-600">{debouncedSearch}</span>&rdquo;
                </p>
              )}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {pagedPosts.map((post) => (
                  <ArticleCard key={post.slug} post={post} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                <Search className="h-7 w-7 text-slate-400" />
              </div>
              <p className="text-lg font-bold text-slate-700">
                Không tìm thấy bài viết phù hợp
              </p>
              <p className="text-sm text-slate-500">
                Thử từ khóa khác hoặc xóa bộ lọc để xem tất cả bài viết.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchInput('')
                  handleCategoryClick(null)
                }}
                className="cursor-pointer rounded-2xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600"
              >
                Xem tất cả bài viết
              </button>
            </div>
          )}

          <CTABanner />
        </div>
      </section>
    </div>
  )
}
