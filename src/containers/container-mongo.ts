import mongoose, { Connection, Model, UpdateQuery } from 'mongoose';
import { mongooseOptions } from '../config/mongoose';
import { ServerError } from '../modules/errors/errors';
import { filterMongo } from '../types/types';
import { logger } from '../utils/logger';

// TODO: change everything's return type
export default class Container<T> {
  static connection: Connection | 'pending' | undefined;
  model: Model<T>;
  collection: string;

  constructor(model: Model<T>) {
    this.model = model;
    this.collection = this.model.collection.name;
    Container.connection == null && this.connect();
  }

  async connect() {
    const { uri, options } = mongooseOptions;
    Container.connection = 'pending';
    try {
      Container.connection = (await mongoose.connect(uri, options)).connection;
      logger.info('Connected to mongoDB');
    } catch (err) {
      logger.error(err);
      Container.connection = undefined;
    }
  }

  async disconnect() {
    if (!(Container.connection instanceof Connection)) return;
    try {
      await Container.connection.close();
      Container.connection = undefined;
      logger.info('Disconected from mongoDB\n');
    } catch (err) {
      logger.error(err);
    }
  }

  async insert(data: T): Promise<boolean> {
    let success = false;
    try {
      await this.model.create(data);
      success = true;
      logger.info(`Inserted new data to "${this.collection}"`);
    } catch (err) {
      logger.error(err);
    }
    return success;
  }

  async find(filter: filterMongo<T>): Promise<T[]> {
    let result: T[] = [];
    const allOrFilter = filter === '*' ? {} : filter;
    try {
      result = await this.model.find(allOrFilter).lean();
      logger.info(
        `Retrieved from "${this.collection}" elements matching:`,
        filter
      );
    } catch (err) {
      logger.error(err);
    }
    return result;
  }

  async update(filter: filterMongo<T>, data: UpdateQuery<T>) {
    let success = false;
    const allOrFilter = filter == '*' ? {} : filter;
    try {
      await this.model.updateMany(allOrFilter, data);
      success = true;
      logger.info(
        `Updated from "${this.collection}" elements matching:`,
        filter
      );
    } catch (err) {
      logger.error(err);
    }
    return success;
  }

  async delete(filter: filterMongo<T>) {
    let success = false;
    const allOrFilter = filter === '*' ? {} : filter;
    try {
      await this.model.deleteMany(allOrFilter);
      success = true;
      logger.info(
        `Deleted from "${this.collection}" elements matching:`,
        filter
      );
    } catch (err) {
      if (err instanceof Error) throw new ServerError(err);
    }
    return success;
  }
}
