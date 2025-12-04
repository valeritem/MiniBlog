// @ts-nocheck
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

process.env.NODE_ENV = 'test';

export default async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  dotenv.config({
    path: path.join(__dirname, '.env.test'),
  });

  console.log('GLOBAL SETUP | NODE_ENV:', process.env.NODE_ENV);
  console.log('GLOBAL SETUP | MONGO_URL:', process.env.MONGO_URL);

  const { start } = await import('../index.js');
  await start();
};
