---
kind: build_system
name: Next.js + Netlify Build & Deployment Pipeline
category: build_system
scope:
    - '**'
source_files:
    - package.json
    - next.config.ts
    - netlify.toml
    - legacy/netlify.toml
---

## Build System Overview

The project is a Next.js 16 App Router site built and deployed via npm scripts and Netlify. There is no Makefile, Dockerfile, CI pipeline, or cross-compile step — the build surface is minimal and centered on `next build`.

### Tools and Frameworks
- **Runtime / framework**: Next.js 16.4.5 with React 19 (App Router).
- **Build tooling**: TypeScript (`tsconfig.json`, `@types/node`, `@types/react`, `@types/react-dom`), Tailwind CSS 3.4, PostCSS + Autoprefixer, ESLint 9 (`eslint.config.mjs`), Prettier 3.9.
- **Deployment target**: Netlify, using the official `@netlify/plugin-nextjs` adapter to run the Next.js server output as Netlify Functions.

### Key Files
- `package.json` — defines the four npm scripts (`dev`, `build`, `start`, `lint`) and pins all runtime/dev dependencies.
- `next.config.ts` — configures component caching, partial prefetching, and redirects from legacy `.html` URLs to clean App Router paths.
- `netlify.toml` — top-level deployment manifest: `npm run build` → publish `.next`; applies security headers; caches `/public/*.svg` for one year.
- `legacy/netlify.toml` — separate Netlify configuration for the archived static site under `legacy/`, publishing that directory as-is with identical security headers and a note explaining why no `/* -> /404.html` catch-all rule is present.

### Build Flow
1. `npm run build` invokes `next build`, producing the optimized `.next` output.
2. Netlify reads `netlify.toml`, runs the same command, then publishes the `.next` directory.
3. The `@netlify/plugin-nextjs` plugin serves the Next.js server output on Netlify Functions.
4. Legacy `.html` URLs are redirected at build time via `next.config.ts` `redirects()` (e.g. `/about.html → /about`, `/index.html → /`).

### Conventions and Constraints
- **Scripts**: All build/dev/start/lint commands go through npm scripts in `package.json`; there are no shell wrappers or Makefiles.
- **Publish target**: The production artifact is the `.next` directory (not `out/`); this is enforced by `netlify.toml`'s `publish = ".next"`.
- **Security headers**: Both the new site (`netlify.toml`) and the legacy archive (`legacy/netlify.toml`) set identical security headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `X-XSS-Protection: 1; mode=block`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation()`). This is a deliberate carry-over from the legacy deployment.
- **Asset caching**: Static SVGs under `/public` are served with `Cache-Control: public, max-age=31536000, immutable`; the legacy site does the same for `/assets/*`.
- **Legacy URL compatibility**: Every page in `legacy/` has a corresponding redirect entry in `next.config.ts` so external links, bookmarks, and search results continue to resolve to the clean path. The list of pages (`about`, `appeals`, `campaign-details`, `impact`, `volunteer`, `zakat-calculator`) is the single source of truth for these redirects.
- **Legacy site isolation**: The old static site lives under `legacy/` with its own `netlify.toml` and `_redirects`; it is not part of the Next.js build and is documented as "archived" in both `netlify.toml` comments.
- **No CI / containerization**: No GitHub Actions, Dockerfile, or other CI/CD artifacts were found in the repository. Deployment is driven entirely by Netlify's integration with the repo.