# om-media-site

Marketing site + client tools for OM Media (video production / digital strategy agency).

**`main` auto-deploys to production.** Commit locally, but don't push until changes have been reviewed on localhost.

## Stack

- Next.js 16.2.9 (App Router) — **breaking changes vs. training data, read `node_modules/next/dist/docs/` before writing Next-specific code**
- React 19.2.4 / react-dom 19.2.4
- TypeScript 5, Tailwind CSS 4 (via `@tailwindcss/postcss`)
- framer-motion 12.40.0 — scroll/viewport animation throughout. **Known bug: a `useTransform` value derived directly from `useScroll`'s `scrollYProgress`, when fed straight into a `style` prop (e.g. `style={{ opacity, filter }}`), silently never updates the DOM** — it renders fine as `motion.span`/`motion.div` children (text content), and reproduces even with zero per-element logic (just `scrollYProgress` itself as `style={{ opacity: scrollYProgress }}`). No error, no warning — the value just stays frozen at its initial state forever, while the underlying `scrollYProgress` keeps updating fine. Root cause not fully identified (possibly a framer-motion / React 19 / Turbopack interaction). **Fix: wrap the value in `useSpring(...)` before using it in `style`** — a stiff spring (e.g. `{ stiffness: 400, damping: 45, mass: 0.3 }`) fixes it reliably with negligible added lag. See `HeroHeadlineReveal.tsx` for a working example.
- gsap 3.15.0 — installed, not used in any component
- lenis 1.3.26 (`lenis/react`'s `ReactLenis`) — smooth scroll wrapper (`SmoothScroll.tsx`). Disabled on `pointer: coarse` (touch) devices. **`content` is explicitly set to `document.body`, not the default `document.documentElement`** — the root `<html>` has `h-full`, which pins its box to the viewport, so Lenis's `ResizeObserver` never fires when the page grows after mount. Symptom if this regresses: scroll hard-stops short of the true bottom after anything changes page height post-mount.
- ESLint 9 / eslint-config-next

No test runner, no CI config, no `vercel.json`/`vercel.ts`. Checks: `npx tsc --noEmit`, `npm run lint`.

## Gotchas

- **Don't export plain data from a `"use client"` module and import it into a server component / route handler.** Across the client boundary it becomes a client reference, so e.g. `.map` throws at render time (500, no type error). Shared data lives in `src/content/` (e.g. industry/category data is in `src/content/industries.ts`, not `IndustryGrid.tsx`).
- `useIsTouchDevice` (`src/lib/useIsTouchDevice.ts`, `pointer: coarse`) returns `true` during SSR and hydration, then the real value. Anything rendered in the touch branch is therefore server-rendered for desktop too — don't put eagerly-loaded assets there without gating on hydration (see `CanvasScroll`'s `StaticFallback`).
- Measuring a horizontally-overflowing flex strip with `ResizeObserver`: the strip needs `w-max shrink-0`, otherwise it shrinks to its parent and its box never resizes as content loads (see `PortfolioGallery`'s `DesktopGallery`).

## Routes (`src/app/`)

`/` · `/work` (portfolio index) · `/portfolio/[slug]` · `/services` · `/services/{branding-shoots,content-creation,podcast-production,social-media-management,video-production}` · `/hospitality` · `/golf` · `/about` · `/contact` (`ContactFlow`) · `/creators` (`CreatorForm`) · `/book` (`BookingFlow`) · `/privacy` · `/terms` · `sitemap.ts` · `robots.ts` (environment-aware) · `opengraph-image.tsx`.

Root `layout.tsx` has real metadata ("OM Media | Video Production & Digital Strategy"), `SmoothScroll`, `Navbar`, `Footer`. Navbar has four top-level items — Industries (→ `/work`; every navigation label pointing at `/work` — nav, Footer, homepage and /services buttons — says "Industries", only prose says "work"), Services (dropdown), About, Contact — plus Book a Shoot (desktop and mobile drawer both render from `navLinks`). `/hospitality` and `/golf` are not in the nav; they're reached via the Footer and `/work`, whose Hospitality and Golf Courses cards — like the homepage `IndustryGrid` — link to those landing pages instead of their `/portfolio/[slug]` galleries (`LANDING_PAGE_HREFS` / `categoryHref()` in `src/content/industries.ts`, shared by both). Also an external "Client Login" at `https://portal.om-media.com/portal/login` (also in `Footer`) — keep the `/portal/login` path; bare `/login` is the staff sign-in.

## Form submissions → CRM

`/book`, `/creators` and `/contact` all POST to API routes (`/api/submit-booking`, `/api/submit-application`, `/api/submit-contact`) which go through `submitOrStoreLocally` in `src/lib/submissions.ts`:

- `SUBMISSIONS_MODE=crm` → POSTs to `CRM_API_BASE_URL` + per-route path (`/api/bookings`, `/api/creators/apply`, `/api/contact`) with `Authorization: Bearer ${CRM_API_KEY}`. In production this is live against `crm.om-media.com`.
- Unset / `local` (the default, and the local `.env.local` state) → writes JSON to gitignored `data/submissions/<kind>/` instead.

Payload types in `src/types/submissions.ts`; validation in `src/lib/validation.ts` (mirrors what the CRM hard-rejects).

## Assets

- `getAssetUrl(remoteFilename, localPath)` (`src/lib/assets.ts`) returns `${NEXT_PUBLIC_ASSET_URL}/${remoteFilename}` (Backblaze B2, `.../om-media-site-assets`) when the env var is set — it is set in `.env.local`/`.env.example` and in production — else the local `/public` fallback.
- **B2-hosted:** hero video (`hero.mp4`), StickyPortfolio videos, logo, and the `architecture` and `hospitality` portfolio galleries (`Galleries/<category>/`). Local copies of those galleries under `public/images/portfolio/{architecture,hospitality}/` are untracked leftovers, not used when the env var is set.
- **Local (`public/images/`):** `real-estate` and `headshots` galleries, single-image categories, CanvasScroll frames, `hero-poster.jpg` (frame 0 of B2 `hero.mp4`).
- `public/videos/` is gitignored — only a local fallback for when `NEXT_PUBLIC_ASSET_URL` is unset.
- Portfolio data: `src/content/portfolioImages.ts` (image lists + per-image alt for hospitality), `portfolioCategories.ts` (intro/meta copy), `industries.ts` (category list/order). `food-and-bev` and `golf-courses` have no images → "Gallery coming soon."

## Homepage (`src/app/page.tsx`)

Hero `<video>` (B2 `hero.mp4`, `poster="/images/hero-poster.jpg"`) → `HeroHeadlineReveal` → `CanvasScroll` → `StickyPortfolio` → `ServicesIndustries` (uses `IndustryGrid`) → `PersonalBranding` → `AboutStory` → `ContactTeaser` → `CreatorForm`.

### CanvasScroll

- Desktop: 96 frames `public/images/sequence/05homescroll-wipe00.jpg`…`wipe95.jpg` (1920×1080 JPEG q80, ~32 MB total) drawn to a `<canvas>` from `scrollYProgress` over a 300vh container. Preload is gated by an `IntersectionObserver` (starts one viewport before the section) — nothing is fetched at page load.
- Touch (`useIsTouchDevice`): no canvas, no preload — a single static `<img>` of the last frame in a 100vh block, rendered only after hydration.

## Known loose ends

- `ScrollSequence.tsx` is dead code (unused; references missing `process-1/2/3.jpg`).
- Podcast platform links: `/services/podcast-production` and the homepage podcast teaser (`ServicesIndustries.tsx`) link only YouTube (channel URL) until Apple Podcasts/Spotify URLs exist — add them back in both places.
- `sticky-scroll/` at the repo root is untracked working material — leave it alone.
