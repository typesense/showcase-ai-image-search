import { typesense } from '@/lib/typesense';
import { useImageSearchParams } from '@/types/useImageSearch';
import { random } from '@/utils/random';
import { useEffect, useState } from 'react';
import { SearchParams } from 'typesense/lib/Typesense/Documents';

// simulate randomness
let randomPage = random(0, 80);

export default function useImageSearch({
  enableRandomPage,
  ...searchParameters
}: useImageSearchParams) {
  const [page, setPage] = useState(enableRandomPage ? randomPage : 1);
  const [hits, setHits] = useState<any>([]);
  const [searchBoxParams, setSearchBoxParams] = useState<SearchParams | null>(
    null,
  );

  useEffect(() => {
    nextPage();
  }, []);

  const nextPage = async (customSearchParams?: SearchParams | null) => {
    try {
      const res = await typesense
        .collections('DiffusionDB')
        .documents()
        .search({
          ...(customSearchParams || searchParameters),
          page,
        });
      console.log(res);
      setPage((prev) => (prev > 79 && enableRandomPage ? 1 : prev + 1));

      setHits((prev: any) => [...prev, ...(res.hits || [])]);
    } catch (error) {
      alert('Sorry, there is an error fetching data!');
    }
  };

  const search = (searchParams: SearchParams) =>
    setSearchBoxParams(searchParams);

  useEffect(() => {
    if (!searchBoxParams?.q) return;
    setHits([]);
    setPage(0);
    nextPage(searchBoxParams);
  }, [searchBoxParams?.q]);

  return { hits, nextPage, search };
}
