import Image from 'next/image';
import Link from 'next/link';

const SAMPLER = {
  1: 'ddim',
  2: 'plms',
  3: 'k_euler',
  4: 'k_euler_ancestral',
  5: 'k_heun',
  6: 'k_dpm_2',
  7: 'k_dpm_2_ancestral',
  8: 'k_lms',
  9: 'others',
};
export default function Modal({ data, handleClose }: any) {
  return (
    <section className='fixed inset-0 grid place-items-center'>
      <div className='flex relative z-10 w-[80vw] h-[90vh] gap-10 bg-slate-950 rounded-xl'>
        <div className='relative w-[70%] h-full grid place-items-center rounded-xl bg-black'>
          <Image
            className='w-full h-full max-h-[90vh] object-contain'
            src={`/part-1-2-2m/${data.id}`}
            width={0}
            height={0}
            sizes='80vw'
            alt={data.prompt}
          />
        </div>
        <div className='flex-1'>
          <span>Prompt</span>
          <p>{data.prompt}</p>
          <span>Seed</span>
          <p>{data.seed}</p>
          <span>CFG scale</span>
          <p>{data.cfg}</p>
          <span>Steps</span>
          <p>{data.step}</p>
          <span>Sampler</span>
          <p>{SAMPLER[data.sampler]}</p>
          <Link href={`/${data.id}`}>Explore similar style</Link>
        </div>
      </div>
      <div
        className='fixed inset-0 z-0 bg-slate-950 opacity-70'
        onClick={handleClose}
      ></div>
    </section>
  );
}
