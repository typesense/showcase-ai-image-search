import { typesense } from '@/lib/typesense';
import { _hit } from '@/types/typesenseResponse';
import { useEffect, useRef, useState } from 'react';
import { SearchParams } from 'typesense/lib/Typesense/Documents';

/*
 * Search logic for <ImageSearch/>
 */
export default function useImageSearch(searchParameters: SearchParams) {
  const page = useRef(0);
  const [hits, setHits] = useState<any>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    fetchNextPage();
  }, []);

  const fetchNextPage = async () => {
    setIsFetching(true);
    page.current++;
    try {
      const res = await typesense
        .collections('DiffusionDB')
        .documents()
        .search({
          ...searchParameters,
          page: page.current,
        });
      setIsLastPage(res.hits?.length ? false : true);
      setHits((prev: _hit[]) => [...prev, ...(res.hits || [])]);
    } catch (error) {
      alert('Sorry, there is an error fetching data!');
    } finally {
      setIsFetching(false);
    }
  };

  return { hits, fetchNextPage, isFetching, isLastPage };
}
