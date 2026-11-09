import { Metadata } from 'next';
import AdminDashboard from '@/components/admin/AdminDashboard';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Global Muslim Charitable Foundation',
  description: 'Control panel for managing donations, volunteers, and charity campaigns.',
};

export default function Page() {
  return <AdminDashboard />;
}

