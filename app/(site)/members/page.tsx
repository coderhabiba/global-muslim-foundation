import { Metadata } from 'next';
import { Suspense } from 'react';
import MembersVolunteersPage from '@/components/pages/MembersVolunteersPage';

export const metadata: Metadata = {
  title: 'সদস্য ও স্বেচ্ছাসেবী দল (Members & Volunteers) | Global Muslim Charitable Foundation',
  description:
    'গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশনের পরিচালনা পর্ষদ, সম্মানিত ট্রাস্টি, প্রকল্প কর্মকর্তা এবং মাঠপর্যায়ের নিবেদিতপ্রাণ স্বেচ্ছাসেবী দল।',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading Members...</div>}>
      <MembersVolunteersPage />
    </Suspense>
  );
}

