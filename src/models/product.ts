import * as mongoose from 'mongoose';
import { Model, Schema } from 'mongoose';
import { iProduct } from '../types/models';

const collection = 'products';
const productSchema: Schema<iProduct> = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: {type: String, required: true},
  price: {type: Number, required: true},
  thumbnail: {type: String, required: false},
  description: {type: String, required: false},
});

export const productsModel: Model<iProduct> = mongoose.model(collection, productSchema);
