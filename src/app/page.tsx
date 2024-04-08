import type { Metadata } from 'next';
import ImageSearchUsingTextDescriptions from '@/components/ImageSearchUsingTextDescriptions';

export const metadata: Metadata = {
  title: 'AI Image Search | Typesense',
  description: 'Search for images using text descriptions of their content.',
};

export default function Home() {
  return (
    <>
      <div>
        <h1 className='m-auto w-max text-5xl font-medium'>
          DiffusionDB Search
        </h1>
      </div>
      <ImageSearchUsingTextDescriptions />
    </>
  );
}
