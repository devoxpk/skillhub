// src/app/instructor/sales/page.tsx
'use client';

import { Suspense } from 'react';
import SalesHistoryInstructor from '@/app/components/Instructor/SalesHistory';

const InstructorSalesPage = () => {
  return (
    <Suspense fallback={<div>Loading sales history…</div>}>
      <div style={{ minWidth: '3500px' }} />
      <SalesHistoryInstructor />
    </Suspense>
  );
};

export default InstructorSalesPage;
