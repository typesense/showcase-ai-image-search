import { Masonry } from 'react-plock';
import Image from 'next/image';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import Link from 'next/link';
import { _hit } from '@/types/typesenseResponse';

export default function InfiniteHits({ hits }: { hits: _hit[] }) {
  return (
    <Masonry
      className='min-h-screen'
      items={hits}
      config={{
        columns: [2, 4, 5, 6],
        gap: [3, 3, 3, 3],
        media: [640, 800, 900, 1024],
      }}
      render={({ document }, idx) => {
        document.prompt = capitalizeFirstLetter(document.prompt);
        return (
          <li
            className='group relative animate-[fadeIn_1s_ease-out_forwards] cursor-pointer list-none overflow-hidden rounded-sm' // react-plock sometimes render one item multiple times
            key={document.id + idx}
          >
            <Link href={`/${document.image_name}`}>
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? '/diffusiondb-20-images'}/${document.id}`}
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
            </Link>
          </li>
        );
      }}
    />
  );
}
