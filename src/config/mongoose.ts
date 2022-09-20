import { ConnectOptions } from 'mongoose';

interface iMongooseOptions {
  uri: string;
  options?: ConnectOptions;
}

export const mongooseOptions: iMongooseOptions = {
  uri:
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}` +
    '@cluster0.3dem9pw.mongodb.net/?retryWrites=true&w=majority',
  options: { dbName: 'ecommerce' },
};
