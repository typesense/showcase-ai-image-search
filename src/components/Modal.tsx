import Image from 'next/image';
import { _documentSchema } from '@/types/typesenseResponse';
import { SAMPLER } from '@/utils/CONSTANTS';

type _props = {
  imageData: _documentSchema;
  handleClose: () => void;
};
/*
 * This component render a modal that display image prompt data
 */
export default function Modal({ imageData, handleClose }: _props) {
  return (
    <section className='fixed inset-0 z-20 grid animate-[fadeIn_0.1s_ease-out_forwards] place-items-center'>
      <div className='relative z-30 flex h-[90vh] w-[80vw] gap-5 overflow-y-auto rounded-xl bg-dark-900 max-lg:w-[100vw] max-lg:flex-col'>
        <div className='relative flex h-1 w-[70%] rounded-xl bg-dark-950 p-4 max-lg:w-full max-lg:flex-1 max-lg:p-2 lg:h-full'>
          <Image
            className='flex-1 object-contain'
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? 'https://ai-image-search-images.typesense.org'}/${imageData.image_name}`}
            width={0}
            height={0}
            sizes='80vw'
            alt={imageData.prompt}
            unoptimized
          />
        </div>
        <div className='flex h-max flex-col gap-8 px-5 py-8 lg:flex-1 [&_p]:font-mono [&_p]:text-sm [&_span]:mb-2 [&_span]:block [&_span]:text-xs [&_span]:font-bold [&_span]:text-white-300'>
          <div>
            <span>PROMPT</span>
            <p>{imageData.prompt}</p>
          </div>
          <div className='grid grid-cols-2 gap-5'>
            <div>
              <span>SEED</span>
              <p>{imageData.seed}</p>
            </div>
            <div>
              <span>CFG SCALE</span>
              <p>{imageData.cfg}</p>
            </div>
            <div>
              <span>STEPS</span>
              <p>{imageData.step}</p>
            </div>
            <div>
              <span>SAMPLER</span>
              <p>{SAMPLER[imageData.sampler as keyof typeof SAMPLER]}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className='fixed inset-0 z-20 cursor-pointer bg-[black] opacity-70'
        onClick={handleClose}
      ></div>
    </section>
  );
}
