---
kind: error_handling
name: Minimal Error Handling in a Static Next.js Charity Site
category: error_handling
scope:
    - '**'
source_files:
    - app/not-found.tsx
    - components/pages/NotFoundPage.tsx
    - app/api/forms/route.ts
    - components/pages/VolunteerPage.tsx
    - legacy/404.html
---

## Overview

This is a small, presentation-focused Next.js App Router site for the Global Muslim Charitable Foundation. It has no dedicated error-handling framework, no custom error classes, no middleware, and no `errors/` directory. Error handling is minimal and localized to two places: the Next.js `not-found.tsx` route (404 page) and the single API endpoint under `app/api/forms/route.ts`. The legacy static site under `legacy/` ships its own `404.html`.

## What system/approach is used

- **Next.js built-in routing errors**: `app/not-found.tsx` leverages Next.js's convention-based 404 handler; there is no custom `ErrorBoundary`, no `getServerSideProps`/`getStaticProps` error paths, and no global error middleware.
- **Plain HTTP status codes** from `next/server`'s `NextResponse.json`: the form endpoint returns `{ ok: false, error: 'Missing form-name field.' }` with status 400, and `{ ok: true, form: formName }` with status 200.
- **No sentinel errors, no typed exceptions, no `try/catch` blocks** in any of the TypeScript source files. The only `catch` in the codebase is a silent `.catch(function () {})` on a Promise in `components/pages/VolunteerPage.tsx` (line 54), which swallows all errors from an analytics/tracking call.
- **Legacy fallback**: `legacy/404.html` is a hand-authored static 404 page that remains deployed alongside the Next.js build for backward compatibility.

## Key files

- `app/not-found.tsx` — Next.js 404 page component; renders `NotFoundPage` inside the site shell.
- `components/pages/NotFoundPage.tsx` — Presentational 404 content.
- `app/api/forms/route.ts` — Only server-side error path: validates the incoming `form-name` field and returns a JSON error response with status 400 when missing.
- `legacy/404.html` — Legacy static 404 page (kept for Netlify redirects).
- `components/pages/VolunteerPage.tsx` — Contains a silent `.catch()` that swallows errors from an external tracking call.

## Architecture and conventions

1. **Errors are not propagated as values.** There is no shared error type or error envelope beyond the ad-hoc `{ ok, error }` shape returned by the forms API. Callers of this endpoint would need to inspect the `ok` field and the `error` string directly.
2. **No client-side error boundaries.** None of the page components (`HomePage`, `AboutPage`, `AppealsPage`, `CampaignDetailsPage`, `ImpactPage`, `VolunteerPage`, `ZakatCalculatorPage`) implement React error boundaries or try/catch around rendering.
3. **No logging infrastructure.** There is no logger, no structured log output, and no error reporting SDK (e.g., Sentry). Unhandled runtime errors in production would surface through Next.js's default error overlay / Netlify's hosting error pages.
4. **The legacy site is self-contained.** Its `404.html` is fully independent of the Next.js app and uses inline Tailwind + Material Symbols; it does not share code with the new site's error handling.

## Conventions and constraints

- **Observed convention:** Client-side failures in fire-and-forget calls are silently swallowed rather than surfaced to the user (see `VolunteerPage.tsx` line 54: `.catch(function () {})`).
- **Observed convention:** Server-side validation errors in the forms API use a simple `{ ok: boolean, error?: string }` payload with an explicit HTTP status code via `NextResponse.json(..., { status })`.
- **Not enforced by tooling:** There is no ESLint rule, TypeScript configuration, or CI step observed here that enforces consistent error shapes, requires try/catch, or forbids silent catches.
- **Scope limitation:** Because this repository contains only ~15 TypeScript/TSX files plus static HTML, the absence of a broader error-handling system is expected — the site is intentionally thin and stateless.