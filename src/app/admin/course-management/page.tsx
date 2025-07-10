'use client';

import dynamic from 'next/dynamic';

const CourseManagement = dynamic(() => import('@/app/components/Admin/CourseManagement'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-64">Loading...</div>
});

export default function CourseManagementPage() {
  return <CourseManagement />;
}