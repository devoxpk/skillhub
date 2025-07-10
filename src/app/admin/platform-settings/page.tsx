'use client';

import dynamic from 'next/dynamic';

const PlatformSettings = dynamic(() => import('@/app/components/Admin/PlatformSettings'), { ssr: false });

export default function PlatformSettingsPage() {
  return <PlatformSettings />;
}