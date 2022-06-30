import * as mongoose from 'mongoose';
import { Model, Schema } from 'mongoose';
import { iCart } from '../types';

const collection = 'carts';
const cartSchema: Schema<iCart> = new mongoose.Schema({
  id: {type: String, required: true, unique: true},
  timestamp: {type: Number, required: true},
  products: {type: [{
    code: {type: String, required: true},
    quantity: {type: Number, required: true},
    timestamp: {type: Number, required: true},
  }], required: true},
});

export const cartModel: Model<iCart> = mongoose.model(collection, cartSchema);
