# Requirements and acceptance checklist

Status: **implemented**, **verified**, or **client dependency**.

## Foundation

- Implemented — Next.js App Router, TypeScript, React, Tailwind CSS 4, server components by default.
- Implemented — central brand tokens, self-hosted Outfit/Inter/JetBrains Mono, Lucide icons, reusable header/footer/phone/forms.
- Implemented — sticky desktop header and mobile persistent CTA; accessible mobile menu and skip link.
- Verified — actual ExpertOnc wordmark and five current 860 × 1864 screenshots used.
- Client dependency — valid ExpertOnc app icon, remaining 25 stated screenshots, horizontal/white logo variants.

## Routes and content

- Implemented — `/` with hero, before/after demo, sources, three stories, how-it-works, verification-pending privacy promises, caregiver caveat, testimonial hold, FAQ, final CTA, and footer.
- Implemented — `/features` with every requested feature and explicit confirmed/prototype/pending status.
- Implemented — `/resources` with organizations, support services, source-attributed topic guides, disclaimer, and seven-lesson library.
- Implemented — `/resources/learn/1` through `/resources/learn/7` from recovered scripts, with SSG and previous/next navigation.
- Implemented — `/about`, `/support`, `/privacy`, `/terms`, and `/download`.
- Client dependency — company legal name, description, address, contacts, team details.
- Client dependency — approved FAQ answers for cost, privacy, consent, cancers, caregivers, devices, and offline usage.
- Client dependency — approved Privacy Policy and Terms; pages are `noindex` drafts and release blockers.
- Client dependency — organization descriptions and approved logos; current page uses names and official links only.
- Client dependency — approved lesson videos and testimonials.

## Conversion and integrations

- Implemented — one centralized launch mode and `/download` logic.
- Implemented — prelaunch form with Zod validation, consent, honeypot, throttling, Redis REST storage, SHA-256 duplicate key, and no fake success.
- Implemented — launched desktop QR/copy/SMS UI and device redirect logic, activated only when both real store URLs exist.
- Implemented — Resend support route and accessible form; missing configuration returns an honest error.
- Implemented — Twilio SMS route; one transactional link per accepted request; no application logging or retention of numbers.
- Client dependency — Upstash, Resend, Twilio, support inbox, verified sender, live store URLs, official store badges.

## SEO, accessibility, privacy, and security

- Implemented — unique route metadata, canonicals, OG/Twitter metadata, generated OG image, sitemap, robots, manifest, SoftwareApplication JSON-LD without ratings, prices, or download counts.
- Implemented — semantic headings, labeled fields, live status messages, visible focus, keyboard menu/accordion, reduced-motion handling, large targets, and alt text.
- Implemented — security headers, server validation, honeypots, rate limiting, server-only secrets, and no analytics/pixels.
- Verified — production dependency audit: 0 vulnerabilities.
- Verified — no horizontal overflow at 1440px and 390px browser checks.
- Recommended production follow-up — distributed rate limiting and a formal WCAG audit with assistive technologies.

## Verification run

- Passed — `npm run typecheck`.
- Passed — `npm test` (4 assertions).
- Passed — `npm run build` (24 routes; static/SSG public pages and dynamic API routes).
- Passed — built-in browser desktop/mobile render, page identity, nonblank content, menu, FAQ, honest early-access 503 state, and console inspection.
- Blocked in this environment — committed Playwright suite could not launch because Chromium/WebKit binaries were absent; the browser download request was rejected after the account tool-usage limit was reached. No test pass is claimed.
- Pending — Safari on physical iPhone, Chrome on physical Android, 200% zoom, and final Lighthouse on deployed HTTPS preview.
- Client dependency — preview deployment, company domain, DNS access, and client approval.
