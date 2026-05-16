import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { locales } from '@/lib/i18n-config'
import SubscribePageClient from './Subscribepageclient'

interface Props {
  params: { locale: string }
}
 
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'subscribe' })
  return {
    title: t('heading'),
    description: t('subheading'),
  }
}

export default function SubscribePage({ params }: Props) {
  setRequestLocale(params.locale)
  return <SubscribePageClient />
}
