'use client';
import useImageSearch from '@/hooks/useImageSearch';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Modal from './Modal';

import { SearchParams } from 'typesense/lib/Typesense/Documents';
import InfiniteHits from './InfiniteHits';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ImageSearch({
  searchParameters,
}: {
  searchParameters: SearchParams;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const [query, setQuery] = useState(q);

  const { hits, fetchNextPage, isFetching, isLastPage } =
    useImageSearch(searchParameters);
  const { ref, inView } = useInView({ threshold: 0.001 });
  const [activeHit, setActiveHit] = useState(null);

  useEffect(() => {
    if (!inView || isLastPage) return;
    fetchNextPage();
  }, [inView]);

  useEffect(() => {
    document.body.style.overflowY = activeHit ? 'hidden' : 'auto';
  }, [activeHit]);
  return (
    <>
      <section className='flex flex-col items-center gap-20'>
        <form
          className='sticky left-0 right-0 top-1 z-10'
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/?q=${query}`);
          }}
        >
          <input
            className='m-auto h-12 w-[max(50vw,300px)] rounded-xl border-2 border-dark-500 bg-dark-500 px-6 py-2 shadow-2xl shadow-[black] placeholder:opacity-50 focus:border-accent focus:border-opacity-40 focus:outline-none'
            type='text'
            placeholder='Search for images...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>

        <div className='min-h-[120vh] w-full overflow-hidden rounded-xl'>
          <InfiniteHits hits={hits} setActiveHit={setActiveHit} />
        </div>
        {isLastPage && <div className='font-mono'>That's all!</div>}
        <div ref={ref} className='pointer-events-none mt-[-5vmax] font-mono'>
          {isFetching && 'Loading...'}
        </div>
      </section>

      {activeHit && (
        <Modal data={activeHit} handleClose={() => setActiveHit(null)} />
      )}
    </>
  );
}
