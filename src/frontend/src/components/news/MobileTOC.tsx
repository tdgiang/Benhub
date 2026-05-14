'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { Heading } from './ArticleSidebar'

interface MobileTOCProps {
  headings: Heading[]
}

export function MobileTOC({ headings }: MobileTOCProps) {
  const [open, setOpen] = useState(false)

  if (headings.length < 3) return null

  return (
    <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between px-5 py-4 text-sm font-bold text-slate-700"
      >
        <span>Mục lục bài viết</span>
        <ChevronDown
          className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="border-t border-slate-100 px-5 pb-4">
          <ul className="mt-3 space-y-0.5" role="list">
            {headings.map((h) => (
              <li key={h.id} className={h.level === 3 ? 'ml-3' : ''}>
                <a
                  href={`#${h.id}`}
                  onClick={() => setOpen(false)}
                  className="flex cursor-pointer items-start gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-600 transition hover:text-orange-600"
                >
                  <span className="mt-0.5 text-[10px] text-slate-300">
                    {h.level === 2 ? '•' : '›'}
                  </span>
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
