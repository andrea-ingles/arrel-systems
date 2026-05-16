export const locales = ['ca', 'en', 'fr'] as const
export type Locale = typeof locales[number]
export const defaultLocale: Locale = 'ca'

export const localeLabels: Record<Locale, string> = {
  ca: 'CAT',
  en: 'ENG',
  fr: 'FRA',
}

export const localeNames: Record<Locale, string> = {
  ca: 'Català',
  en: 'English',
  fr: 'Français',
}
