// src/app/search/page.tsx (or wherever this page component lives)
'use client';

import { Suspense } from 'react';
import SearchResults from '../components/SearchResults';

const SearchResult = () => {
  return (
    <Suspense fallback={<div>Loading search results…</div>}>
      <SearchResults />
    </Suspense>
  );
};

export default SearchResult;
