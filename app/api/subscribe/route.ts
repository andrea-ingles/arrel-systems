import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { emailZodSchema } from '@/lib/validateEmail'

export async function POST(req: NextRequest) {

  // Allow 5 subscription attempts per IP per 10 minutes.
  // Upstash Redis credentials are read from UPSTASH_REDIS_REST_URL and
  // UPSTASH_REDIS_REST_TOKEN environment variables (see .env.example).
  const resend = new Resend(process.env.RESEND_API_KEY)
  const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID ?? ''
  const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, '10 m'),
    analytics: false,
  })


  // ── Rate limiting ────────────────────────────────────────────
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anonymous'

  const { success } = await ratelimit.limit(ip)
  if (!success) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
  }

  // ── Parse body ───────────────────────────────────────────────
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  // ── Server-side validation (cannot be bypassed) ──────────────
  const parsed = emailZodSchema.safeParse(body)
  if (!parsed.success) {
    console.error('[subscribe] Validation error', parsed.error.flatten())
    return NextResponse.json({ error: 'validation_failed' }, { status: 422 })
  }

  const { email, segment, source, locale } = parsed.data

  try {
    // Check if already subscribed
    const { data: contacts, error: listError } = await resend.contacts.list({ audienceId: AUDIENCE_ID })

    if (listError) {
      console.error('[subscribe] Failed to list contacts', listError)
      return NextResponse.json({ error: 'provider_error' }, { status: 500 })
    }

    // Resend SDK does not export a named Contact type at the top level;
    // we inline the minimal shape we need here.
    const existing = contacts?.data?.find(
      (c: { email: string; unsubscribed: boolean }) => c.email === email
    )

    if (existing && !existing.unsubscribed) {
      return NextResponse.json({ message: 'already_subscribed' }, { status: 409 })
    }

    // Add or re-subscribe contact
    const { error: createError } = await resend.contacts.create({
      audienceId: AUDIENCE_ID,
      email,
      unsubscribed: false,
    })

    if (createError) {
      console.error('[subscribe] Failed to create contact', createError)
      return NextResponse.json({ error: 'provider_error' }, { status: 500 })
    }

    console.info('[subscribe] Success', { source, segment, locale })
    return NextResponse.json({ message: 'subscribed' }, { status: 200 })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[subscribe] Resend error', message)
    return NextResponse.json({ error: 'provider_error' }, { status: 500 })
  }
}
