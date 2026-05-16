'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { trackEvent } from '@/lib/analytics'
import SubscribeForm from '@/components/ui/SubscribeForm'
import ScrollDepthTracker from '@/components/ui/ScrollDepthTracker'


export default function HomePageClient() {
  const t = useTranslations('home')
  const locale = useLocale()

  return (
    <>
      <ScrollDepthTracker />

      {/* ── Section 1: Hero ── */}
      <section
        aria-label="Introduction"
        style={{
          minHeight: '100dvh',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          paddingTop: '56px', // header height
        }}
        className="hero-grid"
      >
        {/* Text block */}
        <div
          style={{
            padding: '80px 48px 80px 24px',
            maxWidth: '600px',
            justifySelf: 'end',
          }}
          className="hero-text"
        >
          <h1
            style={{
              fontFamily: 'var(--font-lora)',
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.005em',
              color: 'var(--terracotta)',
              margin: '0 0 20px',
            }}
          >
            {t('hero.proposition')}
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '16px',
              fontWeight: 400,
              color: 'var(--stone)',
              margin: '0 0 36px',
              lineHeight: 1.5,
            }}
          >
            {t('hero.sub')}
          </p>

          {/* Primary CTA */}
          <Link
            href={`/${locale}/build`}
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '15px',
              fontWeight: 500,
              color: 'var(--deep-green)',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              marginBottom: '24px',
              transition: 'color 150ms ease',
            }}
            onClick={() => trackEvent('CTAClick', { position: 'hero', type: 'read-build-log' })}
          >
            {t('hero.cta_primary')}
          </Link>

          {/* Secondary CTA — email form */}
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <SubscribeForm variant="inline" source="homepage-hero" />
            </div>
            <p
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '12px',
                fontWeight: 300,
                color: 'var(--stone)',
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {t('hero.cta_email_note')}
            </p>
          </div>
        </div>

        {/* Photograph placeholder */}
        <div
          aria-hidden="true"
          className="hero-image"
          style={{
            height: '100dvh',
            backgroundColor: 'var(--surface)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Placeholder until real finca photography exists */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, var(--deep-green) 0%, color-mix(in srgb, var(--deep-green) 40%, var(--bone)) 60%, var(--morning-gold) 100%)',
              opacity: 0.4,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--stone)',
                opacity: 0.6,
              }}
            >
              Photography — Phase 0
            </span>
          </div>
        </div>
      </section>

      {/* ── Section 2: What Arrel Is ── */}
      <section
        aria-label="About the project"
        style={{
          padding: 'var(--spacing-section) 24px',
          maxWidth: '740px',
          margin: '0 auto',
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
          {t('what.label')}
        </p>

        <h2
          style={{
            fontFamily: 'var(--font-lora)',
            fontSize: 'clamp(28px, 3vw, 36px)',
            fontWeight: 700,
            lineHeight: 1.2,
            color: 'var(--text)',
            margin: '0 0 28px',
          }}
        >
          {t('what.heading')}
        </h2>

        {['body_1', 'body_2', 'body_3'].map((key) => (
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
            {t(`what.${key}`)}
          </p>
        ))}
      </section>

      {/* ── Section 3: Live System Metrics ── */}
      <section
        aria-label="Live system data"
        style={{
          backgroundColor: 'var(--deep-green)',
          padding: '56px 24px',
        }}
        className="metrics-section"
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--morning-gold)',
              marginBottom: '32px',
              textAlign: 'center',
            }}
          >
            {t('metrics.label')}
          </p>

          {/* Placeholder state — system not yet running */}
          <p
            style={{
              fontFamily: 'var(--font-lora)',
              fontSize: '17px',
              color: 'color-mix(in srgb, var(--bone) 70%, transparent)',
              textAlign: 'center',
              maxWidth: '480px',
              margin: '0 auto',
              lineHeight: 1.65,
            }}
          >
            {t('metrics.updated')}
          </p>
        </div>
      </section>

      {/* ── Section 4: Content Preview Cards ── */}
      <section
        aria-label="Content preview"
        style={{
          padding: 'var(--spacing-section) 24px',
          maxWidth: '1080px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {/* Card 1 — Build log */}
          <article
            style={{
              border: '1px solid var(--border)',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            {/* Thumbnail placeholder */}
            <div
              aria-hidden="true"
              style={{
                height: '180px',
                backgroundColor: 'var(--surface)',
                borderBottom: '4px solid var(--stone)',
                position: 'relative',
              }}
            >
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', backgroundColor: 'var(--stone)' }} />
            </div>
            <div style={{ padding: '24px' }}>
              <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--deep-green)', margin: '0 0 12px' }}>
                {t('cards.build_label')}
              </p>
              <h3 style={{ fontFamily: 'var(--font-lora)', fontSize: '20px', fontWeight: 700, lineHeight: 1.3, color: 'var(--text)', margin: '0 0 10px' }}>
                {t('cards.build_title')}
              </h3>
              <p style={{ fontFamily: 'var(--font-lora)', fontSize: '15px', lineHeight: 1.5, color: 'var(--stone)', margin: '0 0 20px' }}>
                {t('cards.build_excerpt')}
              </p>
              <Link
                href={`/${locale}/build`}
                style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '14px', fontWeight: 500, color: 'var(--deep-green)', textDecoration: 'none' }}
                onClick={() => trackEvent('ContentCardClick', { card: 'build-log', position: 'homepage-preview' })}
              >
                {t('cards.build_link')}
              </Link>
            </div>
          </article>

          {/* Card 2 — Technical */}
          <article
            style={{
              border: '1px solid var(--border)',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <div
              aria-hidden="true"
              style={{
                height: '180px',
                backgroundColor: 'var(--surface)',
                borderBottom: '4px solid var(--water-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
              }}
            >
              {/* Diagram placeholder */}
              <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px', padding: '16px' }}>
                {[85, 45, 71].map((val, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '11px', color: 'var(--stone)', width: '32px' }}>{val}%</span>
                    <div style={{ flex: 1, height: '6px', backgroundColor: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${val}%`, backgroundColor: i === 2 ? 'var(--deep-green)' : i === 0 ? 'var(--stone)' : 'var(--terracotta)', borderRadius: '3px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: '24px' }}>
              <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--water-blue)', margin: '0 0 12px' }}>
                {t('cards.technical_label')}
              </p>
              <h3 style={{ fontFamily: 'var(--font-lora)', fontSize: '20px', fontWeight: 700, lineHeight: 1.3, color: 'var(--text)', margin: '0 0 10px' }}>
                {t('cards.technical_title')}
              </h3>
              <p style={{ fontFamily: 'var(--font-lora)', fontSize: '15px', lineHeight: 1.5, color: 'var(--stone)', margin: '0 0 20px' }}>
                {t('cards.technical_excerpt')}
              </p>
              <Link
                href={`/${locale}/project`}
                style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '14px', fontWeight: 500, color: 'var(--deep-green)', textDecoration: 'none' }}
                onClick={() => trackEvent('ContentCardClick', { card: 'featured-technical', position: 'homepage-preview' })}
              >
                {t('cards.technical_link')}
              </Link>
            </div>
          </article>

          {/* Card 3 — Newsletter */}
          <article
            style={{
              backgroundColor: 'var(--deep-green)',
              borderRadius: '4px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--morning-gold)', margin: 0 }}>
              {t('cards.newsletter_label')}
            </p>
            <h3 style={{ fontFamily: 'var(--font-lora)', fontSize: '20px', fontWeight: 700, lineHeight: 1.3, color: 'var(--bone)', margin: 0 }}>
              {t('cards.newsletter_title')}
            </h3>
            <p style={{ fontFamily: 'var(--font-lora)', fontSize: '15px', lineHeight: 1.5, color: 'color-mix(in srgb, var(--bone) 75%, transparent)', margin: 0, flex: 1 }}>
              {t('cards.newsletter_excerpt')}
            </p>
            <SubscribeForm variant="inline" source="homepage-card" />
          </article>
        </div>
      </section>

      {/* ── Section 5: The Thesis ── */}
      <section
        aria-label="Project rationale"
        style={{
          padding: 'var(--spacing-section) 24px',
          maxWidth: '680px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-lora)',
            fontSize: 'clamp(18px, 2.2vw, 22px)',
            lineHeight: 1.7,
            color: 'var(--text)',
            margin: '0 0 24px',
          }}
        >
          {t('thesis.body')}
        </p>
        <Link
          href={`/${locale}/project`}
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '15px',
            fontWeight: 500,
            color: 'var(--deep-green)',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
          }}
        >
          {t('thesis.link')}
        </Link>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-image {
            display: none !important;
          }
          .hero-text {
            padding: 80px 24px 60px !important;
            justify-self: start !important;
            max-width: 100% !important;
          }
          .metrics-section .metrics-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        :root {
          --spacing-section: 80px;
        }
        @media (max-width: 640px) {
          :root { --spacing-section: 56px; }
        }
      `}</style>
    </>
  )
}