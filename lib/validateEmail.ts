import { z } from 'zod'

const emailSchema = z.string().email()

/**
 * Validates an email string.
 * Returns null if valid, an error key string if invalid.
 */
export function validateEmail(email: string): string | null {
  if (!email.trim()) return 'required'
  const result = emailSchema.safeParse(email.trim())
  if (!result.success) return 'invalid'
  return null
}

export const emailZodSchema = z.object({
  email: z.string().email(),
  segment: z.enum(['follow-the-build', 'technical-specs', 'finca-planning']).nullable().optional(),
  source: z.string().optional(),
  locale: z.enum(['en', 'ca', 'fr']).optional(),
})

export type SubscribePayload = z.infer<typeof emailZodSchema>
