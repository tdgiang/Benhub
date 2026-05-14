import { Suspense } from 'react'
import type { Metadata } from 'next'
import { NewsListingContent } from '@/components/news/NewsListingContent'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata: Metadata = {
  title: 'Tin Tức & Góc Nhìn | BenHub — Logistics Công Trình',
  description:
    'Cập nhật mới nhất về BenHub, ngành vận tải công trình và logistics xây dựng Việt Nam.',
  openGraph: {
    title: 'Tin Tức BenHub — Logistics Công Trình Việt Nam',
    description: 'Tin tức, phân tích thị trường và góc nhìn từ đội ngũ BenHub.',
    url: 'https://benhub.vn/tin-tuc',
    siteName: 'BenHub',
    locale: 'vi_VN',
    type: 'website',
    images: [{ url: '/og-tin-tuc.png', width: 1200, height: 630 }],
  },
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

export default function NewsPage() {
  return (
    <Suspense fallback={<ListingSkeleton />}>
      <NewsListingContent />
    </Suspense>
  )
}
