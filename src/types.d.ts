import * as Knex from 'knex';
import mongoose from 'mongoose';

export interface iProduct {
  id?: number;
  name: string;
  price: number;
  thumbnail?: string;
  description?: string;
}

export interface iCartProduct extends iProduct {
  code: string;
  quantity: number;
  timestamp: number;
}

// Databases =================================================================//
type conditionSql<T> = [string, string, string | number] | Partial<T>;
type conditionMongo<T> = mongoose.FilterQuery<T>;
/** SQL or NoSQL condition */
type conditionAny<T> = conditionSql<T> | conditionMongo<T>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Container<T extends Record<string, any>> {
  insert(obj: T | T[]): Promise<boolean>;
  find(query?: conditionAny<T>, sortField?: string | Partial<T>, ascending?: boolean): Promise<Partial<T>[] | mongoose.Document<T>[]>;
  update(query: conditionAny<T>, obj: Partial<T>, limit?: number): Promise<boolean>;
  delete(query: conditionAny<T>, limit?: number): Promise<boolean>;
}

// SQL =======================================================================//
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface iKnexContainer<T extends Record<string, any>> extends Container<T> {
  options: Knex.Knex.Config;
  table: string;
  schema: string;

  createTable(callback: (table: Knex.Knex.TableBuilder) => void): Promise<boolean>;
  insert(obj: T | T[]): Promise<boolean>;
  find(condition?: conditionSql<T>, sortColumn?: string, ascending?: boolean): Promise<Partial<T>[]>
  delete(condition: conditionSql<T>): Promise<boolean>;
  update(condition: conditionSql<T>, obj: Partial<T>): Promise<boolean>;
}

// NoSQL =====================================================================//
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface iContainerNoSql <T extends Record<string, any>> extends Container<T> {
  model: mongoose.Model<T>;

  insert(obj: T | T[]): Promise<boolean>;
  find(query: conditionMongo<T>, sortField?: string, ascending?: boolean): Promise<Partial<T>[] | mongoose.Document<T>[]>;
  update(query: conditionMongo<T>, obj: Partial<T>, limit?: number): Promise<boolean>;
  delete(query: conditionMongo<T>, limit?: number): Promise<boolean>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface iMongoContainer<T extends Record<string, any>> extends iContainerNoSql<T> {
  model: mongoose.Model<T>;

  insert(obj: T | T[]): Promise<boolean>;
  find(query: conditionMongo<T>, sortField?: string, ascending?: boolean): Promise<mongoose.Document<T>[]>;
  update(query: conditionMongo<T>, obj: Partial<T>, limit?: number): Promise<boolean>;
  delete(query: conditionMongo<T>, limit?: number): Promise<boolean>;
}
