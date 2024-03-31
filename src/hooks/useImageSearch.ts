import { typesense } from '@/lib/typesense';
import { useEffect, useState } from 'react';
import { SearchParams } from 'typesense/lib/Typesense/Documents';

let page = 0;

export default function useImageSearch(searchParameters: SearchParams) {
  const [hits, setHits] = useState<any>([]);
  const [searchBoxParams, setSearchBoxParams] = useState<SearchParams | null>(
    null,
  );
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchNextPage();
  }, []);

  const fetchNextPage = async () => {
    setIsFetching(true);
    page++;
    try {
      const res = await typesense
        .collections('DiffusionDB')
        .documents()
        .search({
          ...(searchBoxParams || searchParameters),
          page,
        });
      setHits((prev: any) => [...prev, ...(res.hits || [])]);
    } catch (error) {
      alert('Sorry, there is an error fetching data!');
    } finally {
      setIsFetching(false);
    }
  };

  const search = (searchParams: SearchParams) =>
    setSearchBoxParams(searchParams);

  useEffect(() => {
    if (!searchBoxParams?.q) return;
    setHits([]);
    page = 0;

    fetchNextPage();
  }, [searchBoxParams?.q]);

  return { hits, fetchNextPage, search, isFetching };
}
