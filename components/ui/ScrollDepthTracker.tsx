'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { trackEvent } from '@/lib/analytics'

const THRESHOLDS = [25, 50, 75, 90]

export default function ScrollDepthTracker() {
  const pathname = usePathname()
  const fired = useRef<Set<number>>(new Set())

  useEffect(() => {
    fired.current = new Set()

    const handleScroll = () => {
      const scrolled = window.scrollY
      const total = document.body.scrollHeight - window.innerHeight
      if (total <= 0) return
      const pct = Math.round((scrolled / total) * 100)

      for (const threshold of THRESHOLDS) {
        if (pct >= threshold && !fired.current.has(threshold)) {
          fired.current.add(threshold)
          trackEvent('ScrollDepth', {
            depth: String(threshold),
            page: pathname,
          })
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  return null
}

