'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { locales, localeLabels, type Locale } from '@/lib/i18n-config'
import ArrelLogo from '@/components/ui/ArrelLogo'
import ThemeToggle from '@/components/ui/ThemeToggle'

export default function Header() {
  const t = useTranslations('nav')
  const ta = useTranslations('a11y')
  const locale = useLocale() as Locale
  const pathname = usePathname()

  const [visible, setVisible] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  // Get path without locale prefix for switching
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, '') || '/'

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          if (currentScrollY < 60) {
            setVisible(true)
          } else if (currentScrollY > lastScrollY.current) {
            setVisible(false)
            setMenuOpen(false)
          } else {
            setVisible(true)
          }
          lastScrollY.current = currentScrollY
          ticking.current = false
        })
        ticking.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navLinks = [
    { href: `/${locale}/build`, label: t('build') },
    { href: `/${locale}/project`, label: t('system') },
    { href: `/${locale}/subscribe`, label: t('subscribe') },
  ]

  return (
    <>
      <header
        role="banner"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          transform: visible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 200ms ease',
          backgroundColor: 'color-mix(in srgb, var(--bg) 95%, transparent)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderBottom: '1px solid color-mix(in srgb, var(--stone) 20%, transparent)',
        }}
      >
        {/* Logo */}
        <Link
          href={`/${locale}`}
          aria-label={ta('logo_home')}
          style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
        >
          <ArrelLogo size={22} />
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Primary navigation"
          style={{ display: 'flex', alignItems: 'center', gap: '28px' }}
          className="desktop-nav"
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname.startsWith(href) ? 'page' : undefined}
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '0.01em',
                color: pathname.startsWith(href) ? 'var(--deep-green)' : 'var(--stone)',
                textDecoration: 'none',
                transition: 'color 150ms ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--deep-green)')}
              onMouseLeave={e => (e.currentTarget.style.color = pathname.startsWith(href) ? 'var(--deep-green)' : 'var(--stone)')}
            >
              {label}
            </Link>
          ))}

          {/* Language selector */}
          <div
            role="group"
            aria-label={ta('language_select')}
            style={{ display: 'flex', gap: '8px', marginLeft: '4px' }}
          >
            {locales.map((l) => (
              <Link
                key={l}
                href={`/${l}${pathnameWithoutLocale}`}
                lang={l}
                aria-current={l === locale ? 'true' : undefined}
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  color: l === locale ? 'var(--deep-green)' : 'var(--stone)',
                  textDecoration: 'none',
                  transition: 'color 150ms ease',
                }}
              >
                {localeLabels[l]}
              </Link>
            ))}
          </div>

          <ThemeToggle />
        </nav>

        {/* Mobile: theme + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} className="mobile-controls">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(true)}
            aria-label={ta('open_menu')}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              color: 'var(--stone)',
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            {t('menu')}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            backgroundColor: 'var(--bg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px',
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            aria-label={ta('close_menu')}
            style={{
              position: 'absolute',
              top: '20px',
              right: '24px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--stone)',
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            {t('close')}
          </button>

          <ArrelLogo size={28} />

          <nav aria-label="Mobile navigation" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname.startsWith(href) ? 'page' : undefined}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-lora)',
                  fontSize: '32px',
                  fontWeight: 700,
                  color: pathname.startsWith(href) ? 'var(--deep-green)' : 'var(--text)',
                  textDecoration: 'none',
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Language in mobile menu */}
          <div
            role="group"
            aria-label={ta('language_select')}
            style={{ display: 'flex', gap: '16px' }}
          >
            {locales.map((l) => (
              <Link
                key={l}
                href={`/${l}${pathnameWithoutLocale}`}
                lang={l}
                onClick={() => setMenuOpen(false)}
                aria-current={l === locale ? 'true' : undefined}
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  color: l === locale ? 'var(--deep-green)' : 'var(--stone)',
                  textDecoration: 'none',
                }}
              >
                {localeLabels[l]}
              </Link>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .desktop-nav { display: flex !important; }
        .mobile-controls { display: none !important; }
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-controls { display: flex !important; }
        }
      `}</style>
    </>
  )
}
