# om-media-site

Marketing site + client tools for OM Media (video production / digital strategy agency).

## Stack

- Next.js 16.2.9 (App Router) — **breaking changes vs. training data, read `node_modules/next/dist/docs/` before writing Next-specific code**
- React 19.2.4 / react-dom 19.2.4
- TypeScript 5, Tailwind CSS 4 (via `@tailwindcss/postcss`)
- framer-motion 12.40.0 — scroll/viewport animation throughout
- gsap 3.15.0 — installed, not currently used in any component
- lenis 1.3.26 (`lenis/react`'s `ReactLenis`) — smooth scroll wrapper (`SmoothScroll.tsx`), replacing the deprecated `@studio-freight/react-lenis` (React 19 incompatible). Disabled on `pointer: coarse` (touch) devices. **`content` is explicitly set to `document.body`, not the default `document.documentElement`** — the root `<html>` has `h-full` (`height: 100%`), which pins its own box to the viewport regardless of overflowing content, so Lenis's `ResizeObserver` never fires on `<html>` when the page grows after mount. Symptom if this regresses: scroll hard-stops short of the true bottom (by roughly the amount of height added) after anything changes page height post-mount — an accordion expanding, images loading in, etc. Fix is pointing `content` at `document.body`, which only has `min-h-full` and actually resizes with its content.
- ESLint 9 / eslint-config-next

No test runner, no CI config, no `vercel.json`/`vercel.ts`.

## Directory layout (`src/`)

```
src/app/
  layout.tsx                 root layout: fonts, SmoothScroll wrapper, Navbar, metadata still says "Create Next App" (unedited)
  page.tsx                   homepage — composes the section sequence below
  globals.css
  book/page.tsx               /book route, renders BookingFlow
  portfolio/[slug]/page.tsx   dynamic gallery route, client component
  api/submit-application/route.ts   POST proxy to external CRM

src/components/
  Navbar.tsx            fixed nav: anchor links (#work/#services/#about/#contact — no matching ids on page), /book, external client portal link
  Preloader.tsx          fullscreen video splash, controlled by page.tsx's isLoading state
  SmoothScroll.tsx        Lenis root wrapper used in layout.tsx
  CanvasScroll.tsx         canvas <img> sequence wipe effect, scroll-driven (see below)
  StickyPortfolio.tsx     sticky sidebar + scrolling video project list (IntersectionObserver-driven active state)
  ServicesIndustries.tsx  bento grid linking to /portfolio/[slug], marquee strip, podcast platform links (hrefs are "#")
  PersonalBranding.tsx    static two-column section, references summerhouse-design-branding.jpg
  AboutStory.tsx           scroll-fade story blocks + parallax image, references team-photo.jpg
  CreatorForm.tsx         "Become a Creator" application form (see below)
  BookingFlow.tsx          service picker + property details (see below)
  ScrollSequence.tsx       NOT imported anywhere — orphaned component, references process-1/2/3.jpg which don't exist in public/images
```

## Homepage component sequence (`src/app/page.tsx`)

1. `Preloader` (video splash + thin progress bar, fixed `PRELOADER_DURATION_MS` (2000ms) timer — deliberately not tied to real asset load, since the hero/case-study videos are 170MB-770MB and would make it run far longer than intended)
2. Hero: `<video>` background (`144-89th-st-wolstenhome-associates.mp4`) + headline
3. `CanvasScroll` — 300vh scroll-linked image-sequence wipe transition
4. `StickyPortfolio` — video case studies
5. `ServicesIndustries` — industry bento grid + podcast teaser
6. `PersonalBranding`
7. `AboutStory`
8. `CreatorForm`

## CanvasScroll mechanics

Draws frames from `public/images/sequence/05homescroll-wipe00.jpg` … `wipe95.jpg` (96 frames, `FRAME_COUNT = 96`; the directory on disk actually has ~97 files) onto a `<canvas>`, mapping `scrollYProgress` (via framer-motion `useScroll` over a 300vh container) to a frame index. Images are preloaded once on mount via plain `Image()` objects (no cleanup/cancellation). No loading state UI beyond `isReady` gating the first draw.

## Booking flow (`/book` → `BookingFlow.tsx`)

- Step 1: client picks any number of services from `serviceCategories` (hardcoded array — photo packages, drone add-ons, video packages, floor plans/Matterport, twilight/production add-ons). Running total computed client-side.
- Step 2: property address, client name, shoot date, access instructions.
- On submit: **`handleSubmit` only sets local `isSubmitted` state** — no network request, no persistence, no email/CRM call. Selected services and property details are discarded on refresh.

## Creator application form (`CreatorForm.tsx` → `/api/submit-application`)

- Form fields: name, email, phone, portfolio link, availability (single-select pill), service areas (multi-select pill).
- On submit, POSTs JSON to `/api/submit-application`.
- Route handler (`src/app/api/submit-application/route.ts`) forwards the body to `process.env.CRM_API_URL` with `Authorization: Bearer ${CRM_API_KEY}`, relays the CRM's response.
- **`.env.local` currently has both `CRM_API_URL` and `CRM_API_KEY` empty** → route always returns 500 "CRM configuration is missing." This is the intended integration point, likely to `om-media-crm.vercel.app` (linked from `Navbar.tsx`'s "Client Login").

## Assets

- `public/images/` — real photo assets + `sequence/` (96-frame wipe sequence for CanvasScroll)
- `public/videos/` — **gitignored** (`.gitignore` line `public/videos/`). Contains large (170MB–770MB) `.mp4`/`.mov` files referenced directly by components (hero, StickyPortfolio, Preloader). Since this directory isn't tracked by git, a fresh clone will be missing every video the homepage/portfolio depends on — these files must be provisioned separately (not currently documented where from).
- Some referenced images don't exist in `public/images`: `process-1/2/3.jpg` (only used by the orphaned `ScrollSequence.tsx`), and several `/portfolio/[slug]` gallery entries (`real-estate-*.jpg`) are not present on disk.

## Current state

**Done:**
- Homepage layout and all scroll/animation sections are implemented and visually complete (hero, CanvasScroll wipe, sticky portfolio, services bento grid, personal branding, about story, creator form).
- `/book` booking UI: full service catalog with live pricing, two-step flow, order summary bar.
- Creator application form UI, client-side validation, loading/success/error states.
- Dynamic `/portfolio/[slug]` gallery route with per-category image grids.

**Unfinished / broken:**
- Booking submission (`BookingFlow.tsx`) does not send data anywhere — it's UI-only, nothing is persisted or delivered to OM Media.
- Creator application submission is wired to a CRM proxy that has no configured URL/key (`.env.local` empty) — always fails in current state.
- `public/videos` is gitignored, so homepage/portfolio video assets are not reproducible from a fresh clone.
- Several portfolio categories (`hospitality`, `food-and-bev`, `golf-courses`, `headshots`) have no images — render "Gallery coming soon."
- Navbar anchor links (`#work`, `#services`, `#about`, `#contact`) don't correspond to any section `id`s on the homepage.
- `ScrollSequence.tsx` is dead code (unused, and references missing images).
- Root layout `<head>` metadata is still the default "Create Next App" title/description.
- No tests, no CI, no deployment config committed.
