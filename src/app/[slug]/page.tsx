'use client';
import Heading from '@/components/Heading';
import ImageSimilaritySearch from '@/components/ImageSimilaritySearch';
import SearchBox from '@/components/SearchBox';
import { typesense } from '@/lib/typesense';
import { _documentSchema } from '@/types/typesenseResponse';
import { useEffect, useState, use } from 'react';

/*
 * This fetch the data from typesense server using dynamic page `slug` and pass it to `ImageSimilaritySearch` component
 * Since axios (typesense-js) does not work in edge runtime, we have to fetch data in client side
 */
export default function ExploreSimilarImagesPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = use(props.params);
  const [imageData, setImageData] = useState<_documentSchema>();

  useEffect(() => {
    (async () => setImageData(await getImageData(params.slug)))();
  }, []);

  return (
    <>
      <section className='mb-6'>
        <Heading />
      </section>
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
        q: '*',
        filter_by: `id:${slug}`, // using the `:` operator to improve performance since `id` doesn't contain spaces
        per_page: 1,
        exclude_fields: ['embedding', 'out_of'], // reduce ~98.5% of bytes transferred over network
      });
    return res.hits?.[0].document as _documentSchema | undefined;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

export const runtime = 'edge';
