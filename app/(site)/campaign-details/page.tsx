import type { Metadata } from "next";

import CampaignDetailsPage from "@/components/pages/CampaignDetailsPage";

export const metadata: Metadata = {
  title: "One Meal One Hope (Street Food Aid) | GMCF Appeal",
  description:
    "One Meal One Hope: sponsor hot, nutritious meals for street children with transparent budgets, verified distribution and Shariah-compliant giving.",
};

export default function Page() {
  return <CampaignDetailsPage />;
}
