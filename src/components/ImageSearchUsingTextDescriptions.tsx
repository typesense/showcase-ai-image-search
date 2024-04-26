// Thís file is a wrapper to use 'use client' directive
'use client';
import { random } from '@/utils/random';
import { useSearchParams } from 'next/navigation';
import ImageSearch from '@/components/ImageSearch';
import { POPULAR_KEYWORDS } from '@/utils/CONSTANTS';

const idx = random(0, POPULAR_KEYWORDS.length - 1);
/*
 * This component make image searches with the URL query param `?q=`
 */

export default function ImageSearchUsingTextDescriptions() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || POPULAR_KEYWORDS[idx];
  return (
    <ImageSearch
      searchParameters={{
        q: query,
        query_by: 'embedding',
        per_page: 25,
        vector_query: `embedding:([], distance_threshold: 0.8, k: 100)`,
        exclude_fields: ['embedding', 'out_of'], // reduce ~98.5% of bytes transferred over network
      }}
      key={query} // unmount the old instance and mount new one when query changes
    />
  );
}
