import { QueryConstraint } from '@firebase/firestore';
import mongoose from 'mongoose';

export interface iProduct {
  id: string;
  name: string;
  price: number;
  thumbnail?: string;
  description?: string;
}

export interface iCartProduct {
  id: string;
  code: string;
  quantity: number;
  timestamp: number;
}

export interface iCart {
  id: string;
  timestamp: number;
  products: iCartProduct[];
}

export type filterSql<T> = [string, string, string | number] | Partial<T>;
export type filterMongo<T> = mongoose.FilterQuery<T> | '*';
export type filterFirebase = QueryConstraint | '*';
/** SQL or NoSQL condition */
export type filterAny<T> = filterSql<T> | filterMongo<T> | filterFirebase;
