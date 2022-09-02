import { QueryConstraint } from '@firebase/firestore';
import mongoose from 'mongoose';
import { Router } from 'express';
import { iUser } from './models';

interface iRouter {
  router: Router;
  apiRouter?: Router;
  initRoutes(): void;
}

interface iParser<T> {
  (obj: Partial<T> | Record<string, unknown> | null | undefined): T | null;
}

// Databases
export type filterSql<T> = [string, string, string | number] | Partial<T>;
export type filterMongo<T> = mongoose.FilterQuery<T> | '*';
export type filterFirebase = QueryConstraint | '*';
/** SQL or NoSQL condition */
export type filterAny<T> = filterSql<T> | filterMongo<T> | filterFirebase;

// Express ===================================================================//
// Express session Declaration merging
declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: unknown };
    isAdmin: boolean;
  }
}

declare module 'Express' {
  export interface User {
    email: string;
    password: string;
  }
}

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends iUser {}
  }
}
