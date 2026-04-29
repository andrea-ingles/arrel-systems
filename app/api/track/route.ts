import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const trackSchema = z.object({
  name: z.string().min(1).max(100),
  props: z.record(z.string()).optional(),
})

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const parsed = trackSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'validation_failed' }, { status: 422 })
  }

  // Server-side event tracking (for events that cannot fire client-side)
  // e.g. purchase confirmations from webhooks
  console.info('[track]', parsed.data.name, parsed.data.props)
  return NextResponse.json({ ok: true })
}
