import type { Metadata } from "next";

import AboutPage from "@/components/pages/AboutPage";

export const metadata: Metadata = {
  title: "About Us & Shariah Governance | Global Muslim Charitable Foundation",
  description:
    "Meet the scholars, trustees and audit partners behind GMCF's Shariah-compliant Zakat governance, four trust pillars and independent financial oversight.",
};

export default function Page() {
  return <AboutPage />;
}
