'use client'

import { useState } from 'react'
import { Check, Link2 } from 'lucide-react'

interface ShareButtonsProps {
  url: string
  title: string
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
    </svg>
  )
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard not available (non-HTTPS or denied)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-xs font-semibold text-slate-400">Chia sẻ:</span>

      <a
        href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chia sẻ lên Facebook"
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-400 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
      >
        <FacebookIcon />
      </a>

      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chia sẻ lên LinkedIn"
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-400 transition hover:border-blue-700 hover:bg-blue-50 hover:text-blue-700"
      >
        <LinkedinIcon />
      </a>

      <button
        type="button"
        onClick={handleCopy}
        aria-label="Sao chép liên kết"
        className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-400 transition hover:border-orange-400 hover:bg-orange-50 hover:text-orange-600"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <Link2 className="h-4 w-4" />
        )}
        {copied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-slate-900 px-2 py-1 text-[10px] whitespace-nowrap text-white shadow">
            Đã sao chép!
          </span>
        )}
      </button>
    </div>
  )
}
