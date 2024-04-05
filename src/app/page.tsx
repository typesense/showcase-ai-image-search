'use client';
import ImageSearch from '@/components/ImageSearch';
import { random } from '@/utils/random';
import { useSearchParams } from 'next/navigation';
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

export default function Home() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || popularKeywords[idx];
  return (
    <>
      <div>
        <h1 className='m-auto w-max text-5xl font-medium'>
          <span className='text-accent'>_</span>Diffusion Database Search.
        </h1>
        <h2 className='m-auto w-max text-lg'>
          powered by{' '}
          <a
            href='https://typesense.org/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-xl text-[#d90368]'
          >
            type<b>sense|</b>
          </a>
        </h2>
      </div>

      <ImageSearch
        searchParameters={{
          q: query,
          query_by: 'embedding',
          per_page: 25,
        }}
        key={query}
      />
    </>
  );
}
