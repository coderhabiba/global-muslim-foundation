import type { Metadata } from "next";

import AppealsPage from "@/components/pages/AppealsPage";

export const metadata: Metadata = {
  title: "Active Appeals & Causes | Global Muslim Charitable Foundation",
  description:
    "Browse verified emergency appeals across Bangladesh: street meals, pediatric eye surgery, clean water wells, winter blankets and 100% Zakat-eligible funds.",
};

export default function Page() {
  return <AppealsPage />;
}
