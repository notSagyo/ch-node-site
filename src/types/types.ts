import { QueryConstraint } from '@firebase/firestore';
import mongoose from 'mongoose';
import { Router } from 'express';

export interface IRouter {
  router: Router;
  apiRouter?: Router;
  initRoutes(): void;
}

export interface IParser<dto> {
  (obj: Partial<dto> | Record<string, unknown> | null | undefined): dto | null;
}

// Databases
export type filterSql<T> = [string, string, string | number] | Partial<T>;
export type filterMongo<T> = mongoose.FilterQuery<T> | '*';
export type filterFirebase = QueryConstraint | '*';
/** SQL or NoSQL condition */
export type filterAny<T> = filterSql<T> | filterMongo<T> | filterFirebase;
