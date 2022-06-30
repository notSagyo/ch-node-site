import * as mongoose from 'mongoose';
import { Model, Schema } from 'mongoose';
import { iProduct } from '../types';

const collection = 'products';
const productSchema: Schema<iProduct> = new mongoose.Schema({
  name: String,
  price: Number,
  thumbnail: String,
  description: String,
});

export const productsModel: Model<iProduct> = mongoose.model(collection, productSchema);
