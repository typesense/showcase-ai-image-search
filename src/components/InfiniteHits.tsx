import { Masonry } from 'react-plock';
import Image from 'next/image';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';

export default function InfiniteHits({ hits, setActiveHit }: any) {
  return (
    <Masonry
      className='min-h-screen'
      items={hits}
      config={{
        columns: [2, 4, 6],
        gap: [3, 3, 3],
        media: [640, 768, 1024],
      }}
      render={({ document }: any, idx) => {
        document.prompt = capitalizeFirstLetter(document.prompt);
        return (
          <li
            className='group relative animate-fadeIn cursor-pointer list-none overflow-hidden rounded-sm'
            onClick={() => setActiveHit(document)}
            // react-plock sometimes render one item multiple times
            key={document.id + idx}
          >
            <Image
              src={`/diffusiondb-images/${document.id}`}
              width={0}
              height={0}
              sizes='20vw'
              style={{ width: '100%', height: 'auto' }}
              alt={document.prompt}
            />
            <div className='absolute inset-0 flex items-end bg-gradient-to-b  from-[#fff0] to-[black] p-2 opacity-0 transition group-hover:opacity-100'>
              <span className='line-clamp-3 font-mono text-xs font-medium'>
                {document.prompt}
              </span>
            </div>
          </li>
        );
      }}
    />
  );
}
