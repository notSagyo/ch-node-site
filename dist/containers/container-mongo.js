"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("../settings/mongoose");
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
            console.log('Connected to mongoDB');
        }
        catch (err) {
            console.error(err);
        }
    }
    async close() {
        if (!this.connection)
            return;
        try {
            await this.connection.close();
            this.connection = undefined;
            console.log('Disconected from mongoDB\n');
        }
        catch (err) {
            console.error(err);
        }
    }
    async insert(data) {
        await this.connect();
        let success = false;
        try {
            await this.model.create(data);
            success = true;
            console.log(`Inserted new data to '${this.collection}'`);
        }
        catch (err) {
            console.error(err);
        }
        this.close();
        return success;
    }
    async find(filter) {
        await this.connect();
        let result = null;
        const allOrFilter = filter === '*' ? {} : filter;
        try {
            result = await this.model.find(allOrFilter).lean().exec();
            console.log(`Retrieved from '${this.collection}' elements matching:`, filter);
        }
        catch (err) {
            console.error(err);
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
            console.log(`Updated from '${this.collection}' elements matching:`, filter);
        }
        catch (err) {
            console.error(err);
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
            console.log(`Deleted from '${this.collection}' elements matching:`, filter);
        }
        catch (err) {
            console.error(err);
        }
        this.close();
        return success;
    }
}
exports.default = Container;
