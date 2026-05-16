'use client'
 
import { useTranslations } from 'next-intl'
 
export default function BuildPageClient() {
  const t = useTranslations('build')
 
  return (
    <section
        aria-labelledby="build-heading"
        style={{
          paddingTop: 'calc(56px + 80px)',
          paddingBottom: '80px',
          paddingLeft: '24px',
          paddingRight: '24px',
          maxWidth: '680px',
          margin: '0 auto',
        }}
      >
        <h1
          id="build-heading"
          style={{
            fontFamily: 'var(--font-lora)',
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 700,
            lineHeight: 1.15,
            color: 'var(--text)',
            margin: '0 0 24px',
          }}
        >
          {t('heading')}
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-lora)',
            fontSize: '20px',
            lineHeight: 1.5,
            color: 'var(--stone)',
            margin: 0,
          }}
        >
          {t('placeholder')}
        </p>
      </section>
  )
}