// @ts-nocheck
import mongoose from 'mongoose';
import config from './config/config.js';
import app from './app.js';

let server;

export const start = async () => {
  try {
    await mongoose.connect(config.mongoUrl);
    console.log('MongoDB connected:', config.env);

    server = app.listen(config.port, () => console.log(`Server started on port ${config.port}`));

    return server;
  } catch (err) {
    console.error('Database connection error:', err);
  }
};

if (process.env.NODE_ENV !== 'test') {
  start();
}

export default app;
