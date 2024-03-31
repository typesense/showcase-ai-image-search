import ImageSearch from '@/components/ImageSearch';

export default function Home() {
  return (
    <>
      <div>
        <h1 className='m-auto mb-2 w-max text-5xl font-medium'>
          Diffusion Database Search
        </h1>
        <h2 className='m-auto w-max text-lg'>
          powered by{' '}
          <span className='text-xl text-[#d90368]'>
            type<b>sense|</b>
          </span>
        </h2>
      </div>

      <ImageSearch
        searchParameters={{
          q: '*',
          per_page: 25,
        }}
      />
    </>
  );
}
