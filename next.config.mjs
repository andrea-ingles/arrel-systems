import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  experimental: {
    typedRoutes: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Prevent the site from being embedded in iframes (clickjacking)
          { key: 'X-Frame-Options', value: 'DENY' },
          // Prevent MIME-type sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Send full URL only to same-origin requests; only origin to cross-origin
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Disable browser features not used by this site
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // TODO Sprint 2: Add Content-Security-Policy once Plausible, Vercel Analytics,
          // and inline JSON-LD scripts are inventoried. Inline scripts require 'unsafe-inline'
          // or nonces — resolve before enabling CSP.
        ],
      },
    ]
  },
}

export default withNextIntl(nextConfig)
