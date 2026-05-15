'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Truck } from 'lucide-react'
import { useTranslations } from 'next-intl'

export interface Heading {
  id: string
  text: string
  level: 2 | 3
}

export interface RelatedPost {
  slug: string
  title: string
  gradient: string
  readTime?: string
}

interface ArticleSidebarProps {
  headings: Heading[]
  relatedPosts: RelatedPost[]
}

export function ArticleSidebar({ headings, relatedPosts }: ArticleSidebarProps) {
  const t = useTranslations('ArticleDetail')
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (headings.length < 3) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '-10% 0px -60% 0px' },
    )
    headings.forEach((h) => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings])

  return (
    <aside className="space-y-5">
      {headings.length >= 3 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
            {t('toc_label')}
          </p>
          <nav aria-label={t('toc_label')}>
            <ul className="space-y-0.5" role="list">
              {headings.map((h) => (
                <li key={h.id} className={h.level === 3 ? 'ml-3' : ''}>
                  <a
                    href={`#${h.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className={`flex cursor-pointer items-start gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors ${
                      activeId === h.id
                        ? 'bg-orange-50 font-semibold text-orange-600'
                        : 'text-slate-600 hover:text-orange-600'
                    }`}
                  >
                    <span className="mt-0.5 shrink-0 text-[10px] font-bold text-slate-300">
                      {h.level === 2 ? '•' : '›'}
                    </span>
                    <span className="leading-snug">{h.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      <div className="rounded-2xl bg-[#0F172A] p-5 shadow-lg">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/15">
          <Truck className="h-5 w-5 text-orange-400" />
        </div>
        <p className="text-sm font-bold text-white">{t('join_title')}</p>
        <p className="mt-2 text-xs leading-relaxed text-slate-400">{t('join_desc')}</p>
        <Link
          href="/#register"
          className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-orange-600"
        >
          {t('join_cta')}
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {relatedPosts.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
            {t('related_label')}
          </p>
          <div className="space-y-4">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/tin-tuc/${post.slug}`}
                className="group flex gap-3 cursor-pointer"
              >
                <div
                  className="h-14 w-14 shrink-0 rounded-lg"
                  style={{ background: post.gradient }}
                />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-xs font-semibold leading-snug text-slate-700 transition group-hover:text-orange-600">
                    {post.title}
                  </p>
                  {post.readTime && (
                    <p className="mt-1 text-[11px] text-slate-400">{post.readTime}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}
