'use client';
import useImageSearch from '@/hooks/useImageSearch';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { Masonry } from 'react-plock';
import Modal from './Modal';

export default function ImageSearch() {
  const { hits, nextPage } = useImageSearch();
  const { ref, inView } = useInView({ threshold: 0.001 });
  const [activeHit, setActiveHit] = useState(null);
  useEffect(() => {
    if (inView) nextPage();
  }, [inView]);

  return (
    <>
      <section className='w-full'>
        <Masonry
          className='min-h-screen'
          items={hits}
          config={{
            columns: [2, 4, 6],
            gap: [6, 6, 6],
            media: [640, 768, 1024],
          }}
          render={({ document }: any) => (
            <li
              className='cursor-pointer list-none'
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
              <span>{document.prompt}</span>
            </li>
          )}
        />
        <div ref={ref} className='h-[10vh] mt-[-120vh]'></div>
      </section>

      {activeHit && (
        <Modal data={activeHit} handleClose={() => setActiveHit(null)} />
      )}
    </>
  );
}
