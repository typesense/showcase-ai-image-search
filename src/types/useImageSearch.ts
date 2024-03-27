import { SearchParams } from 'typesense/lib/Typesense/Documents';

export type useImageSearchParams = SearchParams & {
  enableRandomPage?: boolean;
};
