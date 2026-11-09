# Global Muslim Charitable Foundation (GMCF) — Web Portal

An institutional-grade, multi-page humanitarian and Shariah-compliant charity
web portal, now built as a **Next.js 16 (App Router) + TypeScript** application
with Tailwind CSS, Google Fonts (self-hosted through `next/font`), and Material
Symbols.

The visual design, copy, Tailwind tokens, and every interactive behaviour of the
original static site were migrated one-to-one — the previous hand-written pages
are archived in [`legacy/`](./legacy) for reference.

---

## 📁 Project Structure

```
stitch_betterhope_website_clone/
│
├── app/
│   ├── layout.tsx                  # Root layout: fonts, metadata, Material Symbols <head> links
│   ├── globals.css                 # Tailwind layers + the original typography system
│   ├── not-found.tsx               # Custom branded 404 (slim header/footer, legacy styling)
│   ├── api/forms/route.ts          # POST endpoint used by the newsletter & volunteer forms
│   └── (site)/                     # Route group that shares the full site chrome
│       ├── layout.tsx              # Fixed header + footer wrapper
│       ├── page.tsx                # Homepage (Hero, Bento Appeals, Quick Zakat, Impact & Stewardship)
│       ├── appeals/page.tsx        # Appeals & Emergency Causes (filters, search, sort, donation modal)
│       ├── zakat-calculator/page.tsx # Zakat Fund & Interactive Shariah Calculator
│       ├── impact/page.tsx         # Impact & Field Case Studies (case dossiers, sponsor tiers)
│       ├── about/page.tsx          # About Us & Shariah Governance
│       ├── campaign-details/page.tsx # Campaign Spotlight: One Meal One Hope
│       └── volunteer/page.tsx      # Youth Volunteers Field Portal
│
├── components/
│   ├── layout/                     # SiteHeader (incl. 404 variant), SiteFooter, NewsletterForm
│   └── pages/                      # Page-level client components (markup + React state)
│
├── public/
│   └── favicon.svg                 # Brand emblem SVG favicon
│
├── legacy/                         # Original static site, kept verbatim for reference
│   ├── index.html, appeals.html, zakat-calculator.html, impact.html,
│   │   about.html, campaign-details.html, volunteer.html, 404.html
│   ├── netlify.toml, _redirects, favicon.svg
│
├── assets/
│   └── screenshots/                # High-resolution design previews
│       ├── home-preview.png
│       ├── appeals-preview.png
│       ├── zakat-preview.png
│       ├── impact-preview.png
│       ├── about-preview.png
│       ├── campaign-preview.png
│       └── volunteer-preview.png
│
├── docs/
│   └── DESIGN.md                   # Design system tokens, color palettes & typography specs
│
├── next.config.ts                  # Legacy *.html -> clean route redirects
├── tailwind.config.ts              # Original design tokens (colors, fontSize, fontFamily)
├── postcss.config.mjs              # Tailwind + autoprefixer
├── eslint.config.mjs               # Next core-web-vitals + TypeScript rules
├── netlify.toml                    # Next.js build + official Netlify adapter + security headers
└── README.md                       # Project overview & deployment guide
```

---

## 🌟 Key Features

1. **Unified Global Navigation**:
   - Standardized top helpline & currency selector strip.
   - Interactive desktop navbar highlighting the active route.
   - Responsive mobile navigation drawer with hamburger toggle.
   - Consistent footer with cross-links across all pages, plus a slim 404
     variant.

2. **Full Cross-Page Interlinking**:
   - Clean URLs backed by real Next.js routes.
   - Appeal cards link directly to campaign details (`/campaign-details`).
   - Quick calculators and CTA buttons link directly to `/zakat-calculator`.
   - Governance and scholarly fatwa links connect to `/about#governance`.
   - Donor / Volunteer profile icon navigates to `/volunteer`.

3. **Interactive Tools** (rebuilt as React state, same behaviour as the original
   scripts):
   - **Quick Donation Card**: gift frequency, fund selection, preset amounts and
     custom amount.
   - **Zakat Calculator**: gold/silver benchmarks, Nisab qualifier, live totals,
     "apply to donation".
   - **Filterable Appeals**: category pills, live search, sorting, quick-donate
     modal with preset chips.
   - **Campaign Detail**: tabbed story/budget/dispatch/governance panels, photo
     gallery switcher, meal package selection, one-time vs monthly giving, live
     meal counter.
   - **Impact Case Dossiers**: case modals, case-study filters and direct
     sponsorship tiers.
   - **Volunteer Portal**: pathway preselection, application form with success
     confirmation, FAQ accordion.
   - **Zakat FAQ & Calculator page**: 10-field assessment matrix with reset and
     fulfillment flow.

4. **Design System & Typography**:
   - Built on Tailwind CSS with custom design tokens (`emerald-dark`, `primary`,
     `amber-vibrant`, `surface-subtle-mint`, etc.).
   - Typography: _Plus Jakarta Sans_ (Body/UI) & _Playfair Display_ (Editorial
     Headings), served via `next/font`.
   - Icons: Google Material Symbols Outlined.
   - The original global typography scale (including its `!important` headline
     rules) is preserved in `app/globals.css`.

5. **Forms & Data**:
   - Newsletter and volunteer submissions post to `POST /api/forms`, keeping the
     original fire-and-forget contract. Wire the handler to your CRM, e-mail
     provider or database to persist leads.

---

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:3000)
npm run dev

# Production build & local server
npm run build
npm run start

# Lint / type-check
npm run lint
npx tsc --noEmit
```

### Legacy URLs

Old static URLs keep working through permanent redirects declared in
`next.config.ts`:

| Legacy                   | Now                 |
| ------------------------ | ------------------- |
| `/index.html`            | `/`                 |
| `/appeals.html`          | `/appeals`          |
| `/zakat-calculator.html` | `/zakat-calculator` |
| `/impact.html`           | `/impact`           |
| `/about.html`            | `/about`            |
| `/campaign-details.html` | `/campaign-details` |
| `/volunteer.html`        | `/volunteer`        |

Unknown paths render the branded 404 page from `app/not-found.tsx`.

---

## ⚡ Netlify Deployment Guide

The repository ships a `netlify.toml` configured for Next.js
(`publish = ".next"` with the official
[`@netlify/plugin-nextjs`](https://docs.netlify.com/frameworks/next-js/overview/)
adapter) and keeps the original security headers.

### Option 1: Netlify CLI (Terminal)

```bash
# 1. Preview deploy (test)
npx netlify deploy

# 2. Deploy directly to production
npx netlify deploy --prod
```

### Option 2: Via GitHub / GitLab

1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "feat: GMCF charity portal (Next.js + TypeScript)"
   ```
2. Push to your GitHub repository.
3. In Netlify, click **"Add new site"** → **"Import an existing project"** →
   select your repo.
4. Netlify reads `netlify.toml`, runs `npm run build`, applies the Next.js
   adapter, and redeploys on every push.

> Drag & drop of the old static folder (archived in `legacy/`) still works if
> you ever need the pre-Next version — deploy the contents of `legacy/` instead
> of the repository root.
# global-muslim-foundation
