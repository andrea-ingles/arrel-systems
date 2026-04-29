'use client'

import { useState, useId } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { validateEmail } from '@/lib/validateEmail'

type Segment = 'follow-the-build' | 'technical-specs' | 'finca-planning' | null

interface SubscribeFormProps {
  variant?: 'inline' | 'segmented'
  source?: string
}

export default function SubscribeForm({
  variant = 'inline',
  source = 'homepage',
}: SubscribeFormProps) {
  const t = useTranslations('subscribe')
  const locale = useLocale()
  const emailId = useId()
  const errorId = useId()

  const [email, setEmail] = useState('')
  const [segment, setSegment] = useState<Segment>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle')
  const [clientError, setClientError] = useState('')

  const handleSubmit = async () => {
    // Client-side validation
    const emailError = validateEmail(email)
    if (emailError) {
      setClientError(t('form_invalid_email'))
      return
    }
    setClientError('')
    setStatus('loading')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, segment, source, locale }),
      })
      const data = await res.json()

      if (res.status === 409) {
        setStatus('duplicate')
      } else if (res.ok) {
        setStatus('success')
        // Fire Plausible event
        if (typeof window !== 'undefined' && (window as any).plausible) {
          ;(window as any).plausible('EmailCapture', {
            props: { segment: segment ?? 'none', source, page: window.location.pathname },
          })
        }
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const error = clientError
  const isLoading = status === 'loading'

  if (status === 'success') {
    return (
      <p
        role="status"
        style={{
          fontFamily: 'var(--font-lora)',
          fontSize: '17px',
          color: 'var(--deep-green)',
          margin: 0,
        }}
      >
        {t('form_success')}
      </p>
    )
  }

  if (status === 'duplicate') {
    return (
      <p
        role="status"
        style={{
          fontFamily: 'var(--font-lora)',
          fontSize: '17px',
          color: 'var(--deep-green)',
          margin: 0,
        }}
      >
        {t('form_duplicate')}
      </p>
    )
  }

  return (
    <div style={{ width: '100%' }}>
      {/* Segmented audience cards */}
      {variant === 'segmented' && (
        <div
          role="group"
          aria-label={t('segment_label')}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
            marginBottom: '28px',
          }}
        >
          {(
            [
              { key: 'follow-the-build' as Segment, heading: t('segment_follow_heading'), body: t('segment_follow_body'), color: 'var(--deep-green)' },
              { key: 'technical-specs' as Segment, heading: t('segment_technical_heading'), body: t('segment_technical_body'), color: 'var(--water-blue)' },
              { key: 'finca-planning' as Segment, heading: t('segment_planning_heading'), body: t('segment_planning_body'), color: 'var(--terracotta)' },
            ] as const
          ).map(({ key, heading, body, color }) => (
            <button
              key={key}
              onClick={() => setSegment(segment === key ? null : key)}
              aria-pressed={segment === key}
              style={{
                textAlign: 'left',
                padding: '20px',
                backgroundColor: 'var(--bg)',
                border: `2px solid ${segment === key ? color : 'var(--border)'}`,
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'border-color 150ms ease',
              }}
            >
              <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '15px', fontWeight: 600, color: 'var(--text)', margin: '0 0 8px' }}>
                {heading}
              </p>
              <p style={{ fontFamily: 'var(--font-lora)', fontSize: '14px', color: 'var(--stone)', margin: 0, lineHeight: 1.5 }}>
                {body}
              </p>
            </button>
          ))}
        </div>
      )}

      {/* Email form */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ flex: 1, minWidth: '200px' }}>
          <label htmlFor={emailId} style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
            Email
          </label>
          <input
            id={emailId}
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (clientError) setClientError('')
              if (status === 'error') setStatus('idle')
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder={t('form_email_placeholder')}
            disabled={isLoading}
            autoComplete="email"
            aria-describedby={error ? errorId : undefined}
            aria-invalid={!!error}
            style={{
              width: '100%',
              height: '40px',
              padding: '0 12px',
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '14px',
              color: 'var(--text)',
              backgroundColor: 'var(--bg)',
              border: `1px solid ${error ? 'var(--terracotta)' : 'var(--stone)'}`,
              borderRadius: '8px',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 150ms ease',
            }}
            onFocus={e => { if (!error) e.currentTarget.style.borderColor = 'var(--deep-green)' }}
            onBlur={e => { if (!error) e.currentTarget.style.borderColor = 'var(--stone)' }}
          />
          {error && (
            <p
              id={errorId}
              role="alert"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '13px',
                color: 'var(--terracotta)',
                margin: '4px 0 0',
              }}
            >
              {error}
            </p>
          )}
          {status === 'error' && !clientError && (
            <p
              role="alert"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '13px',
                color: 'var(--terracotta)',
                margin: '4px 0 0',
              }}
            >
              {t('form_error')}
            </p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          style={{
            height: '40px',
            padding: '0 20px',
            backgroundColor: isLoading ? 'var(--stone)' : 'var(--terracotta)',
            color: 'var(--bone)',
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '14px',
            fontWeight: 600,
            border: 'none',
            borderRadius: '8px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'background-color 150ms ease',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
          aria-busy={isLoading}
        >
          {isLoading ? '···' : (variant === 'segmented' ? t('form_submit') : t('segment_follow_heading').split(' ')[0] === 'I' ? 'Follow the build' : t('form_submit'))}
        </button>
      </div>
    </div>
  )
}
