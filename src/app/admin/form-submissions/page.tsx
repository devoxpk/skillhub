'use client';

import dynamic from 'next/dynamic';

const FormSubmissionsManagement = dynamic(
  () => import('@/app/components/Admin/FormSubmissionsManagement'),
  { ssr: false }
);

export default function FormSubmissionsPage() {
  return <FormSubmissionsManagement />;
}