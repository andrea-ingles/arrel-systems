import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useLocale } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()

  const linkStyle = {
    fontFamily: 'var(--font-dm-sans)',
    fontSize: '12px',
    fontWeight: 300,
    color: 'var(--stone)',
    textDecoration: 'none',
  }

  return (
    <footer
      role="contentinfo"
      style={{
        padding: '32px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        borderTop: '1px solid var(--border)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '12px',
          fontWeight: 300,
          color: 'var(--stone)',
        }}
      >
        {t('domain')}
      </span>

      <nav aria-label="Footer navigation" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        <a href="mailto:andrea@arrel.systems" style={linkStyle}>
          andrea@arrel.systems
        </a>
        <Link href={`/${locale}/legal`} style={linkStyle}>
          {t('legal')}
        </Link>
        <Link
          href="https://youtube.com/@arrelSystems"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
        >
          {t('handle')}
        </Link>
      </nav>
    </footer>
  )
}

