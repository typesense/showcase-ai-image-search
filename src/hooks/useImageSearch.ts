import { typesense } from '@/lib/typesense';
import { random } from '@/utils/random';
import { useEffect, useState } from 'react';
import { SearchParams } from 'typesense/lib/Typesense/Documents';

let randomPage = random(0, 80);
let searchParameters: SearchParams = {
  q: '*',
  per_page: 25,
};

export default function useImageSearch() {
  const [hits, setHits] = useState<any>([]);

  useEffect(() => {
    nextPage();
    console.log('fired');
  }, []);

  const nextPage = async () => {
    if (randomPage >= 80) randomPage = -1;
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
