import type { Metadata } from 'next';
import ImageSearchUsingTextDescriptions from '@/components/ImageSearchUsingTextDescriptions';
import SearchBox from '@/components/SearchBox';
import Heading from '@/components/Heading';
import WithSuspense from '../components/WithSuspense';

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

      <WithSuspense>
        <SearchBox showExampleSearchTerms />
      </WithSuspense>

      <section className='mt-[6vmax]'>
        <WithSuspense>
          <ImageSearchUsingTextDescriptions />
        </WithSuspense>
      </section>
    </>
  );
}
