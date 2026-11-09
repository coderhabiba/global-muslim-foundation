import type { Metadata } from 'next';
import {
  Noto_Sans_Bengali,
  Playfair_Display,
  Plus_Jakarta_Sans,
} from 'next/font/google';

import SiteSettingsBridge from '@/components/system/SiteSettingsBridge';
import { SiteSettingsProvider } from '@/lib/site-settings';

import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-bengali',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default:
      'Global Muslim Charitable Foundation | Empowering Lives Through Faith & Stewardship',
    template: '%s',
  },
  description:
    'Global Muslim Charitable Foundation (GMCF) is a Shariah-compliant humanitarian portal delivering emergency meals, pediatric medical care, clean water and 100% Zakat-funded relief across Bangladesh and beyond.',
  applicationName: 'Global Muslim Charitable Foundation',
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/favicon.png', type: 'image/png' }],
  },
  // Carried over verbatim from the legacy document head.
  other: { 'shell-type': 'web_standard' },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${playfairDisplay.variable} ${notoSansBengali.variable}`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface font-sans text-on-surface antialiased">
        <SiteSettingsProvider>
          {children}
          <SiteSettingsBridge />
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
