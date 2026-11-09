import type { Metadata } from "next";

import VolunteerPage from "@/components/pages/VolunteerPage";

export const metadata: Metadata = {
  title: "Youth Volunteers Field Portal | Global Muslim Charitable Foundation",
  description:
    "Apply to the GMCF youth volunteer cohort, explore field roles, training requirements and real stories from 850+ frontline volunteers.",
};

export default function Page() {
  return <VolunteerPage />;
}
