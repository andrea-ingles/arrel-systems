import { getRequestConfig } from 'next-intl/server'
import { locales, defaultLocale } from './lib/i18n-config'

export default getRequestConfig(async ({ locale }) => {
  const safeLocale = locales.includes(locale as typeof locales[number])
    ? locale
    : defaultLocale

  return {
    locale: safeLocale,
    messages: (await import(`./messages/${safeLocale}.json`)).default,
  }
})
