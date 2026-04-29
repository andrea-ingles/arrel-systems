'use client'
import { useTranslations } from 'next-intl'

export default function SkipLink() {
  const t = useTranslations('a11y')
  return (
    <a
      href="#main-content"
      style={{
        position: 'absolute',
        top: '-100px',
        left: '16px',
        zIndex: 200,
        padding: '8px 16px',
        backgroundColor: 'var(--terracotta)',
        color: 'var(--bone)',
        fontFamily: 'var(--font-dm-sans)',
        fontSize: '14px',
        fontWeight: 500,
        borderRadius: '4px',
        textDecoration: 'none',
        transition: 'top 200ms ease',
      }}
      onFocus={e => (e.currentTarget.style.top = '16px')}
      onBlur={e => (e.currentTarget.style.top = '-100px')}
    >
      {t('skip_to_content')}
    </a>
  )
}
