'use client';

import dynamic from 'next/dynamic';

const PayoutsManagement = dynamic(
  () => import('@/app/components/Admin/PayoutsManagement'),
  { ssr: false }
);

export default function PayoutsPage() {
  return <PayoutsManagement />;
}