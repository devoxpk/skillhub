'use client';

import dynamic from 'next/dynamic';

const ReviewsRatingsManagement = dynamic(() => import('@/app/components/Admin/ReviewsRatingsManagement'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-64">Loading...</div>
});

export default function ReviewsRatingsPage() {
  return <ReviewsRatingsManagement />;
}