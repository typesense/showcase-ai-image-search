import Typesense from 'typesense';

export const typesense = new Typesense.Client({
  apiKey: process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY || 'xyz',
  nodes: [
    {
      host: process.env.NEXT_PUBLIC_TYPESENSE_HOST || 'localhost',
      port: parseInt(process.env.NEXT_PUBLIC_TYPESENSE_PORT || '8108'),
      protocol: process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL || 'http',
    },
  ],
  connectionTimeoutSeconds: 60 * 60,
});

