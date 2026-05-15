'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

export function ReadingProgress() {
  const t = useTranslations('ArticleDetail')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(100, Math.round((scrollTop / docHeight) * 100)) : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      className="fixed top-16 left-0 z-50 h-[3px] bg-orange-500 transition-[width] duration-100 ease-linear"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={t('reading_progress')}
    />
  )
}
