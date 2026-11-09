import type { Metadata } from "next";

import ImpactPage from "@/components/pages/ImpactPage";

export const metadata: Metadata = {
  title: "Impact & Case Studies | Global Muslim Charitable Foundation",
  description:
    "Read documented field case studies, audited impact metrics and family reunification stories from GMCF's humanitarian operations.",
};

export default function Page() {
  return <ImpactPage />;
}
