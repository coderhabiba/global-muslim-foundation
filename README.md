# Global Muslim Charitable Foundation (GMCF) - Web Portal

An institutional-grade, multi-page humanitarian and Shariah-compliant charity web portal designed with Tailwind CSS, Google Fonts, and Material Symbols. Fully ready for instant deployment to **Netlify**, Vercel, or any static hosting service.

---

## 📁 Project Structure

```
stitch_betterhope_website_clone/
│
├── index.html                 # Homepage (Hero, Bento Appeals, Quick Zakat, Impact & Stewardship)
├── appeals.html               # Appeals & Emergency Causes (Filterable categories, donation modal)
├── zakat-calculator.html      # Zakat Fund & Interactive Shariah Calculator (Gold/Silver Nisab)
├── impact.html                # Impact & Field Case Studies (Narratives, metrics, verified audits)
├── about.html                 # About Us & Shariah Governance (Scholarly board, 4 trust pillars)
├── campaign-details.html      # Campaign Spotlight: One Meal One Hope (Street Food Aid)
├── volunteer.html             # Youth Volunteers Field Portal (Cohort application & volunteer stories)
├── 404.html                   # Custom branded 404 Error page with portal navigation
│
├── netlify.toml               # Netlify configuration (publish directory, security & cache headers)
├── _redirects                 # Netlify fallback routing rule
├── favicon.svg                # Brand emblem SVG favicon
│
├── assets/
│   └── screenshots/           # High-resolution design previews
│       ├── home-preview.png
│       ├── appeals-preview.png
│       ├── zakat-preview.png
│       ├── impact-preview.png
│       ├── about-preview.png
│       ├── campaign-preview.png
│       └── volunteer-preview.png
│
├── docs/
│   └── DESIGN.md              # Design system tokens, color palettes & typography specs
│
└── README.md                  # Project overview & Netlify deployment guide
```

---

## 🌟 Key Features

1. **Unified Global Navigation**:
   - Standardized top helpline & currency selector strip.
   - Interactive desktop navbar highlighting the active page.
   - Responsive mobile navigation drawer with hamburger toggle.
   - Consistent footer with cross-links across all 7 pages.

2. **Full Cross-Page Interlinking**:
   - Clean URLs without nested directory clutter.
   - Appeal cards link directly to campaign details (`campaign-details.html`).
   - Quick calculators and CTA buttons link directly to `zakat-calculator.html`.
   - Governance and scholarly fatwa links connect to `about.html#governance`.
   - Donor / Volunteer profile icon navigates to `volunteer.html`.

3. **Interactive Tools**:
   - **Interactive Zakat Calculator**: Nisab calculation using gold and silver benchmarks with real-time updates.
   - **Quick Donation Modal**: Modal with preset amounts ($25, $50, $100, $250) and custom input.
   - **Filterable Appeals**: Categorize appeals by Emergency, Zakat, Food, and Medical.

4. **Design System & Typography**:
   - Built on Tailwind CSS with custom design tokens (`emerald-dark`, `primary`, `amber-vibrant`, `surface-subtle-mint`, etc.).
   - Typography: *Plus Jakarta Sans* (Body/UI) & *Playfair Display* (Editorial Headings).
   - Icons: Google Material Symbols Outlined.

---

## ⚡ Netlify Deployment Guide

Your project is **100% Netlify Ready** with `netlify.toml`, `_redirects`, security headers, asset caching, and a custom `404.html`.

### Option 1: Drag & Drop (Instant - No Git or CLI needed)
1. Open your browser and go to: **[app.netlify.com/drop](https://app.netlify.com/drop)**
2. Drag and drop the entire `stitch_betterhope_website_clone` folder onto the page.
3. Netlify will deploy your site instantly and give you a live production URL!

---

### Option 2: Using Netlify CLI (Terminal)
Open PowerShell or your terminal in this directory and run:

```bash
# 1. Preview deploy (test)
npx netlify deploy

# 2. Deploy directly to production
npx netlify deploy --prod
```

---

### Option 3: Via GitHub / GitLab
1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "feat: GMCF charity multi-page web portal"
   ```
2. Push to your GitHub repository.
3. In Netlify, click **"Add new site"** → **"Import an existing project"** → select your repo.
4. Netlify will auto-detect the `netlify.toml` file with `publish = "."` and deploy automatically on every push!
