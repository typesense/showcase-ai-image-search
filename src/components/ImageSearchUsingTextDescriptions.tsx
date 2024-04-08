// Basically a wrapper to use 'use client' directive
'use client';
import { random } from '@/utils/random';
import { useSearchParams } from 'next/navigation';
import ImageSearch from '@/components/ImageSearch';

const popularKeywords = [
  'dog',
  'cat',
  'tree',
  'fire',
  'ice',
  'robot',
  'people',
  'ocean',
  'orange',
];
const idx = random(0, popularKeywords.length - 1);

export default function ImageSearchUsingTextDescriptions() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || popularKeywords[idx];
  return (
    <ImageSearch
      searchParameters={{
        q: query,
        query_by: 'embedding',
        per_page: 25,
      }}
      key={query}
    />
  );
}
