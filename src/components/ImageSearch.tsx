'use client';
import useImageSearch from '@/hooks/useImageSearch';
import Image from 'next/image';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { Masonry } from 'react-plock';

export default function ImageSearch() {
  const { hits, nextPage } = useImageSearch();
  const { ref, inView } = useInView({ threshold: 0.001 });

  useEffect(() => {
    if (inView) nextPage();
  }, [inView]);

  return (
    <div className='w-full'>
      <Masonry
        className='min-h-screen'
        items={hits}
        config={{
          columns: [2, 4, 6],
          gap: [6, 6, 6],
          media: [640, 768, 1024],
        }}
        render={(hit: any, idx) => (
          <div
            key={hit.document.image_name + idx}
            onClick={() => console.log(hit)}
          >
            <Image
              src={`/part-1-2-2m/${hit.document.image_name}`}
              width={0}
              height={0}
              sizes='20vw'
              style={{ width: '100%', height: 'auto' }}
              alt={hit.document.prompt}
            />
          </div>
        )}
      />
      <div ref={ref} className='h-10'></div>
    </div>
  );
}
