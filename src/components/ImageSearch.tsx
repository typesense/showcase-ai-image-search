'use client';
import useImageSearch from '@/hooks/useImageSearch';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { Masonry } from 'react-plock';
import Modal from './Modal';
import { useImageSearchParams } from '@/types/useImageSearch';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';

export default function ImageSearch({
  searchParameters,
}: {
  searchParameters: useImageSearchParams;
}) {
  const { hits, nextPage, search } = useImageSearch(searchParameters);
  const { ref, inView } = useInView({ threshold: 0.001 });
  const [activeHit, setActiveHit] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!inView) return;
    nextPage(query ? { q: query, query_by: 'embedding' } : null);
  }, [inView]);

  useEffect(() => {
    search({ q: query, query_by: 'embedding' });
  }, [query]);

  return (
    <>
      <section>
        <input
          className='border border-accent bg-dark-900'
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className='min-h-[120vh] w-full overflow-hidden rounded-xl'>
          <Masonry
            className='min-h-screen'
            items={hits}
            config={{
              columns: [2, 4, 6],
              gap: [3, 3, 3],
              media: [640, 768, 1024],
            }}
            render={({ document }: any) => {
              document.prompt = capitalizeFirstLetter(document.prompt);
              return (
                <li
                  className='group relative animate-fadeIn cursor-pointer list-none overflow-hidden rounded-sm'
                  onClick={() => setActiveHit(document)}
                  key={document.id}
                >
                  <Image
                    src={`/part-1-2-2m/${document.id}`}
                    width={0}
                    height={0}
                    sizes='20vw'
                    style={{ width: '100%', height: 'auto' }}
                    alt={document.prompt}
                  />
                  <div className='absolute inset-0 flex items-end bg-gradient-to-b  from-[#fff0] to-[black] p-2 opacity-0 transition group-hover:opacity-100'>
                    <span className='line-clamp-3 text-xs font-medium'>
                      {document.prompt}
                    </span>
                  </div>
                </li>
              );
            }}
          />
        </div>
        <div ref={ref} className='pointer-events-none mt-[-5vmax]'></div>
      </section>

      {activeHit && (
        <Modal data={activeHit} handleClose={() => setActiveHit(null)} />
      )}
    </>
  );
}
