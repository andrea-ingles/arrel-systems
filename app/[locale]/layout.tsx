import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { locales, type Locale } from '@/lib/i18n-config'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SkipLink from '@/components/ui/SkipLink'

interface Props {
  children: React.ReactNode
  params: { locale: string }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'home.hero' })

  const alternates: Record<string, string> = {}
  locales.forEach((l) => {
    alternates[l] = `https://arrel.systems/${l}`
  })

  return {
    alternates: {
      canonical: `https://arrel.systems/${locale}`,
      languages: alternates,
    },
    openGraph: {
      siteName: 'Arrel',
      locale: locale === 'ca' ? 'ca_ES' : locale === 'es' ? 'es_ES' : 'en_GB',
      type: 'website',
      images: [
        {
          url: '/og/default.png',
          width: 1200,
          height: 630,
          alt: 'Arrel — Autonomous Food System',
        },
      ],
    },
  }
}

export default function LocaleLayout({ children, params }: Props) {
  const { locale } = params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const messages = useMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Arrel',
              url: `https://arrel.systems/${locale}`,
              inLanguage: locale === 'ca' ? 'ca' : locale === 'es' ? 'es' : 'en',
            }),
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SkipLink />
          <Header />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

