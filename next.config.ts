import type { NextConfig } from 'next';

/**
 * Legacy URLs (`.html`) are permanently redirected to the clean App Router
 * paths so every external link, bookmark and search result keeps working.
 */
const legacyPageRedirects = [
  'about',
  'appeals',
  'campaign-details',
  'impact',
  'volunteer',
  'zakat-calculator',
].map(page => ({
  source: `/${page}.html`,
  destination: `/${page}`,
  permanent: true,
}));

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      ...legacyPageRedirects,
    ];
  },
};

export default nextConfig;
