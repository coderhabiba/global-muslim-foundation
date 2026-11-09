import { Metadata } from 'next';
import SponsorOrphanPage from '@/components/pages/SponsorOrphanPage';

export const metadata: Metadata = {
  title: 'Sponsor An Orphan | Global Muslim Charitable Foundation',
  description:
    'Sponsor a vulnerable or orphaned child in Bangladesh. Provide complete food, shelter, Islamic moral education, Quran Hifz, and healthcare.',
};

export default function Page() {
  return <SponsorOrphanPage />;
}
