import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { locales } from '@/lib/i18n-config'

interface Props {
  params: { locale: string }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'build' })

  const languages: Record<string, string> = {
    'x-default': 'https://arrel.systems/ca/build',
  }
  locales.forEach((l) => {
    languages[l] = `https://arrel.systems/${l}/build`
  })

  return {
    title: t('label'),
    description: t('body'),
    alternates: {
      canonical: `https://arrel.systems/${locale}/build`,
      languages,
    },
    openGraph: {
      title: t('label'),
      description: t('body'),
      locale: locale === 'ca' ? 'ca_ES' : locale === 'es' ? 'es_ES' : 'en_GB',
      images: [{ url: '/og/default.jpg', width: 1200, height: 630, alt: 'Arrel' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('label'),
      description: t('body'),
      images: ['/og/default.jpg'],
    },
  }
}

export default async function BuildPage({ params }: Props) {
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'build' })

  return (
    <section
      aria-labelledby="build-heading"
      style={{
        paddingTop: 'calc(56px + 120px)',
        paddingBottom: '120px',
        paddingLeft: '24px',
        paddingRight: '24px',
        maxWidth: '680px',
        margin: '0 auto',
      }}
    >
      {/* Label */}
      <p
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--deep-green)',
          margin: '0 0 24px',
        }}
      >
        {t('label')}
      </p>

      {/* Heading */}
      <h1
        id="build-heading"
        style={{
          fontFamily: 'var(--font-lora)',
          fontSize: 'clamp(28px, 3.5vw, 42px)',
          fontWeight: 700,
          lineHeight: 1.15,
          color: 'var(--text)',
          margin: '0 0 32px',
        }}
      >
        {t('heading')}
      </h1>

      {/* Body */}
      <p
        style={{
          fontFamily: 'var(--font-lora)',
          fontSize: '17px',
          lineHeight: 1.65,
          color: 'var(--text)',
          margin: '0 0 48px',
        }}
      >
        {t('body')}
      </p>

      {/* Status indicator */}
      <p
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '13px',
          fontWeight: 500,
          color: 'var(--stone)',
          borderLeft: '2px solid var(--deep-green)',
          paddingLeft: '16px',
          margin: '0 0 56px',
        }}
      >
        {t('status')}
      </p>

      {/* Back link */}
      <Link
        href={`/${locale}`}
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '14px',
          fontWeight: 500,
          color: 'var(--deep-green)',
          textDecoration: 'none',
          borderBottom: '1px solid color-mix(in srgb, var(--deep-green) 30%, transparent)',
          paddingBottom: '2px',
          transition: 'border-color 150ms ease',
        }}
      >
        {t('back')}
      </Link>
    </section>
  )
}
