import { conditionMongo, iMongoContainer } from '../types';
import * as mongoose from 'mongoose';

export class Container<T extends Record<string, unknown>> implements iMongoContainer<T> {
  model: mongoose.Model<T>;
  connection: mongoose.Connection | undefined;

  constructor(model: mongoose.Model<T>) {
    this.model = model;
  }

  async connect() {
    try { this.connection = (await mongoose.connect('mongodb://localhost:27017/ecommerce')).connection; }
    catch (err) { console.error(err); }
  }

  async close() {
    if (!this.connection) return;
    try { await this.connection.close(); }
    catch (err) { console.error(err); }
  }

  async insert(obj: T | T[]): Promise<boolean> {
    this.connect();
    try {
      const newObj = new this.model(obj);
      await newObj.save();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      this.close();
    }
  }

  async find(query: conditionMongo<T>, sortField?: string, ascending?: boolean) {
    this.connect();
    let results: mongoose.Document[] = [];
    try {
      if (sortField != null)
        results = await this.model.find(query).sort(ascending ? sortField : `-${sortField}`);
      else
        results = await this.model.find(query);
    } catch (err) {
      console.error(err);
    }
    this.close();
    return results;
  }

  async update(query: conditionMongo<T>, obj: Partial<T>, limit?: number) {
    this.connect();
    let success = false;
    try {
      if (limit != null)
        await this.model.updateMany(query, obj, { limit });
      else
        await this.model.updateMany(query, obj);
      success = true;
    } catch (err) {
      console.error(err);
      success = false;
    }
    this.close();
    return success;
  }

  async delete(query: conditionMongo<T>, limit?: number) {
    this.connect();
    let success = false;
    try {
      if (limit != null)
        await this.model.deleteMany(query, { limit });
      else
        await this.model.deleteMany(query);
      success = true;
    } catch(err) {
      console.error(err);
      success = false;
    }
    this.close();
    return success;
  }
}
