import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import HomePageClient from './Homepageclient'

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'home.hero' })
  return {
    title: 'Arrel — Autonomous Food System',
    description: t('proposition'),
  }
}

export default function HomePage() {

  return <HomePageClient />
     
}
