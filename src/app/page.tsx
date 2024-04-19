import type { Metadata } from 'next';
import ImageSearchUsingTextDescriptions from '@/components/ImageSearchUsingTextDescriptions';
import SearchBox from '@/components/SearchBox';
import Heading from '@/components/Heading';

export const metadata: Metadata = {
  title: 'AI Image Search | Typesense',
  description: 'Search for images using text descriptions of their content.',
};

export default function Home() {
  return (
    <>
      <section className='mb-6'>
        <Heading />
      </section>
      <SearchBox showExampleSearchTerms />
      <section className='mt-[6vmax]'>
        <ImageSearchUsingTextDescriptions />
      </section>
    </>
  );
}
