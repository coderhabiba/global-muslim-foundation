import { Metadata } from 'next';
import LoginPage from '@/components/pages/LoginPage';

export const metadata: Metadata = {
  title: 'Admin Login | Global Muslim Charitable Foundation',
  description: 'GMCF Staff and Admin management portal login.',
};

export default function Page() {
  return <LoginPage />;
}

