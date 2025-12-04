// @ts-nocheck
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const env = process.env.NODE_ENV || 'development';

dotenv.config({
  path:
    env === 'test' ? path.join(__dirname, '../tests/.env.test') : path.join(__dirname, '../.env'),
});

export default {
  env,
  port: process.env.PORT || 4444,
  mongoUrl: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
};
