# ExpertOnc marketing website

Production-oriented Next.js App Router website for ExpertOnc. The default configuration is prelaunch: every primary CTA routes through `/download` and displays a real server-backed early-access form only when storage is configured.

## Local setup

1. Install Node.js 20.9+.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and configure only the providers you intend to test.
4. Run `npm run dev` and open `http://localhost:3000`.

Quality commands: `npm run typecheck`, `npm test`, `npm run build`, and `npm run test:e2e`.

## Launch configuration

- Keep `APP_LAUNCHED=false` and `NEXT_PUBLIC_APP_LAUNCHED=false` until both store listings are approved.
- Set `PUBLIC_SITE_URL` and `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS company domain.
- Add real `IOS_STORE_URL` and `ANDROID_STORE_URL` values only after the listings exist.
- Set both launch flags to `true` and redeploy. `/download` will redirect iOS/Android visitors and show desktop store choices, a canonical QR code, copyable URL, and SMS form.
- Official Apple/Google badge files are intentionally not included because approved listings and badge assets were not supplied.

## Provider setup

Early access uses Upstash Redis REST with `SET ... NX`: the normalized email and explicit one-time launch consent are stored under a SHA-256-derived key to prevent duplicates. Configure `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.

Support uses Resend. Configure `RESEND_API_KEY`, a verified `RESEND_FROM_EMAIL`, and `SUPPORT_EMAIL`. Missing configuration returns HTTP 503 and never displays fake success.

SMS uses Twilio when `SMS_PROVIDER=twilio`. Configure the account SID, auth token, and sending number. The application does not store or log the submitted number or message. Twilio may retain delivery metadata under its own policies.

All endpoints include Zod validation, a honeypot, and best-effort per-instance throttling. For distributed production abuse controls, place Vercel Firewall/Rate Limiting in front of the endpoints or replace the in-memory limiter with a shared Redis limiter.

## Vercel and DNS

1. Import the repository in Vercel and add environment variables per environment.
2. Deploy a preview and verify every route plus provider error/success paths.
3. Add the company domain in Vercel, then create the exact DNS records Vercel provides at the registrar.
4. Verify HTTPS, canonical URLs, `/robots.txt`, `/sitemap.xml`, `/privacy`, `/terms`, and `/support` on the final domain.
5. Do not launch until the client approvals in `docs/ACCEPTANCE.md` are resolved.

No analytics or advertising pixels are installed.
