"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_2 = require("../config/mongoose");
const errors_1 = require("../modules/error/errors");
const logger_1 = require("../utils/logger");
class Container {
    static connection;
    model;
    collection;
    constructor(model) {
        this.model = model;
        this.collection = this.model.collection.name;
        Container.connection == null && this.connect();
    }
    async connect() {
        const { uri, options } = mongoose_2.mongooseOptions;
        Container.connection = 'pending';
        try {
            Container.connection = (await mongoose_1.default.connect(uri, options)).connection;
            logger_1.logger.info('Connected to mongoDB');
        }
        catch (err) {
            logger_1.logger.error(err);
            Container.connection = undefined;
        }
    }
    async disconnect() {
        if (!(Container.connection instanceof mongoose_1.Connection))
            return;
        try {
            await Container.connection.close();
            Container.connection = undefined;
            logger_1.logger.info('Disconected from mongoDB\n');
        }
        catch (err) {
            logger_1.logger.error(err);
        }
    }
    async insert(data) {
        let success = false;
        try {
            await this.model.create(data);
            success = true;
            logger_1.logger.info(`Inserted new data to "${this.collection}"`);
        }
        catch (err) {
            logger_1.logger.error(err);
        }
        return success;
    }
    async find(filter) {
        let result = [];
        const allOrFilter = filter === '*' ? {} : filter;
        try {
            result = await this.model.find(allOrFilter).lean();
            logger_1.logger.info(`Retrieved from "${this.collection}" elements matching:`, filter);
        }
        catch (err) {
            logger_1.logger.error(err);
        }
        return result;
    }
    async update(filter, data) {
        let success = false;
        const allOrFilter = filter == '*' ? {} : filter;
        try {
            await this.model.updateMany(allOrFilter, data);
            success = true;
            logger_1.logger.info(`Updated from "${this.collection}" elements matching:`, filter);
        }
        catch (err) {
            logger_1.logger.error(err);
        }
        return success;
    }
    async delete(filter) {
        let success = false;
        const allOrFilter = filter === '*' ? {} : filter;
        try {
            await this.model.deleteMany(allOrFilter);
            success = true;
            logger_1.logger.info(`Deleted from "${this.collection}" elements matching:`, filter);
        }
        catch (err) {
            if (err instanceof Error)
                throw new errors_1.ServerError(err);
        }
        return success;
    }
}
exports.default = Container;
