import { MetadataRoute } from 'next'
import { locales } from '@/lib/i18n-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://arrel.systems'
  const staticPages = ['', '/build', '/project', '/subscribe', '/legal']
  const now = new Date()

  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: now,
        changeFrequency: page === '' || page === '/build' ? 'weekly' : page === '/legal' ? 'yearly' : 'monthly',
        priority: page === '' ? 1.0 : page === '/build' ? 0.9 : page === '/legal' ? 0.3 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${page}`])
          ),
        },
      })
    }
  }

  return entries
}
