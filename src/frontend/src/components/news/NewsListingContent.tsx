"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  Newspaper,
  Search,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";

interface ApiPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  status: string;
  createdAt: string;
}

interface ApiMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const POSTS_PER_PAGE = 9;

const GRADIENTS = [
  "linear-gradient(135deg, #c2410c 0%, #f97316 50%, #fb923c 100%)",
  "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #2563eb 100%)",
  "linear-gradient(135deg, #052e16 0%, #0f6e56 50%, #14b8a6 100%)",
  "linear-gradient(135deg, #1e293b 0%, #475569 50%, #64748b 100%)",
  "linear-gradient(135deg, #78350f 0%, #b45309 50%, #f59e0b 100%)",
];

function getGradient(index: number) {
  return GRADIENTS[index % GRADIENTS.length];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function estimateReadTime(content: string) {
  const words = content
    .replace(/<[^>]+>/g, "")
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} phút đọc`;
}

/* ─── Thumbnail ─── */
function Thumbnail({
  coverImage,
  title,
  gradient,
  index,
  /** Class applied to <img> when coverImage exists */
  imgClass = "aspect-[16/9] w-full object-cover",
  /** Class applied to the gradient fallback div */
  gradientClass = "aspect-[16/9]",
}: {
  coverImage?: string | null;
  title?: string;
  gradient: string;
  index: number;
  imgClass?: string;
  gradientClass?: string;
}) {
  if (coverImage) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={coverImage} alt={title ?? ""} className={imgClass} />
    );
  }

  return (
    <div
      className={`${gradientClass} w-full overflow-hidden rounded-xl`}
      style={{ background: gradient }}
    >
      <div className="relative flex h-full w-full items-end justify-end p-4">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <span
          className="font-black leading-none text-white/20 select-none"
          style={{
            fontFamily: "var(--font-barlow), system-ui, sans-serif",
            fontSize: "clamp(4rem,10vw,7rem)",
          }}
        >
          {index + 1}
        </span>
      </div>
    </div>
  );
}

/* ─── Featured article ─── */
function FeaturedArticle({
  post,
  index,
  featuredBadge,
  readMore,
}: {
  post: ApiPost;
  index: number;
  featuredBadge: string;
  readMore: string;
}) {
  return (
    <Link
      href={`/tin-tuc/${post.slug}`}
      className="group mb-10 grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:shadow-xl hover:shadow-slate-200/80 md:grid-cols-[3fr_2fr]"
    >
      <div className="relative min-h-56 overflow-hidden md:min-h-full">
        <Thumbnail
          coverImage={post.coverImage}
          title={post.title}
          gradient={getGradient(index)}
          index={index}
          imgClass="absolute inset-0 h-full w-full object-cover"
          gradientClass="h-full min-h-56"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>

      <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
        <div className="mb-4">
          <span className="rounded-full border border-orange-200 bg-orange-50 px-2 py-0.5 text-xs font-bold text-orange-600">
            {featuredBadge}
          </span>
        </div>

        <h2
          className="font-black leading-tight text-slate-950 transition group-hover:text-orange-600"
          style={{
            fontFamily: "var(--font-barlow), system-ui, sans-serif",
            fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
          }}
        >
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-600">
            {post.excerpt}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            {formatDate(post.createdAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5" />
            {estimateReadTime(post.content)}
          </span>
        </div>

        <span className="mt-6 inline-flex items-center gap-2 self-start rounded-2xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-100 transition group-hover:bg-orange-600">
          {readMore}
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

/* ─── Article card ─── */
function ArticleCard({ post, index }: { post: ApiPost; index: number }) {
  return (
    <Link
      href={`/tin-tuc/${post.slug}`}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100/60"
    >
      <div className="overflow-hidden rounded-t-[2rem]">
        <Thumbnail
          coverImage={post.coverImage}
          title={post.title}
          gradient={getGradient(index)}
          index={index}
          imgClass="aspect-[16/9] w-full object-cover"
          gradientClass="aspect-[16/9]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-base font-bold leading-snug text-slate-950 transition group-hover:text-orange-600">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">
            {post.excerpt}
          </p>
        )}

        <div className="mt-auto border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-[10px] font-bold text-orange-600">
              BH
            </div>
            <span className="flex-1 truncate text-xs font-semibold text-slate-600">
              BenHub
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              <Clock3 className="h-3 w-3" />
              {estimateReadTime(post.content)}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            {formatDate(post.createdAt)}
          </p>
        </div>
      </div>
    </Link>
  );
}

/* ─── Skeleton card ─── */
function SkeletonCard() {
  return <div className="h-72 animate-pulse rounded-[2rem] bg-slate-200" />;
}

/* ─── Pagination ─── */
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  prevLabel,
  nextLabel,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  prevLabel: string;
  nextLabel: string;
}) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    )
      pages.push(i);
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <nav className="mt-10 flex items-center justify-center gap-1.5">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-9 cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 px-3 text-sm font-semibold text-slate-600 transition hover:border-orange-300 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {prevLabel}
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="flex h-9 w-9 items-center justify-center text-sm text-slate-400"
          >
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p as number)}
            className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-sm font-bold transition ${
              p === currentPage
                ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                : "border border-slate-200 text-slate-600 hover:border-orange-300 hover:text-orange-600"
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
        {nextLabel}
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </nav>
  );
}

/* ─── CTA Banner ─── */
function CTABanner({
  heading,
  sub,
  btnLabel,
  demoLabel,
}: {
  heading: string;
  sub: string;
  btnLabel: string;
  demoLabel: string;
}) {
  return (
    <div className="mt-16 overflow-hidden rounded-[2rem] bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 p-8 shadow-xl shadow-orange-200 md:p-10">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <h2
          className="font-black leading-tight text-white"
          style={{
            fontFamily: "var(--font-barlow), system-ui, sans-serif",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          }}
        >
          {heading}
        </h2>
        <p className="text-base text-orange-100">{sub}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/#register"
            className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-orange-600 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            {btnLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="mailto:contact@benhub.vn?subject=Demo BenHub"
            className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border-2 border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
          >
            {demoLabel}
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Main export ─── */
export function NewsListingContent() {
  const t = useTranslations("TinTucPage");
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Math.max(1, Number(searchParams.get("page") ?? "1"));

  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [meta, setMeta] = useState<ApiMeta>({
    total: 0,
    page: 1,
    limit: POSTS_PER_PAGE,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchInput.trim()), 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams({
      status: "PUBLISHED",
      page: String(currentPage),
      limit: String(POSTS_PER_PAGE),
    });
    if (debouncedSearch) params.set("search", debouncedSearch);

    async function load() {
      await Promise.resolve();
      if (cancelled) return;
      setLoading(true);
      try {
        const r = await fetch(`/api/posts?${params}`);
        const body = await r.json();
        if (!cancelled && body?.data) {
          setPosts(body.data.items ?? []);
          setMeta(body.data.meta);
        }
      } catch {
        // network error — keep existing posts
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [currentPage, debouncedSearch]);

  const updateURL = useCallback(
    (params: Record<string, string | null>) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      for (const [key, val] of Object.entries(params)) {
        if (val === null) current.delete(key);
        else current.set(key, val);
      }
      router.push(`/tin-tuc?${current.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const handlePageChange = (page: number) => {
    updateURL({ page: page === 1 ? null : String(page) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isSearching = debouncedSearch.length > 0;
  const featuredPost = !isSearching && currentPage === 1 ? posts[0] : undefined;
  const gridPosts = featuredPost ? posts.slice(1) : posts;

  return (
    <div className="bg-slate-50 text-slate-950">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#050B18] pb-14 pt-28 md:pb-20 md:pt-32">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url('/bg_login.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-[#050B18]/65 to-[#050B18]" />
          <div className="absolute -left-24 top-24 h-96 w-96 rounded-full bg-orange-500/20 blur-[90px]" />
          <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-blue-500/5 blur-[110px]" />

          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.55) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.45) 1px,transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
            <Newspaper className="h-4 w-4" />
            {t("hero_label")}
          </div>
          <h1
            className="mt-4 font-black leading-[0.95] tracking-tight text-white"
            style={{
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
            }}
          >
            {t("hero_h1")}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
            {t("hero_sub")}
          </p>

          <div className="mt-8 flex max-w-xl items-center gap-3 rounded-2xl border border-white/10 bg-white/8 px-4 py-3 backdrop-blur-sm transition focus-within:border-orange-400/50 focus-within:bg-white/12">
            <Search className="h-5 w-5 shrink-0 text-slate-400" />
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={t("search_placeholder")}
              aria-label={t("search_label")}
              className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput("")}
                aria-label={t("search_clear")}
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
          {!loading && featuredPost && (
            <FeaturedArticle
              post={featuredPost}
              index={0}
              featuredBadge={t("featured_badge")}
              readMore={t("read_more")}
            />
          )}

          {/* ── Article grid ── */}
          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : gridPosts.length > 0 ? (
            <>
              {isSearching && (
                <p className="mb-5 text-sm text-slate-500">
                  {t("search_result")}{" "}
                  <span className="font-bold text-slate-900">{meta.total}</span>{" "}
                  {t("search_result_for")} &ldquo;
                  <span className="font-bold text-orange-600">
                    {debouncedSearch}
                  </span>
                  &rdquo;
                </p>
              )}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {gridPosts.map((post, i) => (
                  <ArticleCard
                    key={post.id}
                    post={post}
                    index={featuredPost ? i + 1 : i}
                  />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={meta.totalPages}
                onPageChange={handlePageChange}
                prevLabel={t("pagination_prev")}
                nextLabel={t("pagination_next")}
              />
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                <Search className="h-7 w-7 text-slate-400" />
              </div>
              <p className="text-lg font-bold text-slate-700">
                {t("search_empty_title")}
              </p>
              <p className="text-sm text-slate-500">{t("search_empty_desc")}</p>
              <button
                type="button"
                onClick={() => setSearchInput("")}
                className="cursor-pointer rounded-2xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600"
              >
                {t("search_reset")}
              </button>
            </div>
          )}

          <CTABanner
            heading={t("cta_heading")}
            sub={t("cta_sub")}
            btnLabel={t("cta_btn")}
            demoLabel={t("cta_demo")}
          />
        </div>
      </section>
    </div>
  );
}
