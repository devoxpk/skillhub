'use client';

import { Suspense } from 'react';
import MarketingInstructor from '@/app/components/Instructor/Marketing';

const InstructorMarketingPage = () => {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <MarketingInstructor />
    </Suspense>
  );
};

export default InstructorMarketingPage;
