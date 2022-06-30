import * as Knex from 'knex';
import { conditionSql, iKnexContainer } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class Container<T extends Record<string, any>> implements iKnexContainer<T> {
  options: Knex.Knex.Config;
  table: string;
  schema: string;
  knex: Knex.Knex | undefined;

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

  async find(condition: conditionSql<T>, sortColumn?: string, ascending?: boolean) {
    const knex = Knex.knex(this.options);
    let rows: T[] = [];
    if (sortColumn != null) {
      await knex.from(this.table).where(condition).orderBy(sortColumn).orderBy(ascending ? 'asc' : 'desc')
        .then(res => rows = res)
        .catch(err => console.log(err))
        .finally(() => knex.destroy());
    } else {
      await knex.from(this.table).where(condition)
        .then(res => rows = res)
        .catch(err => console.log(err))
        .finally(() => knex.destroy());
    }

    return rows;
  }

  async update(condition: conditionSql<T>, update: Partial<T>) {
    const knex = Knex.knex(this.options);
    let success = false;
    await knex(this.table).where(condition).update(update)
      .then(() => success = true)
      .catch(err => console.log(err))
      .finally(() => knex.destroy());
    return success;
  }

  async delete(condition?: conditionSql<T>, limit?: number) {
    const knex = Knex.knex(this.options);
    let success = false;
    if (limit != null) {
      await knex.from(this.table).where(condition || {}).limit(limit).del()
        .then(() => success = true)
        .catch(err => console.log(err))
        .finally(() => knex.destroy());
    } else {
      await knex.from(this.table).where(condition || {}).del()
        .then(() => success = true)
        .catch(err => console.log(err))
        .finally(() => knex.destroy());
    }
    return success;
  }
}
