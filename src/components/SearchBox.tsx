'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { EXAMPLE_SEARCH_TERMS } from '@/utils/CONSTANTS';

/*
 * This component contain a search box and a form that when submitted will push the route to /?q={searchBoxValue}
 */
export default function SearchBox({
  showExampleSearchTerms,
}: {
  showExampleSearchTerms?: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const [query, setQuery] = useState(q);

  useEffect(() => {
    setQuery(q);
  }, [q]);

  return (
    <>
      <form
        className='sticky left-0 right-0 top-1 z-10 flex flex-col items-center'
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/?q=${query}`);
        }}
      >
        <input
          className='h-[5vmax] max-h-12 min-h-10 w-[max(50vw,350px)] max-w-[95vw] rounded-xl border-2 border-dark-500 bg-dark-500 px-6 py-2 text-sm shadow-2xl shadow-[black] placeholder:opacity-50 focus:border-accent focus:border-opacity-40 focus:outline-none'
          type='text'
          placeholder='Search for images...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      {showExampleSearchTerms && (
        <ul className='m-auto mt-2 flex w-[max(50vw,350px)] max-w-[95vw] gap-1 overflow-x-auto font-mono text-xs text-white-400'>
          <span>Try:</span>{' '}
          {EXAMPLE_SEARCH_TERMS.map((item, idx) => (
            <Link
              className='group'
              href={`/?q=${item}`}
              type='submit'
              key={item}
            >
              <span className='underline underline-offset-2 transition duration-200 group-hover:text-white-300'>
                {item}
              </span>
              {idx < EXAMPLE_SEARCH_TERMS.length - 1 && ','}
            </Link>
          ))}
        </ul>
      )}
    </>
  );
}
