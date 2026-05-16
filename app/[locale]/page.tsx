import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { locales } from '@/lib/i18n-config'
import HomePageClient from './Homepageclient'

interface Props {
  params: { locale: string }
}
 
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'home.hero' })
  return {
    title: 'Arrel — Autonomous Food System',
    description: t('proposition'),
  }
}

export default function HomePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale)
  return <HomePageClient />
     
}
