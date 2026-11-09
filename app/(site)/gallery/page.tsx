import { Metadata } from 'next';
import GalleryPage from '@/components/pages/GalleryPage';

export const metadata: Metadata = {
  title: 'ফটো গ্যালারি ও ফিল্ড কার্যক্রম | Global Muslim Charitable Foundation',
  description:
    'গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশনের মাঠপর্যায়ের কার্যক্রম, বিশুদ্ধ পানি, খাদ্য বিতরণ, এতিম সেবা এবং গৃহনির্মাণ প্রকল্পের স্থিরচিত্র গ্যালারি।',
};

export default function Page() {
  return <GalleryPage />;
}
