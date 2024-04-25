import Typesense from 'typesense';
import 'dotenv/config';
import fs from 'fs';
import readline from 'readline';
import { resolve } from 'path';

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
    // there are additional fields in the data but they are display-only so we don't need to specify them
    fields: [
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

  console.log('Indexing diffusionDB images');
  await indexData(
    resolve(
      __dirname,
      process.env.DIFFUSION_DB_JSONL_FILE || './data/20-images.jsonl',
    ),
  );

  async function indexData(filename: string) {
    const fileStream = fs.createReadStream(filename);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let batch = [];
    let batchNumber = 0;

    for await (const line of rl) {
      if (line.trim()) {
        batch.push(JSON.parse(line));
        if (
          batch.length >= parseInt(process.env.INDEXING_BATCH_SIZE || '100')
        ) {
          console.log(`Indexing batch ${++batchNumber}`);
          await indexBatch(batch);
          batch = []; // Reset the batch after processing
        }
      }
    }
    if (batch.length > 0) {
      console.log(`Indexing batch ${++batchNumber}`);
      await indexBatch(batch);
    }
  }

  async function indexBatch(batch: any[]) {
    try {
      const returnData = await typesense
        .collections('DiffusionDB')
        .documents()
        .import(batch);
      console.log('Return data: ', returnData);
    } catch (error) {
      console.error('Batch import error:', error);
    }
  }
})();
