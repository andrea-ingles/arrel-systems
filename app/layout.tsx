import type { Metadata } from 'next'
import { Lora, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import "@/styles/globals.css"

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400', '500', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://arrel.systems'),
  title: {
    default: 'Arrel — Autonomous Food System',
    template: '%s · Arrel',
  },
  description:
    'Designing and building an autonomous circular food system on a Mediterranean finca. Real numbers, honest corrections, monthly documentation.',
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Arrel',
              url: 'https://arrel.systems',
              description:
                'Designing and building an autonomous circular food system on a Mediterranean finca. Real numbers, honest corrections, monthly documentation.',
              sameAs: ['https://youtube.com/@arrel'],
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const stored = localStorage.getItem('arrel-theme')
                if (stored) {
                  document.documentElement.classList.add(stored)
                } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.add('light')
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className={`${lora.variable} ${dmSans.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

