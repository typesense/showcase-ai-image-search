import ImageSearch from '@/components/ImageSearch';

export default function Home() {
  return (
    <main className='flex flex-col gap-32 py-10'>
      <h1 className='text-7xl font-medium w-max m-auto'>
        DIFFUSION DATABASE <br /> SEARCH{' '}
        <span className='text-3xl'>powered by TYPESENSE</span>
      </h1>
      <ImageSearch />
    </main>
  );
}
