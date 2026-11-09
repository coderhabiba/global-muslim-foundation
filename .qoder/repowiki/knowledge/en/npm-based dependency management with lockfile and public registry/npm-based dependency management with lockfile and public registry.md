---
kind: dependency_management
name: npm-based dependency management with lockfile and public registry
category: dependency_management
scope:
    - '**'
source_files:
    - package.json
    - package-lock.json
---

## Approach

This repository uses **npm** as its package manager for the Next.js application. Dependencies are declared in `package.json` and resolved/locked via `package-lock.json` (lockfileVersion 3). There is no vendored `node_modules/` directory committed to the repo, no private npm registry configuration, no `.npmrc`, no `pnpm-lock.yaml`, and no `yarn.lock`. The legacy static site under `legacy/` has no dependencies — it is hand-authored HTML/CSS deployed as-is.

## Key files

- `package.json` — declares runtime and dev dependencies, plus npm scripts (`dev`, `build`, `start`, `lint`).
- `package-lock.json` — deterministic lockfile pinning every transitive dependency to an exact version and SHA integrity hash from `https://registry.npmjs.org`.
- `.gitignore` — excludes `node_modules/` (and other build artifacts) so the lockfile is the source of truth for reproducible installs.

## Versioning conventions observed

- Runtime dependencies use **exact versions**: `next@16.4.5`, `react@19.3.0`, `react-dom@19.3.0`.
- Dev dependencies use **caret ranges** (`^`) to allow compatible minor/patch updates: `@types/node@^20`, `@types/react@^19`, `eslint@^9`, `tailwindcss@^3.4.19`, `typescript@^5`, etc.
- `next` and `eslint-config-next` are pinned to the same exact version (`16.4.5`), keeping the framework and its ESLint preset in sync.
- The project is marked `"private": true`, preventing accidental publication to the public npm registry.

## Registry and distribution

All packages resolve from the default public npm registry (`https://registry.npmjs.org`), as evidenced by the `resolved` URLs in `package-lock.json`. No custom registry, token, or `verdaccio` setup is present. There is no `node_modules/` folder checked in, so builds rely on running `npm install` (or equivalent) against the lockfile.

## Scripts

The only npm scripts defined are:
- `dev` → `next dev`
- `build` → `next build`
- `start` → `next start`
- `lint` → `eslint`

No dedicated script exists for auditing (`npm audit`), updating (`npm update` / `npm outdated`), or publishing.