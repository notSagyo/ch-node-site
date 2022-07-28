import { QueryConstraint } from '@firebase/firestore';
import mongoose from 'mongoose';
import { Router } from 'express';

interface iRouter {
  router: Router;
  apiRouter?: Router;
  initRoutes(): void;
}

interface iParser<T> {
  (obj: Partial<T> | Record<string, unknown> | null | undefined): T | null;
}

export type filterSql<T> = [string, string, string | number] | Partial<T>;
export type filterMongo<T> = mongoose.FilterQuery<T> | '*';
export type filterFirebase = QueryConstraint | '*';
/** SQL or NoSQL condition */
export type filterAny<T> = filterSql<T> | filterMongo<T> | filterFirebase;

// Express ===================================================================//
// Express session Declaration merging
// TODO: replace any type with iUser
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
    interface User {
      email: string;
    }
  }
}
