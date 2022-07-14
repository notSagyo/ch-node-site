import { QueryConstraint } from '@firebase/firestore';
import mongoose from 'mongoose';

interface iParser<T> {
  (obj: Partial<T> | Record<string, unknown> | null | undefined): T | null;
}

export type filterSql<T> = [string, string, string | number] | Partial<T>;
export type filterMongo<T> = mongoose.FilterQuery<T> | '*';
export type filterFirebase = QueryConstraint | '*';
/** SQL or NoSQL condition */
export type filterAny<T> = filterSql<T> | filterMongo<T> | filterFirebase;

