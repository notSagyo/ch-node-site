import mongoose from 'mongoose';
import { Model, Schema } from 'mongoose';
import { ProductDto } from '../../types/dtos';

const collection = 'products';
const productSchema: Schema<ProductDto> = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: false },
  description: { type: String, required: false },
});

export const productsModel: Model<ProductDto> = mongoose.model(
  collection,
  productSchema
);
