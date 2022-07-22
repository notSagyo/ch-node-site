import { Knex, knex}  from 'knex';
import { filterSql } from '../types/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class Container<T extends Record<string, any>> {
  options: Knex.Config;
  table: string;
  schema: string;

  constructor(schema: string, table: string, options: Knex.Config) {
    this.options = options;
    this.table = table;
    this.schema = schema;
  }

  async createTable(schemaBuilder: (table: Knex.TableBuilder) => void) {
    const kn = knex(this.options);
    const exists = await kn.schema.hasTable(this.table);
    let success = exists;
    if (!exists) await kn.schema.createTable(this.table, schemaBuilder)
      .then(() => success = true)
      .catch(err => console.log(err));
    kn.destroy();
    return success;
  }

  async insert(obj: T | T[]) {
    const kn = knex(this.options);
    let success = false;
    await kn(this.table).insert(obj)
      .then(() => success = true)
      .catch(err => console.log(err));
    kn.destroy();
    return success;
  }

  async find(condition: filterSql<T>, sortColumn?: string, ascending?: boolean): Promise<T[] | null> {
    const kn = knex(this.options);
    let rows: T[] | null = null;
    if (sortColumn != null) {
      await kn.from(this.table).where(condition).orderBy(sortColumn).orderBy(ascending ? 'asc' : 'desc')
        .then(res => rows = res as T[])
        .catch(err => console.log(err));
    } else {
      await kn.from(this.table).where(condition)
        .then(res => rows = res as T[])
        .catch(err => console.log(err));
    }
    kn.destroy();
    return rows;
  }

  async update(condition: filterSql<T>, update: Partial<T>) {
    const kn = knex(this.options);
    let success = false;
    await kn(this.table).where(condition).update(update)
      .then(() => success = true)
      .catch(err => console.log(err));
    kn.destroy();
    return success;
  }

  async delete(condition?: filterSql<T>, limit?: number) {
    const kn = knex(this.options);
    let success = false;
    if (limit != null) {
      await kn.from(this.table).where(condition || {}).limit(limit).del()
        .then(() => success = true)
        .catch(err => console.log(err));
    } else {
      await kn.from(this.table).where(condition || {}).del()
        .then(() => success = true)
        .catch(err => console.log(err));
    }
    kn.destroy();
    return success;
  }
}
