import { Suspense } from 'react'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { NewsListingContent } from '@/components/news/NewsListingContent'
import { Skeleton } from '@/components/ui/skeleton'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isVi = locale !== 'en'
  return {
    title: isVi
      ? 'Tin Tức & Góc Nhìn | BenHub — Logistics Công Trình'
      : 'News & Insights | BenHub — Construction Logistics',
    description: isVi
      ? 'Cập nhật mới nhất về BenHub, ngành vận tải công trình và logistics xây dựng Việt Nam.'
      : 'Latest updates on BenHub, construction transport and construction logistics in Vietnam.',
    openGraph: {
      title: isVi
        ? 'Tin Tức BenHub — Logistics Công Trình Việt Nam'
        : 'BenHub News — Vietnam Construction Logistics',
      description: isVi
        ? 'Tin tức, phân tích thị trường và góc nhìn từ đội ngũ BenHub.'
        : 'News, market analysis and insights from the BenHub team.',
      url: 'https://benhub.vn/tin-tuc',
      siteName: 'BenHub',
      locale: isVi ? 'vi_VN' : 'en_US',
      type: 'website',
      images: [{ url: '/og-tin-tuc.png', width: 1200, height: 630 }],
    },
  }
}

function ListingSkeleton() {
  return (
    <div className="bg-slate-50">
      <div className="bg-[#050B18] pb-20 pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="mb-4 h-6 w-40 bg-white/10" />
          <Skeleton className="mb-4 h-20 w-3/4 bg-white/10" />
          <Skeleton className="h-12 w-full max-w-xl bg-white/10" />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <Skeleton className="mb-8 h-56 w-full rounded-[2rem]" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-72 rounded-[2rem]" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Suspense fallback={<ListingSkeleton />}>
      <NewsListingContent />
    </Suspense>
  )
}
