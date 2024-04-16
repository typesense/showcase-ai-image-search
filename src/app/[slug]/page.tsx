import Heading from '@/components/Heading';
import ImageSimilaritySearch from '@/components/ImageSimilaritySearch';
import SearchBox from '@/components/SearchBox';
import { typesense } from '@/lib/typesense';
import { _documentSchema } from '@/types/typesenseResponse';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore | Typesense',
  description:
    "Explore similar style, using Typesense's image similarity search.",
};

export default async function ExploreSimilarStylePage({
  params,
}: {
  params: { slug: string };
}) {
  const imageData = await getImageData(params.slug);

  return (
    <>
      <div className='mb-6'>
        <Heading />
      </div>
      <SearchBox />
      {imageData && <ImageSimilaritySearch imageData={imageData} />}
    </>
  );
}

async function getImageData(slug: string) {
  try {
    const res = await typesense
      .collections('DiffusionDB')
      .documents()
      .search({
        q: slug,
        query_by: 'image_name',
        per_page: 1,
        exclude_fields: ['embedding', 'out_of'], // reduce ~98.5% of bytes transferred over network
      });
    return res.hits?.[0].document as _documentSchema | undefined;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}
