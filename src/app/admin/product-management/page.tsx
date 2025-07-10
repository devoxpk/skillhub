'use client';

import dynamic from 'next/dynamic';

const ProductManagement = dynamic(() => import('@/app/components/Admin/ProductManagement'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-64">Loading...</div>
});

export default function ProductManagementPage() {
  return <ProductManagement />;
}