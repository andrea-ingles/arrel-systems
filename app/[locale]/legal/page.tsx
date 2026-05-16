import type { Metadata } from 'next'
import { locales } from '@/lib/i18n-config'
import { setRequestLocale } from 'next-intl/server'

// TODO i18n: Legal page body is currently English-only. Full translation
// (ca + es) is deferred until native-speaker review of legal copy is complete.
// generateMetadata below is already locale-aware.

interface Props {
  params: { locale: string }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params

  const titles: Record<string, string> = {
    ca: 'Legal i Privacitat',
    es: 'Legal y Privacidad',
    en: 'Legal & Privacy',
  }
  const descriptions: Record<string, string> = {
    ca: 'Política de privacitat i informació legal per a arrel.systems.',
    es: 'Política de privacidad e información legal para arrel.systems.',
    en: 'Privacy policy and legal information for arrel.systems.',
  }

  const languages: Record<string, string> = {}
  locales.forEach((l) => {
    languages[l] = `https://arrel.systems/${l}/legal`
  })

  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `https://arrel.systems/${locale}/legal`,
      languages,
    },
  }
}

export default function LegalPage({ params }: Props) {
  setRequestLocale(params.locale)
  return (
    <section
      aria-labelledby="legal-heading"
      style={{
        paddingTop: 'calc(56px + 80px)',
        paddingBottom: '80px',
        paddingLeft: '24px',
        paddingRight: '24px',
        maxWidth: '680px',
        margin: '0 auto',
      }}
    >
      <h1
        id="legal-heading"
        style={{
          fontFamily: 'var(--font-lora)',
          fontSize: 'clamp(28px, 3.5vw, 40px)',
          fontWeight: 700,
          lineHeight: 1.2,
          color: 'var(--text)',
          margin: '0 0 40px',
        }}
      >
        Legal &amp; Privacy
      </h1>

      {/* Contact */}
      <div style={{ marginBottom: '48px' }}>
        <h2
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--stone)',
            margin: '0 0 16px',
          }}
        >
          Contact
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-lora)',
            fontSize: '17px',
            lineHeight: 1.65,
            color: 'var(--text)',
            margin: '0 0 8px',
          }}
        >
          Arrel · arrel.systems
        </p>
        <p
          style={{
            fontFamily: 'var(--font-lora)',
            fontSize: '17px',
            lineHeight: 1.65,
            color: 'var(--text)',
            margin: 0,
          }}
        >
          Email:{' '}
          <a
            href="mailto:andrea@arrel.systems"
            style={{ color: 'var(--deep-green)' }}
          >
            andrea@arrel.systems
          </a>
        </p>
      </div>

      {/* Privacy Policy */}
      <div style={{ marginBottom: '48px' }}>
        <h2
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--stone)',
            margin: '0 0 16px',
          }}
        >
          Privacy Policy
        </h2>

        {[
          {
            heading: 'Who we are',
            body: 'Arrel (arrel.systems) is an independent media project documenting the design and construction of an autonomous food system on a Mediterranean finca. It is not a registered company. The responsible person for data processing is the project operator, reachable at andrea@arrel.systems.',
          },
          {
            heading: 'What data we collect',
            body: 'When you subscribe to the newsletter, we collect your email address and, optionally, your stated interest segment (follow / engineering / planning). We do not collect names unless you provide one. We do not collect payment data on this site.',
          },
          {
            heading: 'How we use it',
            body: 'Your email address is used exclusively to send the Arrel newsletter. We do not sell, rent, or share subscriber data with third parties. We do not use subscriber data for advertising or profiling.',
          },
          {
            heading: 'Data processor',
            body: 'Subscriber data is stored and processed by Resend (resend.com), an email delivery service. Resend acts as a data processor under GDPR. Their privacy policy is available at resend.com/legal/privacy-policy.',
          },
          {
            heading: 'Analytics',
            body: 'This site uses Plausible Analytics (plausible.io), a privacy-respecting analytics tool that does not use cookies and does not track individuals across sites. No personal data is collected by analytics. Vercel Analytics may also collect aggregate performance data.',
          },
          {
            heading: 'Your rights',
            body: "Under GDPR and Spain's LOPDGDD, you have the right to access, rectify, or erase your personal data. To unsubscribe or request deletion of your data, email andrea@arrel.systems or use the unsubscribe link in any newsletter. We will process your request within 30 days.",
          },
          {
            heading: 'Cookies',
            body: 'This site stores one functional value in localStorage: your theme preference (light or dark mode). This is not a tracking cookie. No advertising or third-party cookies are set.',
          },
          {
            heading: 'Changes to this policy',
            body: 'If this policy changes materially, we will note the update date below. Continued use of the site after a change constitutes acceptance.',
          },
        ].map(({ heading, body }) => (
          <div key={heading} style={{ marginBottom: '28px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '15px',
                fontWeight: 600,
                color: 'var(--text)',
                margin: '0 0 8px',
              }}
            >
              {heading}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-lora)',
                fontSize: '17px',
                lineHeight: 1.65,
                color: 'var(--text)',
                margin: 0,
              }}
            >
              {body}
            </p>
          </div>
        ))}

        <p
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '13px',
            color: 'var(--stone)',
            marginTop: '32px',
          }}
        >
          Last updated: April 2026
        </p>
      </div>
    </section>
  )
}
