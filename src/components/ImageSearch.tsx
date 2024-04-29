'use client';
import useImageSearch from '@/hooks/useImageSearch';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { SearchParams } from 'typesense/lib/Typesense/Documents';
import InfiniteHits from './InfiniteHits';

/*
 * This component make queries to typesense using the props `searchParameters` and render the InfiniteHits
 */
export default function ImageSearch({
  searchParameters,
}: {
  searchParameters: SearchParams;
}) {
  const { hits, fetchNextPage, isLoading, isLastPage, isNoResults } =
    useImageSearch(searchParameters);
  const { ref, inView } = useInView({ threshold: 0.001 });

  // when the div is in view (which mean the user has reached the bottom of the page) -> fetchNextPage
  useEffect(() => {
    if (!inView || isLastPage) return;
    fetchNextPage();
  }, [inView]);

  const render = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    } else if (isNoResults) {
      return <div>No results were found.</div>;
    } else if (isLastPage) {
      return <div>That's all!</div>;
    } else
      return <div ref={ref} className='pointer-events-none mt-[-5vmax]'></div>;
  };
  return (
    <section className='flex flex-col items-center gap-20'>
      <div className='w-full overflow-hidden rounded-xl'>
        <InfiniteHits hits={hits} />
      </div>
      <div className='font-mono text-sm'>{render()}</div>
    </section>
  );
}
