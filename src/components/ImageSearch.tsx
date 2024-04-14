'use client';
import useImageSearch from '@/hooks/useImageSearch';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Modal from './Modal';

import { SearchParams } from 'typesense/lib/Typesense/Documents';
import InfiniteHits from './InfiniteHits';

export default function ImageSearch({
  searchParameters,
}: {
  searchParameters: SearchParams;
}) {
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
        <div className='min-h-[120vh] w-full overflow-hidden rounded-xl'>
          <InfiniteHits hits={hits} setActiveHit={setActiveHit} />
        </div>
        {isLastPage ? (
          <div className='font-mono text-sm'>That's all!</div>
        ) : (
          <div
            ref={ref}
            className='pointer-events-none mt-[-5vmax] font-mono text-sm'
          >
            {isFetching && 'Loading...'}
          </div>
        )}
      </section>

      {activeHit && (
        <Modal data={activeHit} handleClose={() => setActiveHit(null)} />
      )}
    </>
  );
}
