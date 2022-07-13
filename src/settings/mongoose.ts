import { ConnectOptions } from 'mongoose';

interface iMongooseOptions {
  uri: string,
  options?: ConnectOptions
}

export const mongooseOptions: iMongooseOptions = {
  uri: 'mongodb://127.0.0.1:27017',
  options: { dbName: 'ecommerce' }
};
