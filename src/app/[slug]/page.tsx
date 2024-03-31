import ImageSearch from '@/components/ImageSearch';

export default function ExploreSimilarStylePage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <>
      <h1 className='m-auto w-max text-7xl font-medium'>
        <span className='text-accent'>_</span>Explore
      </h1>
      <ImageSearch
        searchParameters={{
          q: '*',
          per_page: 25,
          vector_query: `embedding:([], id:${params.slug})`,
        }}
      />
    </>
  );
}
