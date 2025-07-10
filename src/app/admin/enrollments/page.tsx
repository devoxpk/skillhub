'use client';

import dynamic from 'next/dynamic';

const EnrollmentManagement = dynamic(() => import('@/app/components/Admin/EnrollmentManagement'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-64">Loading...</div>
});

export default function EnrollmentManagementPage() {
  return <EnrollmentManagement />;
}