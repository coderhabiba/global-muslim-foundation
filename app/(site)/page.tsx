import type { Metadata } from "next";

import HomePage from "@/components/pages/HomePage";

export const metadata: Metadata = {
  title:
    "Global Muslim Charitable Foundation | Empowering Lives Through Faith & Stewardship",
  description:
    "Emergency meals, pediatric surgery, clean water wells and 100% Zakat-funded relief. Give securely, calculate your Zakat and follow verified field impact.",
};

export default function Page() {
  return <HomePage />;
}
