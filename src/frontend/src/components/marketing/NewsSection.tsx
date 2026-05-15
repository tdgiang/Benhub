import Link from "next/link";
import { ArrowRight, Clock3, Newspaper } from "lucide-react";
import { getTranslations } from "next-intl/server";

const BACKEND = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

const GRADIENTS = [
  "linear-gradient(135deg, #c2410c 0%, #f97316 50%, #fb923c 100%)",
  "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #2563eb 100%)",
  "linear-gradient(135deg, #052e16 0%, #0f6e56 50%, #14b8a6 100%)",
  "linear-gradient(135deg, #1e293b 0%, #475569 50%, #64748b 100%)",
  "linear-gradient(135deg, #78350f 0%, #b45309 50%, #f59e0b 100%)",
];

interface ApiPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  createdAt: string;
}

async function fetchLatestPosts(): Promise<ApiPost[]> {
  try {
    const res = await fetch(
      `${BACKEND}/api/v1/posts?status=PUBLISHED&limit=3&sortBy=createdAt&sortOrder=desc`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return [];
    const body = await res.json();
    return body?.data?.items ?? [];
  } catch {
    return [];
  }
}

function estimateReadTime(content: string) {
  const words = content
    .replace(/<[^>]+>/g, "")
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} phút đọc`;
}

export async function NewsSection() {
  const [t, posts] = await Promise.all([
    getTranslations("NewsSection"),
    fetchLatestPosts(),
  ]);

  if (posts.length === 0) return null;

  return (
    <section id="news" className="bg-white py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-orange-600">
              <Newspaper className="h-3.5 w-3.5" />
              {t("label")}
            </div>
            <h2
              className="font-black leading-tight text-slate-950"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
              }}
            >
              {t("heading")}
            </h2>
          </div>
          <Link
            href="/tin-tuc"
            className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-orange-300 hover:text-orange-600"
          >
            {t("view_all")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Link
              key={post.id}
              href={`/tin-tuc/${post.slug}`}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100/60"
            >
              {/* Thumbnail */}
              {post.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="aspect-[16/9] w-full object-cover"
                />
              ) : (
                <div
                  className="relative aspect-[16/9] w-full overflow-hidden"
                  style={{ background: GRADIENTS[i % GRADIENTS.length] }}
                >
                  <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  <div className="absolute inset-0 flex items-end justify-end p-4">
                    <span
                      className="font-black leading-none text-white/20 select-none"
                      style={{
                        fontFamily: "var(--font-barlow), system-ui, sans-serif",
                        fontSize: "5rem",
                      }}
                    >
                      {i + 1}
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                {/* Title */}
                <h3 className="line-clamp-2 text-base font-bold leading-snug text-slate-950 transition group-hover:text-orange-600">
                  {post.title}
                </h3>

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">
                    {post.excerpt}
                  </p>
                )}

                {/* Meta */}
                <div className="mt-auto flex items-center gap-3 border-t border-slate-100 pt-4">
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
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-6 flex justify-center sm:hidden">
          <Link
            href="/tin-tuc"
            className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
          >
            {t("view_all")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
