import ImageSearch from '@/components/ImageSearch';

export default function ExploreSimilarStylePage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <main className='flex flex-col gap-32 py-10'>
      <h1 className='text-7xl font-medium w-max m-auto'>Explore</h1>
      <ImageSearch
        searchParameters={{
          q: '*',
          per_page: 25,
          vector_query: `embedding:([], id:${params.slug})`,
        }}
      />
    </main>
  );
}
