import mongoose from 'mongoose';
import { Model, Schema } from 'mongoose';
import { CartDto } from '../../types/dtos';

const collection = 'carts';
const cartSchema: Schema<CartDto> = new mongoose.Schema<CartDto>({
  id: { type: String, required: true, unique: true },
  timestamp: { type: Number, required: true },
  products: {
    type: [
      {
        id: { type: String, required: true },
        code: { type: String, required: true },
        quantity: { type: Number, required: true },
        timestamp: { type: Number, required: true },
      },
    ],
    required: true,
  },
});

export const cartModel: Model<CartDto> = mongoose.model(collection, cartSchema);
