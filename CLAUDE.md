# CLAUDE.md

Guidance for Claude Code (and any future contributor) working in this repository.

## What this project is

A one-page marketing/landing site for **Bare Minimum Hero**, a Chrome extension that gives
users ironic emotional validation for doing very little. The site is a single scrolling
page (hero, features, quote, "mobile coming soon", footer) with an inline EN/RU language
switcher. There is no backend, no database, no auth, no analytics, and no API routes —
it's a static marketing page.

- Live site: https://bareminimumhero.com (per README; not verified as still active)
- Chrome extension listing: linked directly from the install buttons in `src/app/page.tsx`
- GitHub remote: `https://github.com/MaxBasev/bare-minimum-hero-landing.git` (this repo's `origin`)

## Stack & key dependencies

- **Next.js 15.3.8** (App Router) + **React 19** + **TypeScript 5** (strict mode)
- **Tailwind CSS v4** — note: v4's CSS-first config, so there is **no `tailwind.config.js`**.
  Theme tokens are defined directly in `src/app/globals.css` via `@theme inline`, and the
  Tailwind PostCSS plugin is wired in `postcss.config.mjs`. Don't go looking for a JS config
  file — it doesn't exist in this setup.
- **framer-motion** — scroll/mount fade-in animations on each section
- **ESLint 9** flat config (`eslint.config.mjs`) extending `next/core-web-vitals` + `next/typescript`
- Package manager: `package-lock.json` is committed → use **npm** (README's `pnpm` instructions
  are stale/wrong, see Known Issues below)

## Structure

```
src/app/
  layout.tsx     — root layout, <head>/metadata, Google fonts (Geist), favicon
  page.tsx       — the entire site: hero, features, quote, mobile section, footer, i18n
  globals.css    — Tailwind import + CSS theme tokens (light/dark via prefers-color-scheme)
public/
  images/        — logo, app icons, promo assets used by the page
  images/Promo/  — larger press-kit/App-store style assets, not all referenced by page.tsx
```

There is exactly one route (`/`). All content, including translations, lives inline in
`page.tsx` — there's no CMS, no MDX, no i18n routing library.

## Commands

```bash
npm install     # install deps (package-lock.json is the source of truth — do not switch to pnpm/yarn)
npm run dev     # start dev server (Next.js, default http://localhost:3000)
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint via `next lint`
```

**There is no test suite** — no test runner is configured, no `test` script exists, and no
test files are present anywhere in the repo. "Testing" a change here means `npm run lint`
and a manual look at `npm run dev`.

## Notable / non-standard decisions

- **Client-side-only i18n**: language (`en`/`ru`) is a `useState` in `page.tsx`, not routed
  (`/en`, `/ru`), not persisted (resets on reload), and not connected to `<html lang>`
  (which is hardcoded to `"en"` in `layout.tsx` regardless of the selected language). No
  `next-intl` or similar library — translations are a plain object literal.
- `page.tsx` is a single `'use client'` component containing the whole page — there's no
  component decomposition (no `<Hero>`, `<Features>`, etc.). Intentional given the site's
  size; keep in mind before assuming there are other component files to find.
- `dangerouslySetInnerHTML` is used once, to turn `™` into `<sup>™</sup>` in the Android
  status string. The input is a hardcoded translation string, not user input, so it's not an
  actual XSS vector — but it's the kind of pattern that looks alarming out of context.
- Tailwind v4's new CSS-config approach (see Stack section) — if something Tailwind-related
  isn't working, look in `globals.css`, not for a config file.
- `public/images/` and `public/images/Promo/` both hold overlapping assets (icons, promo
  banners) at different sizes/crops; not all `Promo/` assets are referenced from `page.tsx` —
  they look like a press-kit dump rather than app assets. Safe to leave alone.

## Known issues / things to fix if touching related code

- `src/app/layout.tsx:29` — `openGraph.url` is still the literal placeholder
  `'YOUR_WEBSITE_URL'`, never filled in with the real domain. Social-share metadata is
  therefore wrong. Fix by setting it to `https://bareminimumhero.com` if that's still the
  live domain.
- `README.md`'s install instructions use `pnpm`, but the repo commits `package-lock.json`
  (npm). Follow the Commands section above, not the README, if they ever disagree.
- No `robots.txt`, `sitemap.xml`, or `manifest.json` despite a full set of icon sizes
  (16/32/48/64/128/256) sitting in `public/images/` — those look like leftover Chrome
  extension icons, not a wired-up web app manifest.

## Deployment / things that live outside this repo

This repo contains **no environment variables** (`grep -r process.env src/` finds nothing)
and **no `.env*` files** exist locally — there's nothing secret to lose from the working
copy on that front. However, be aware that things needed to fully reproduce the *live*
site are **not** in git and would need to be recovered separately if ever lost:

- Whatever hosting project (Vercel, going by `public/vercel.svg` and a past PR titled
  "Fix React Server Components CVE vulnerabilities" from a `vercel/...` branch) is wired to
  this GitHub repo — its project settings, custom domain (`bareminimumhero.com`) binding,
  and any environment variables configured there.
- DNS configuration for `bareminimumhero.com` (registrar + DNS provider, not stored here).
- The Chrome Web Store listing itself (the extension this site promotes) — entirely separate
  from this repo.

## Worklog (mandatory)

At the end of every working session, add an entry to `WORKLOG.md` (newest entries on top,
format described in that file's header): what was done, which files/areas were touched,
what decisions were made, and what's left. Be concrete — never "made some fixes", always
name the actual change. Call out releases/version bumps explicitly. Do this without being
asked.
