// @ts-nocheck
import mongoose from 'mongoose';

export default async () => {
  console.log('Cleaning test database...');

  await mongoose.disconnect();

  if (global.__SERVER__) {
    global.__SERVER__.close();
  }

  console.log('Test DB cleaned and connection closed');
};
