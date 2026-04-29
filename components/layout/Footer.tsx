import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useLocale } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()

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

      <Link
        href="https://youtube.com/@arrel"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '12px',
          fontWeight: 300,
          color: 'var(--stone)',
          textDecoration: 'none',
        }}
      >
        {t('handle')}
      </Link>
    </footer>
  )
}
