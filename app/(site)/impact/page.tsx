import type { Metadata } from "next";

import ImpactPage from "@/components/pages/ImpactPage";

export const metadata: Metadata = {
  title: "আমাদের প্রজেক্ট সমূহ | Our Foundation Projects | Global Muslim Charitable Foundation",
  description:
    "গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশন (GMCF)-এর বাস্তবায়িত ও চলমান মানবিক প্রকল্পসমূহ। নিরাপদ টিনের ঘর নির্মাণ, ওয়ান মিল ওয়ান হোপ, চোখের ছানি অপারেশন ও গভীর নলকূপ।",
};

export default function Page() {
  return <ImpactPage />;
}
