import * as Knex from 'knex';
import { iKnexContainer } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class Container<T extends Record<string, any>> implements iKnexContainer<T> {
  options: Knex.Knex.Config;
  table: string;
  schema: string;

  constructor(schema: string, table: string, options: Knex.Knex.Config) {
    this.options = options;
    this.table = table;
    this.schema = schema;
  }

  async createTable(schemaBuilder: (table: Knex.Knex.TableBuilder) => void) {
    const knex = Knex.knex(this.options);
    const exists = await knex.schema.hasTable(this.table);
    let success = exists;
    if (!exists) await knex.schema.createTable(this.table, schemaBuilder)
      .then(() => success = true)
      .catch(err => console.log(err))
      .finally(() => knex.destroy());
    return success;
  }

  async insert(obj: T | T[]) {
    const knex = Knex.knex(this.options);
    let success = false;
    await knex(this.table).insert(obj)
      .then(() => success = true)
      .catch(err => console.log(err))
      .finally(() => knex.destroy());
    return success;
  }

  async select(column: string) {
    const knex = Knex.knex(this.options);
    let rows: T[] = [];
    await knex.from(this.table).select(column)
      .then(res => rows = res)
      .catch(err => console.log(err))
      .finally(() => knex.destroy());
    return rows;
  }

  async selectWhere(columns: string | string[], condition: [string, string, string | number]) {
    const knex = Knex.knex(this.options);
    let rows: Partial<T>[] = [];
    await knex.from(this.table).select(columns).where(...condition)
      .then(res => rows = res)
      .catch(err => console.log(err))
      .finally(() => knex.destroy());
    return rows;
  }

  async deleteAll() {
    const knex = Knex.knex(this.options);
    let success = false;
    await knex.del().from(this.table)
      .then(() => success = true)
      .catch(err => console.log(err))
      .finally(() => knex.destroy());
    return success;
  }

  async deleteWhere(condition: [string, string, string | number]) {
    const knex = Knex.knex(this.options);
    let success = false;
    await knex.from(this.table).where(...condition).del()
      .then(() => success = true)
      .catch(err => console.log(err))
      .finally(() => knex.destroy());
    return success;
  }

  async updateWhere(condition: [string, string, string | number], obj: Partial<T>) {
    const knex = Knex.knex(this.options);
    let success = false;
    await knex.from(this.table).where(...condition).update(obj)
      .then(() => success = true)
      .catch(err => console.log(err))
      .finally(() => knex.destroy());
    return success;
  }

  async orderBy(column: string, order: string) {
    const knex = Knex.knex(this.options);
    let rows: T[] = [];
    await knex.from(this.table).orderBy(column, order)
      .then(res => rows = res)
      .catch(err => console.log(err))
      .finally(() => knex.destroy());
    return rows;
  }
}
