---
kind: frontend_style
name: Tailwind CSS Design System with Material 3 Tokens and Custom Typography Scale
category: frontend_style
scope:
    - '**'
source_files:
    - tailwind.config.ts
    - app/globals.css
    - postcss.config.mjs
    - package.json
---

## Approach

The site uses **Tailwind CSS v3** (via PostCSS + Autoprefixer) as its sole styling system. There is no component library, CSS-in-JS, or SCSS pipeline — all visual design lives in `tailwind.config.ts` and `app/globals.css`. The legacy static pages under `legacy/` ship their own inline Tailwind CDN and Material Symbols, but they are archived and not part of the build.

## Key Files

- `tailwind.config.ts` — central design token source: colors, typography scale, font families, dark mode strategy.
- `app/globals.css` — global base styles, Material 3 / Design Token typography overrides, scrollbar hiding, serif heading helper.
- `postcss.config.mjs` — enables Tailwind + Autoprefixer.
- `package.json` — pins `tailwindcss ^3.4.19`, `autoprefixer ^10.6.2`, `postcss ^8.5.32`.
- `app/layout.tsx` — injects Google Fonts (`Plus Jakarta Sans`, `Playfair Display`) via `next/font/google` so the CSS custom properties `--font-plus-jakarta` and `--font-playfair` resolve.

## Architecture & Conventions

### Design tokens live in `tailwind.config.ts`

- **Colors**: a large palette of semantic tokens following Material 3 naming conventions (`primary`, `on-primary`, `surface-container`, `tertiary-container`, `secondary-fixed`, `error`, `border-subtle`, `zakat-gold-light`, etc.) plus brand-specific names (`oceanic-teal-deep`, `emerald-dark`, `gold-accent`, `gold-warm`).
- **Typography**: an extended scale mirroring Material 3 type roles — `headline-xl/lg/md/sm`, `title-lg/md/sm`, `body-lg/md/sm`, `label-lg/md/sm` — each defined as `[fontSize, { lineHeight, letterSpacing, fontWeight }]`.
- **Fonts**: `sans` maps to `var(--font-plus-jakarta)`; `serif` maps to `var(--font-playfair)`. These CSS variables are provided by Next.js `next/font/google` at runtime.
- **Dark mode**: configured as `darkMode: 'class'`, meaning dark mode is toggled by adding a `dark` class on an ancestor element rather than via `prefers-color-scheme`.
- **Content scanning**: only `./app/**/*.{ts,tsx}` and `./components/**/*.{ts,tsx}` are scanned, keeping the generated CSS bundle small.

### Global CSS layering

`app/globals.css`:
1. Imports Tailwind's base/components/utilities layers.
2. Uses `@layer base` for resets (`html/body` margin/padding, `overscroll-behavior: none`, collapsing first/last child margins inside `<main>`).
3. Hides scrollbars globally via `::-webkit-scrollbar { display: none }`.
4. Defines `.font-serif-heading` and then re-declares every Material 3 typography role as both a utility class (`.text-headline-*`, `.font-body-*`) and a matching CSS class (`.font-headline-*`, `.font-body-*`) using `!important` overrides. This dual-class approach ensures that both Tailwind utilities and hand-written classes produce identical output.
5. Includes a compatibility override block (`.not-found-page h1`) preserving the legacy 404 page's original `text-4xl sm:text-5xl` sizing.

### Responsive strategy

- Breakpoints follow Tailwind defaults (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`).
- Typography in `globals.css` uses `@media (min-width: 640px)` and `@media (min-width: 1024px)` blocks to scale headline sizes from mobile → tablet → desktop.
- No custom breakpoints are added in `tailwind.config.ts`; the default Tailwind breakpoint set is used.

### Dark mode

Declared as `darkMode: 'class'` in `tailwind.config.ts`, but no `dark:` variants or dark-mode color mappings are present in the config — the infrastructure is in place for future dark theme support.

### Legacy archive

The files under `legacy/` are a separate, hand-authored static site deployed directly to Netlify. They include their own Tailwind CDN link and Material Symbols import and are **not** processed by the Next.js build. Their presence does not affect the active site's styling pipeline.

## Conventions Observed

- All colors are referenced through Tailwind utility classes like `bg-primary`, `text-on-surface`, `border-border-subtle` — raw hex values are not used in components.
- Typography is applied via the extended Tailwind classes `text-headline-xl`, `text-title-md`, `text-body-sm`, `text-label-lg`, etc., rather than ad-hoc `font-size` values.
- Font families are accessed via the Tailwind `font-sans` / `font-serif` utilities, which resolve to the `next/font/google` CSS variables.
- Global style overrides use `!important` in `globals.css` to guarantee precedence over any Tailwind-generated utilities — this is intentional for the typography scale.
- Components under `components/pages/` and `components/layout/` compose layout purely with Tailwind utility classes; there are no additional CSS modules or styled-components.