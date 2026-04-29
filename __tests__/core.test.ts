import { describe, it, expect } from 'vitest'
import { validateEmail, emailZodSchema } from '../lib/validateEmail'
import { locales, defaultLocale, localeLabels } from '../lib/i18n-config'

// ─── validateEmail ───────────────────────────────────────────

describe('validateEmail', () => {
  it('returns null for a valid email', () => {
    expect(validateEmail('andrea@arrel.systems')).toBeNull()
  })

  it('returns error for missing @ symbol', () => {
    expect(validateEmail('notanemail')).not.toBeNull()
  })

  it('returns error for empty string', () => {
    expect(validateEmail('')).not.toBeNull()
  })

  it('returns error for whitespace-only input', () => {
    expect(validateEmail('   ')).not.toBeNull()
  })

  it('returns null for email with subdomain', () => {
    expect(validateEmail('user@mail.arrel.systems')).toBeNull()
  })

  it('returns error for email with no TLD', () => {
    expect(validateEmail('user@localhost')).not.toBeNull()
  })
})

// ─── emailZodSchema ──────────────────────────────────────────

describe('emailZodSchema', () => {
  it('accepts valid payload with all fields', () => {
    const result = emailZodSchema.safeParse({
      email: 'test@example.com',
      segment: 'technical-specs',
      source: 'homepage-hero',
      locale: 'en',
    })
    expect(result.success).toBe(true)
  })

  it('accepts payload with null segment', () => {
    const result = emailZodSchema.safeParse({
      email: 'test@example.com',
      segment: null,
    })
    expect(result.success).toBe(true)
  })

  it('accepts payload with no optional fields', () => {
    const result = emailZodSchema.safeParse({ email: 'test@example.com' })
    expect(result.success).toBe(true)
  })

  it('rejects invalid email', () => {
    const result = emailZodSchema.safeParse({ email: 'notvalid' })
    expect(result.success).toBe(false)
  })

  it('rejects invalid segment value', () => {
    const result = emailZodSchema.safeParse({
      email: 'test@example.com',
      segment: 'not-a-valid-segment',
    })
    expect(result.success).toBe(false)
  })

  it('rejects invalid locale', () => {
    const result = emailZodSchema.safeParse({
      email: 'test@example.com',
      locale: 'fr',
    })
    expect(result.success).toBe(false)
  })

  it('maps correct segment tags', () => {
    const segments = ['follow-the-build', 'technical-specs', 'finca-planning']
    for (const seg of segments) {
      const result = emailZodSchema.safeParse({ email: 'a@b.com', segment: seg })
      expect(result.success).toBe(true)
    }
  })
})

// ─── i18n config ─────────────────────────────────────────────

describe('i18n-config', () => {
  it('includes en, ca, and es locales', () => {
    expect(locales).toContain('en')
    expect(locales).toContain('ca')
    expect(locales).toContain('es')
  })

  it('default locale is en', () => {
    expect(defaultLocale).toBe('en')
  })

  it('has labels for all locales', () => {
    for (const locale of locales) {
      expect(localeLabels[locale]).toBeTruthy()
    }
  })

  it('locale labels are uppercase abbreviations', () => {
    expect(localeLabels.en).toBe('ENG')
    expect(localeLabels.ca).toBe('CAT')
    expect(localeLabels.es).toBe('ESP')
  })
})
