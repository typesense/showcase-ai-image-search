import ImageSearch from '@/components/ImageSearch';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore | Typesense',
  description:
    "Explore similar style, using Typesense's image similarity search.",
};
export default function ExploreSimilarStylePage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <>
      <h1 className='m-auto w-max text-5xl font-medium'>Explore</h1>
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
