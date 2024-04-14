'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
const keywords = ['Autumn', 'House', 'Fox', 'Dog', 'Cat', 'Sea', 'Robot'];

export default function SearchBox() {
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
          className='mb-2 h-[5vmax] max-h-12 min-h-10 w-[max(50vw,350px)] max-w-[95vw] rounded-xl border-2 border-dark-500 bg-dark-500 px-6 py-2 text-sm shadow-2xl shadow-[black] placeholder:opacity-50 focus:border-accent focus:border-opacity-40 focus:outline-none'
          type='text'
          placeholder='Search for images...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      <ul className='text-white-400 m-auto flex w-[max(50vw,350px)] max-w-[95vw] gap-1 font-mono text-xs'>
        <span>Try:</span>{' '}
        {keywords.map((item, idx) => (
          <Link className='group' href={`/?q=${item}`} type='submit' key={item}>
            <span className='transition duration-200 group-hover:text-white-300'>
              {item}
            </span>
            {idx < keywords.length - 1 && ','}
          </Link>
        ))}
      </ul>
    </>
  );
}
