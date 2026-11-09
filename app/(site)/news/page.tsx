import { Metadata } from 'next';
import CurrentNewsPage from '@/components/pages/CurrentNewsPage';

export const metadata: Metadata = {
  title: 'Current News & Field Reports | Global Muslim Charitable Foundation',
  description:
    'Stay updated with real-time news, photographic evidence, and press releases of our ongoing relief, orphan, and clean water operations across Bangladesh.',
};

export default function Page() {
  return <CurrentNewsPage />;
}
