'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

export default function ThemeToggle() {
  const t = useTranslations('a11y')
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggle = () => {
    const html = document.documentElement
    const next = !isDark
    html.classList.remove('dark', 'light')
    html.classList.add(next ? 'dark' : 'light')
    try {
      localStorage.setItem('arrel-theme', next ? 'dark' : 'light')
    } catch (_) {}
    setIsDark(next)
  }

  if (!mounted) return <div style={{ width: 20, height: 20 }} aria-hidden="true" />

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? t('toggle_light') : t('toggle_dark')}
      title={isDark ? t('toggle_light') : t('toggle_dark')}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '2px',
        color: 'var(--stone)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'color 150ms ease',
        flexShrink: 0,
      }}
    >
      {isDark ? (
        // Sun icon
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        // Moon icon
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}
