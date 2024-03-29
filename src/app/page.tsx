import ImageSearch from '@/components/ImageSearch';

export default function Home() {
  return (
    <main className='flex flex-col gap-32 py-10'>
      <div>
        <h1 className='m-auto mb-2 w-max text-6xl font-medium'>
          Diffusion Database Search
        </h1>
        <h2 className='m-auto w-max text-xl'>
          powered by{' '}
          <span className='text-2xl text-[#d90368]'>
            type<b>sense|</b>
          </span>
        </h2>
      </div>

      <ImageSearch
        searchParameters={{
          q: '*',
          per_page: 25,
          enableRandomPage: true,
        }}
      />
    </main>
  );
}
