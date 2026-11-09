import type { Metadata } from "next";

import ZakatCalculatorPage from "@/components/pages/ZakatCalculatorPage";

export const metadata: Metadata = {
  title:
    "Zakat Fund & Shariah Calculator | Global Muslim Charitable Foundation",
  description:
    "Calculate your Zakat with the current silver Nisab benchmark and give through a 100% Shariah-compliant, zero-deduction Zakat fund.",
};

export default function Page() {
  return <ZakatCalculatorPage />;
}
