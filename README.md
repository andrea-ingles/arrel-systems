# arrel-systems
### **The digital foundation for an autonomous Mediterranean food system.**

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-B5532A.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Framework: Next-intl.js](https://img.shields.io/badge/Framework-Next.js%2015-black)](https://nextjs.org/)
[![Style: Tailwind v4](https://img.shields.io/badge/Style-Tailwind%20v4-38bdf8)](https://tailwindcss.com/)


---
## 1. Thesis
Most food systems are opaque, fragile, and disconnected from the people they sustain. **arrel** (Catalan for *root*) is a project designed to restore that connection through engineering rigour and Mediterranean design.

This repository houses the documentation platform and operational dashboard for the arrel finca. It is built to be as autonomous and resilient as the biological systems it monitors.

## 2. System Architecture
In line with our value of **Autonomy as the measure of success**, we have selected a "decoupled" stack. This ensures that the system is modular, secure, and independent of any single "walled garden."

* **Frontend:** [Next.js](https://nextjs.org/) (App Router) — chosen for performance and SEO.

* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) — using a formalized palette derived from the finca’s physical environment (Bone, Terracotta, Deep Green).

* **Deployment:** [Vercel](https://vercel.com) — providing global edge delivery and automated security.

* **Database (Planned):** [Neon.tech](https://neon.tech) — serverless Postgres with branching capabilities for experimental data.

* **Auth** (Planned): [Clerk](https://clerk.com) — outsourced security for user session management.

## 3. Brand Identity (The Design System)
The visual layer of this platform is not a decoration; it is an argument for beautiful living.

* **Colors:** Based on the steady-state Mediterranean landscape.
  * `#F2EDE4` (Bone): The neutral surface of morning light.
  * `#B5532A` (Terracotta): The primary accent, rooted in earth and baked clay.

* **Typography:**
  * **Lora:** Editorial warmth for documentation and narrative.
  * **DM Sans:** Technical precision for sensor data and UI.

## 4. Intellectual Honesty & Roadmap
We do not perform competence we don't have. This project is currently in **Phase 0: The Seed**.

* [x] Establish brand identity and core values.
* [x] Deploy "Coming Soon" landing page via Vercel.
* [ ] Integrate localized documentation for English, Catalan, Spanish, and French.
* [ ] Implement the Operational Task Register (the benchmark for future agricultural robotics).
* [ ] Build real-time sensor dashboards for the finca's autonomous loops.

## 5. Prerequisites

- Node.js `>=20.0.0`
- `pnpm` (recommended) — `npm install -g pnpm`
- Accounts required: Vercel, Resend, Plausible
- Phase 0 optional: Home Assistant (live metrics)
- Phase 2+ required: Clerk, Lemon Squeezy, Neon

## 6. Local setup

```bash
git clone https://github.com/your-handle/arrel.git
cd arrel
pnpm install
cp .env.example .env.local
# Fill in .env.local — minimum required: RESEND_API_KEY, RESEND_AUDIENCE_ID
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The middleware will redirect `/` → `/en`.

---

## 7. Environment variables

See `.env.example` for all variables with comments explaining each one and where to get it.

**Minimum for Phase 0 to function:**
- `RESEND_API_KEY` — newsletter subscriptions will fail without this
- `RESEND_AUDIENCE_ID` — required by the subscribe API route

All other variables can be left empty in Phase 0. Missing Clerk/Neon/LS vars are safe to omit — those features are not built yet.

---

## 8. Project structure

```
arrel/
├── app/
│   ├── layout.tsx              # Root layout — font loading, Vercel Analytics
│   ├── page.tsx                # Root redirect → /en
│   ├── sitemap.ts              # Auto-generated sitemap (all pages × 3 locales)
│   ├── api/
│   │   ├── subscribe/          # POST — email capture, Resend integration
│   │   └── track/              # POST — server-side event tracking
│   └── [locale]/
│       ├── layout.tsx          # Locale layout — HTML lang, next-intl provider
│       ├── page.tsx            # Homepage
│       ├── not-found.tsx       # 404 page
│       ├── build/              # Build log feed (Sprint 2)
│       ├── project/            # System overview (Sprint 2)
│       └── subscribe/          # Newsletter subscribe page
│           └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Sticky header — scroll hide/show, mobile menu, lang toggle
│   │   └── Footer.tsx          # Minimal footer
│   └── ui/
│       ├── ArrelLogo.tsx       # SVG wordmark with descender element
│       ├── ThemeToggle.tsx     # Dark/light toggle — persists to localStorage
│       ├── SkipLink.tsx        # Accessibility skip-to-content
│       ├── SubscribeForm.tsx   # Email form — inline and segmented variants
│       └── ScrollDepthTracker.tsx  # Fires Plausible ScrollDepth events
├── lib/
│   ├── i18n-config.ts          # Locale list, labels, default locale
│   └── validateEmail.ts        # Zod schema + validateEmail() utility
├── messages/
│   ├── en.json                 # English copy (source)
│   ├── ca.json                 # Catalan copy (fill in translations)
│   └── es.json                 # Spanish copy (fill in translations)
├── styles/
│   └── globals.css             # CSS tokens, dark mode, base resets
├── public/
│   ├── robots.txt
│   └── llms.txt                # AI agent discoverability
├── __tests__/
│   └── core.test.ts            # Unit tests — validateEmail, i18n-config, Zod schema
├── i18n.ts                     # next-intl request config
├── middleware.ts               # Locale detection and routing
├── .env.example                # All required env vars with comments
└── vitest.config.ts            # Test configuration
```

---

## 9. Running tests

```bash
pnpm test          # Run all unit tests
pnpm test:ui       # Vitest UI (browser-based test runner)
pnpm typecheck     # TypeScript type check without build
```

---

## 10. Adding content (Phase 0 — MDX)

Build entries are MDX files in `/content/build/`. Frontmatter schema:

```mdx
---
title: "Phase −1: documenting before anything is built"
date: "2025-01-15"
phase: -1
slug: "phase-minus-1-media-infrastructure"
excerpt: "Why the media infrastructure comes first, and what the indoor proof-of-concept will prove."
---

Content here...
```

Required fields: `title`, `date`, `phase`, `slug`, `excerpt`
Optional: `thumbnail` (path to image in `/public/images/`)

The build page (Sprint 2) will read these files and render the feed.

---

## 11. Instrumentation map

Every Plausible custom event fired in this codebase:

| Event | Component | Props | Decision informed |
|---|---|---|---|
| `ScrollDepth` | `ScrollDepthTracker` | `depth` (25/50/75/90), `page` | Where visitors lose interest |
| `EmailCapture` | `SubscribeForm` | `segment`, `source`, `page` | Subscription conversion by source and segment |
| `CTAClick` | `app/[locale]/page.tsx` | `position`, `type` | Hero CTA effectiveness |
| `ContentCardClick` | `app/[locale]/page.tsx` | `card`, `position` | Which content type drives navigation |
| `AudienceCardSelected` | `SubscribeForm` | `segment` | Audience segment distribution |

To add a new event:
```javascript
if (typeof window !== 'undefined' && (window as any).plausible) {
  ;(window as any).plausible('EventName', { props: { key: 'value' } })
}
```

Plausible script is loaded via the `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` env var. Add this to `app/layout.tsx` `<head>` when the domain is live:
```html
<script defer data-domain="arrel.systems" src="https://plausible.io/js/script.js"></script>
```

---

## 12. Deployment

```bash
pnpm build   # Verify build passes before pushing
git push origin main   # Vercel deploys automatically
```

Required Vercel environment variables (set in dashboard before first deploy):
- `RESEND_API_KEY`
- `RESEND_AUDIENCE_ID`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`

Optional (Phase 0):
- `HOME_ASSISTANT_URL`
- `HOME_ASSISTANT_TOKEN`

---

## 13. Known issues and intentional decisions

- **`[locale]` layout renders a second `<html>` tag**: Next.js App Router with next-intl requires the locale layout to set `lang` on `<html>`. The root `app/layout.tsx` also has an `<html>` tag for the theme-detection script. This is a known next-intl pattern — the root layout's `<html>` is replaced by the locale layout's in practice. Monitor for React hydration warnings; resolve in Sprint 2 if needed.

- **Stone (#8A8278) fails WCAG AA contrast for body text**: Intentional. Stone is used exclusively for supplementary text (captions, metadata, labels). Never for primary content. If Stone appears on primary content, it is a bug.

- **CA and ES translations contain `[CA]` and `[ES]` prefixes**: These are placeholder markers for untranslated strings. Replace with final translations before launch. Search for `[CA]` and `[ES]` to find all pending translations.

- **SubscribeForm segment button submit label**: Currently uses a fallback string. Refine in Sprint 1.5 after translations are finalised.

---

## 14. Phase upgrade notes

**Activating Clerk (Phase 2):**
- Add `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` to env
- Wrap `app/[locale]/layout.tsx` with `<ClerkProvider>`
- Update middleware to check Clerk session for protected routes
- Add Clerk webhook handler at `/api/webhooks/clerk` to sync users to Neon

**Adding Lemon Squeezy (Phase 2):**
- Add purchase page at `/app/[locale]/docs/page.tsx`
- Add webhook handler at `/api/webhooks/lemonsqueezy/route.ts`
- On purchase confirmation: update Clerk user metadata with purchased product IDs
- Gate content routes in middleware using Clerk metadata

**Replacing MDX with Sanity (Phase 3+):**
- Install `@sanity/client` and `next-sanity`
- Move content schema to `/sanity/schemas/`
- Replace MDX file reads in build page with Sanity GROQ queries
- Keep frontmatter shape identical during migration for zero-downtime

---

*Sprint 1 — homepage, subscribe page, global layout, 3-language support, unit tests.*
*Sprint 2 — build page, project page, live data API.*


## 15. License
Distributed under the **GNU GPLv3 License**. 

In alignment with our core values, we believe that the systems sustaining human life should be open, transparent, and protected from enclosure. By using this license, we ensure that the engineering logic of **arrel**—and any improvements made to it by others—remains a permanent part of the global commons.

See `LICENSE` for the full text.

---
**"Everything important in this system happens underground, invisibly, before it becomes visible."** — *The arrel Manifesto*
