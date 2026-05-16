export const locales = ['en', 'ca', 'es'] as const
export type Locale = typeof locales[number]
export const defaultLocale: Locale = 'ca'

export const localeLabels: Record<Locale, string> = {
  en: 'ENG',
  ca: 'CAT',
  es: 'ESP',
}

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ca: 'Català',
  es: 'Español',
}
