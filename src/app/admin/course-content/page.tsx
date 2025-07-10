'use client';

import dynamic from 'next/dynamic';

const CourseContentManagement = dynamic(() => import('@/app/components/Admin/CourseContentManagement'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-64">Loading...</div>
});

export default function CourseContentPage() {
  return <CourseContentManagement />;
}