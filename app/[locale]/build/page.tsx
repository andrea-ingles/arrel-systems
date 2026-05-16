import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { locales } from '@/lib/i18n-config'
import BuildPageClient from './Buildpageclient'

interface Props {
  params: { locale: string }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'build' })
  return {
    title: t('heading'),
    description: t('placeholder'),
    robots: { index: true, follow: true },
  }
}

export default function BuildPage() {
  return <BuildPageClient />
}