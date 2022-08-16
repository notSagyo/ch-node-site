"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("../settings/mongoose");
const logger_1 = require("../utils/logger");
class Container {
    connection;
    model;
    collection;
    constructor(model) {
        this.model = model;
        this.collection = this.model.collection.name;
    }
    async connect() {
        const { uri, options } = mongoose_2.mongooseOptions;
        try {
            this.connection = (await mongoose_1.default.connect(uri, options)).connection;
            logger_1.logger.info('Connected to mongoDB');
        }
        catch (err) {
            logger_1.logger.error(err);
        }
    }
    async close() {
        if (!this.connection)
            return;
        try {
            await this.connection.close();
            this.connection = undefined;
            logger_1.logger.info('Disconected from mongoDB\n');
        }
        catch (err) {
            logger_1.logger.error(err);
        }
    }
    async insert(data) {
        await this.connect();
        let success = false;
        try {
            await this.model.create(data);
            success = true;
            logger_1.logger.info(`Inserted new data to '${this.collection}'`);
        }
        catch (err) {
            logger_1.logger.error(err);
        }
        this.close();
        return success;
    }
    async find(filter) {
        await this.connect();
        let result = null;
        const allOrFilter = filter === '*' ? {} : filter;
        try {
            result = (await this.model.find(allOrFilter).lean().exec());
            logger_1.logger.info(`Retrieved from '${this.collection}' elements matching:`, filter);
        }
        catch (err) {
            logger_1.logger.error(err);
        }
        this.close();
        return result;
    }
    async update(filter, data) {
        await this.connect();
        let success = false;
        const allOrFilter = filter == '*' ? {} : filter;
        try {
            await this.model.updateMany(allOrFilter, data);
            success = true;
            logger_1.logger.info(`Updated from '${this.collection}' elements matching:`, filter);
        }
        catch (err) {
            logger_1.logger.error(err);
        }
        this.close();
        return success;
    }
    async delete(filter) {
        await this.connect();
        let success = false;
        const allOrFilter = filter === '*' ? {} : filter;
        try {
            await this.model.deleteMany(allOrFilter);
            success = true;
            logger_1.logger.info(`Deleted from '${this.collection}' elements matching:`, filter);
        }
        catch (err) {
            logger_1.logger.error(err);
        }
        this.close();
        return success;
    }
}
exports.default = Container;
