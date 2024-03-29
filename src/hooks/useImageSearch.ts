import { typesense } from '@/lib/typesense';
import { useImageSearchParams } from '@/types/useImageSearch';
import { random } from '@/utils/random';
import { useEffect, useState } from 'react';

// simulate randomness
let randomPage = random(0, 80);

export default function useImageSearch({
  enableRandomPage,
  ...searchParameters
}: useImageSearchParams) {
  const [hits, setHits] = useState<any>([]);

  useEffect(() => {
    if (!enableRandomPage) randomPage = 0;
    nextPage();
  }, []);

  const nextPage = async () => {
    if (randomPage >= 80 && enableRandomPage) randomPage = 0;
    randomPage++;
    try {
      const res = await typesense
        .collections('DiffusionDB')
        .documents()
        .search({
          ...searchParameters,
          page: randomPage,
        });
      console.log(res);

      setHits((prev: any) => [...prev, ...(res.hits || [])]);
    } catch (error) {
      alert('Sorry, there is an error fetching data!');
    }
  };
  return { hits, nextPage };
}
