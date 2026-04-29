import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { emailZodSchema } from '@/lib/validateEmail'

const resend = new Resend(process.env.RESEND_API_KEY)
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID ?? ''

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  // Server-side validation (cannot be bypassed)
  const parsed = emailZodSchema.safeParse(body)
  if (!parsed.success) {
    console.error('[subscribe] Validation error', parsed.error.flatten())
    return NextResponse.json({ error: 'validation_failed' }, { status: 422 })
  }

  const { email, segment, source, locale } = parsed.data

  try {
    // Check if already subscribed
    const { data: contacts } = await resend.contacts.list({ audienceId: AUDIENCE_ID })
    const existing = contacts?.data?.find((c: any) => c.email === email)

    if (existing && !existing.unsubscribed) {
      return NextResponse.json({ message: 'already_subscribed' }, { status: 409 })
    }

    // Add or re-subscribe contact
    await resend.contacts.create({
      audienceId: AUDIENCE_ID,
      email,
      unsubscribed: false,
    })

    console.info('[subscribe] Success', { source, segment, locale })
    return NextResponse.json({ message: 'subscribed' }, { status: 200 })
  } catch (err: any) {
    console.error('[subscribe] Resend error', err?.message ?? err)
    return NextResponse.json({ error: 'provider_error' }, { status: 500 })
  }
}
