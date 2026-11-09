---
kind: external_dependency
name: Netlify hosting and Next.js adapter
slug: netlify
category: external_dependency
category_hints:
    - vendor_identity
scope:
    - '**'
source_files:
    - netlify.toml
    - next.config.ts
---

### Netlify
- Role: production host for this Next.js 16 site; `netlify.toml` declares `publish = ".next"`, runs `npm run build`, and enables the official `@netlify/plugin-nextjs` adapter so App Router routes (including `/api/forms`) are served as Netlify Functions.
- Legacy static deployment is preserved by also keeping the old `legacy/netlify.toml` and `legacy/_redirects`; drag-and-drop of the legacy folder still works per README.
- Security headers from the original static deploy (`X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`, `Referrer-Policy`, `Permissions-Policy`) are re-applied via `[[headers]]` blocks in the new config.
- Verify exact header names and plugin options against the latest Netlify docs.