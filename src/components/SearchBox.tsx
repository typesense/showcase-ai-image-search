'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const [query, setQuery] = useState(q);

  return (
    <form
      className='sticky left-0 right-0 top-1 z-10 flex justify-center'
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/?q=${query}`);
      }}
    >
      <input
        className='h-[5vmax] max-h-12 w-[max(50vw,350px)] max-w-[95vw] rounded-xl border-2 border-dark-500 bg-dark-500 px-6 py-2 text-sm shadow-2xl shadow-[black] placeholder:opacity-50 focus:border-accent focus:border-opacity-40 focus:outline-none'
        type='text'
        placeholder='Search for images...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
