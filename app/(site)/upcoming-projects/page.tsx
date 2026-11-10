import { Metadata } from 'next';
import UpcomingProjectsPage from '@/components/pages/UpcomingProjectsPage';

export const metadata: Metadata = {
  title: 'Upcoming Projects | Global Muslim Charitable Foundation',
  description:
    'Explore upcoming sustainable humanitarian projects, orphanages, hospitals, and water plants by Global Muslim Charitable Foundation. Invest in permanent Sadaqah Jariyah.',
};

export default function Page() {
  return <UpcomingProjectsPage />;
}

