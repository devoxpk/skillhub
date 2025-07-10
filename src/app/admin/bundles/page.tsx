'use client';

import dynamic from 'next/dynamic';

const BundleManagement = dynamic(() => import('@/app/components/Admin/BundleManagement'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-64">Loading...</div>
});

export default function BundlesPage() {
  return <BundleManagement />;
}