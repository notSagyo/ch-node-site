import * as Knex from 'knex';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface iKnexContainer<T extends Record<string, any>> {
  options: Knex.Knex.Config;
  table: string;
  schema: string;

  createTable(callback: (table: Knex.Knex.TableBuilder) => void): Promise<boolean>;
  insert(obj: T | T[]): Promise<boolean>;
  select(column: string): Promise<Partial<T>[]>;
  selectWhere(columns: string | string[], condition: [string, string, string | number]): Promise<Partial<T>[]>;
  deleteAll(): Promise<boolean>;
  deleteWhere(condition: [string, string, string | number]): Promise<boolean>;
  updateWhere(condition: [string, string, string | number], obj: Partial<T>): Promise<boolean>;
  orderBy(column: string, order: string): Promise<T[]>;
}
