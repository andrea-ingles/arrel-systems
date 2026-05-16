import { useTranslations, useLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import SubscribeForm from '@/components/ui/SubscribeForm'
import ScrollDepthTracker from '@/components/ui/ScrollDepthTracker'

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'subscribe' })
  return {
    title: t('heading'),
    description: t('subheading'),
  }
}

export default function SubscribePage() {
  const t = useTranslations('subscribe')

  return (
    <>
      <ScrollDepthTracker />

      {/* ── Section 1: Header ── */}
      <section
        aria-labelledby="subscribe-heading"
        style={{
          paddingTop: 'calc(56px + 80px)',
          paddingBottom: '80px',
          paddingLeft: '24px',
          paddingRight: '24px',
          maxWidth: '680px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--stone)',
            marginBottom: '16px',
          }}
        >
          {t('label')}
        </p>

        <h1
          id="subscribe-heading"
          style={{
            fontFamily: 'var(--font-lora)',
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 700,
            lineHeight: 1.15,
            color: 'var(--text)',
            margin: '0 0 20px',
          }}
        >
          {t('heading')}
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-lora)',
            fontSize: '20px',
            lineHeight: 1.5,
            color: 'var(--stone)',
            margin: 0,
            maxWidth: '55ch',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {t('subheading')}
        </p>
      </section>

      {/* ── Section 2: What You Receive ── */}
      <section
        aria-labelledby="what-label"
        style={{
          padding: '0 24px 80px',
          maxWidth: '960px',
          margin: '0 auto',
        }}
      >
        <p
          id="what-label"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--stone)',
            marginBottom: '24px',
            textAlign: 'center',
          }}
        >
          {t('what_label')}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
          }}
        >
          {(
            [
              { labelKey: 'what_technical_label', bodyKey: 'what_technical_body', color: 'var(--water-blue)' },
              { labelKey: 'what_build_label', bodyKey: 'what_build_body', color: 'var(--terracotta)' },
              { labelKey: 'what_data_label', bodyKey: 'what_data_body', color: 'var(--stone)' },
            ] as const
          ).map(({ labelKey, bodyKey, color }) => (
            <div
              key={labelKey}
              style={{
                padding: '28px',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                borderTop: `3px solid ${color}`,
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--text)',
                  margin: '0 0 12px',
                }}
              >
                {t(labelKey)}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-lora)',
                  fontSize: '16px',
                  lineHeight: 1.6,
                  color: 'var(--stone)',
                  margin: 0,
                }}
              >
                {t(bodyKey)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 3 + 4: Audience Cards + Form ── */}
      <section
        aria-labelledby="segment-label"
        style={{
          padding: '60px 24px',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <p
          id="segment-label"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--stone)',
            marginBottom: '8px',
            textAlign: 'center',
          }}
        >
          {t('segment_label')}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '13px',
            color: 'var(--stone)',
            textAlign: 'center',
            marginBottom: '32px',
          }}
        >
          {t('segment_sub')}
        </p>

        <SubscribeForm variant="segmented" source="subscribe-page" />

        <p
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '13px',
            fontWeight: 300,
            color: 'var(--stone)',
            textAlign: 'center',
            marginTop: '16px',
          }}
        >
          {t('form_note')}
        </p>
      </section>

      {/* ── Section 5: Issue 001 Preview ── */}
      <section
        aria-labelledby="preview-label"
        style={{
          padding: '60px 24px',
          backgroundColor: 'color-mix(in srgb, var(--stone) 8%, var(--bg))',
        }}
      >
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <p
            id="preview-label"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--stone)',
              marginBottom: '16px',
            }}
          >
            {t('preview_label')}
          </p>

          <h2
            style={{
              fontFamily: 'var(--font-lora)',
              fontSize: 'clamp(22px, 2.5vw, 28px)',
              fontWeight: 700,
              lineHeight: 1.3,
              color: 'var(--text)',
              margin: '0 0 28px',
            }}
          >
            {t('preview_heading')}
          </h2>

          {(['preview_body_1', 'preview_body_2', 'preview_body_3', 'preview_body_4'] as const).map((key) => (
            <p
              key={key}
              style={{
                fontFamily: 'var(--font-lora)',
                fontSize: '17px',
                lineHeight: 1.65,
                color: 'var(--text)',
                margin: '0 0 20px',
              }}
            >
              {t(key)}
            </p>
          ))}

          <p
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--deep-green)',
              marginTop: '8px',
            }}
          >
            {t('preview_link')}
          </p>
        </div>
      </section>

      {/* ── Section 6: Frequency ── */}
      <section
        aria-labelledby="frequency-label"
        style={{
          padding: '60px 24px',
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <p
          id="frequency-label"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--stone)',
            marginBottom: '24px',
          }}
        >
          {t('frequency_label')}
        </p>

        {(['frequency_body_1', 'frequency_body_2', 'frequency_body_3'] as const).map((key, i) => (
          <p
            key={key}
            style={{
              fontFamily: 'var(--font-lora)',
              fontSize: '17px',
              lineHeight: 1.65,
              color: i === 2 ? 'var(--text)' : 'var(--stone)',
              margin: '0 0 16px',
              fontStyle: i === 2 ? 'italic' : 'normal',
            }}
          >
            {t(key)}
          </p>
        ))}
      </section>
    </>
  )
}
