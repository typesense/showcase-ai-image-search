import Typesense from 'typesense';
import 'dotenv/config';
import diffusionDB from './data/20-images.json';

(async () => {
  console.log('Connecting to typesense server...');

  const typesense = new Typesense.Client({
    apiKey: process.env.TYPESENSE_ADMIN_API_KEY || 'xyz',
    nodes: [
      {
        host: process.env.NEXT_PUBLIC_TYPESENSE_HOST || 'localhost',
        port: parseInt(process.env.NEXT_PUBLIC_TYPESENSE_PORT || '8108'),
        protocol: process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL || 'http',
      },
    ],
    connectionTimeoutSeconds: 60 * 60,
  });

  try {
    await typesense.collections('DiffusionDB').retrieve();
    console.log('Found existing collection of DiffusionDB');

    if (process.env.FORCE_REINDEX !== 'true')
      return console.log('FORCE_REINDEX = false. Canceling operation...');

    console.log('Deleting collection');
    await typesense.collections('DiffusionDB').delete();
  } catch (err) {
    console.error(err);
  }

  console.log('Creating schema...');

  await typesense.collections().create({
    name: 'DiffusionDB',
    fields: [
      {
        name: 'image_name',
        type: 'string',
      },
      {
        name: 'prompt',
        type: 'string',
      },
      {
        name: 'seed',
        type: 'string',
      },
      {
        name: 'step',
        type: 'string',
      },
      {
        name: 'cfg',
        type: 'auto',
      },
      {
        name: 'sampler',
        type: 'string',
      },
      {
        name: 'image',
        type: 'image',
        store: false,
      },
      {
        name: 'embedding',
        type: 'float[]',
        embed: {
          from: ['image'],
          model_config: {
            model_name: 'ts/clip-vit-b-p32',
          },
        },
      },
    ],
  });

  console.log('Indexing diffusionDB test 20 images');
  await indexData(diffusionDB);

  async function indexData(data: any) {
    try {
      const returnData = await typesense
        .collections('DiffusionDB')
        .documents()
        .import(data);

      console.log('Return data: ', returnData);
    } catch (error) {
      console.log(error);
    }
  }
})();
