import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import ArrelLogo from '@/components/ui/ArrelLogo'

export default function NotFound() {
  const t = useTranslations('errors')
  const tn = useTranslations('nav')
  const locale = useLocale()

  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center',
        gap: '32px',
      }}
    >
      <ArrelLogo size={28} />

      <div>
        <h1
          style={{
            fontFamily: 'var(--font-lora)',
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 700,
            color: 'var(--text)',
            margin: '0 0 16px',
          }}
        >
          {t('not_found_heading')}
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-lora)',
            fontSize: '17px',
            color: 'var(--stone)',
            margin: 0,
            lineHeight: 1.65,
          }}
        >
          {t('not_found_body')}
        </p>
      </div>

      <nav
        aria-label="Recovery navigation"
        style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {[
          { href: `/${locale}/build`, label: t('not_found_build') },
          { href: `/${locale}/project`, label: t('not_found_system') },
          { href: `/${locale}/subscribe`, label: t('not_found_subscribe') },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '15px',
              fontWeight: 500,
              color: 'var(--deep-green)',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
