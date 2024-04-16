import { SearchResponseHit } from 'typesense/lib/Typesense/Documents';

export type _documentSchema = {
  id: string;
  cfg: number;
  image_name: string;
  prompt: string;
  sampler: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  seed: string;
  step: string;
};

export type _hit = SearchResponseHit<_documentSchema>;
