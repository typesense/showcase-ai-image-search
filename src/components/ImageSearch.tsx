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
        render={({ document }: any) => (
          <div key={document.id} onClick={() => console.log(document)}>
            <Image
              src={`/part-1-2-2m/${document.id}`}
              width={0}
              height={0}
              sizes='20vw'
              style={{ width: '100%', height: 'auto' }}
              alt={document.prompt}
            />
            <span>{document.prompt}</span>
          </div>
        )}
      />
      <div ref={ref} className='h-[10vh] mt-[-120vh]'></div>
    </div>
  );
}
