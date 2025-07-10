'use client';

import dynamic from 'next/dynamic';

const AdminDashboard = dynamic(() => import('@/app/components/Admin/Dashboard'), { ssr: false });

export default function AdminDashboardPage() {
  return <AdminDashboard />;
}