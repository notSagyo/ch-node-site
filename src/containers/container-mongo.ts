import mongoose, { Connection, Model, UpdateQuery } from 'mongoose';
import { mongooseOptions } from '../settings/mongoose';
import { filterMongo } from '../types/types';
import { logger } from '../utils/logger';

// TODO: change everything's return type
export default class Container<T> {
  connection: Connection | undefined;
  model: Model<T>;
  collection: string;

  constructor(model: Model<T>) {
    this.model = model;
    this.collection = this.model.collection.name;
  }

  async connect() {
    const { uri, options } = mongooseOptions;
    try {
      this.connection = (await mongoose.connect(uri, options)).connection;
      logger.info('Connected to mongoDB');
    } catch (err) {
      logger.error(err);
    }
  }

  async close() {
    if (!this.connection) return;
    try {
      await this.connection.close();
      this.connection = undefined;
      logger.info('Disconected from mongoDB\n');
    } catch (err) {
      logger.error(err);
    }
  }

  async insert(data: T): Promise<boolean> {
    await this.connect();
    let success = false;
    try {
      await this.model.create(data);
      success = true;
      logger.info(`Inserted new data to '${this.collection}'`);
    } catch (err) {
      logger.error(err);
    }
    this.close();
    return success;
  }

  async find(filter: filterMongo<T>): Promise<T[] | null> {
    await this.connect();
    let result: T[] | null = null;
    const allOrFilter = filter === '*' ? {} : filter;
    try {
      result = (await this.model.find(allOrFilter).lean()) as T[];
      logger.info(
        `Retrieved from '${this.collection}' elements matching:`,
        filter
      );
    } catch (err) {
      logger.error(err);
    }
    this.close();
    return result;
  }

  async update(filter: filterMongo<T>, data: UpdateQuery<T>) {
    await this.connect();
    let success = false;
    const allOrFilter = filter == '*' ? {} : filter;
    try {
      await this.model.updateMany(allOrFilter, data);
      success = true;
      logger.info(
        `Updated from '${this.collection}' elements matching:`,
        filter
      );
    } catch (err) {
      logger.error(err);
    }
    this.close();
    return success;
  }

  async delete(filter: filterMongo<T>) {
    await this.connect();
    let success = false;
    const allOrFilter = filter === '*' ? {} : filter;
    try {
      await this.model.deleteMany(allOrFilter);
      success = true;
      logger.info(
        `Deleted from '${this.collection}' elements matching:`,
        filter
      );
    } catch (err) {
      logger.error(err);
    }
    this.close();
    return success;
  }
}
