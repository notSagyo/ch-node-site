"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = require("knex");
const logger_1 = require("../utils/logger");
class Container {
    options;
    table;
    schema;
    constructor(schema, table, options) {
        this.options = options;
        this.table = table;
        this.schema = schema;
    }
    async createTable(schemaBuilder) {
        const kn = (0, knex_1.knex)(this.options);
        const exists = await kn.schema.hasTable(this.table);
        let success = exists;
        if (!exists)
            await kn.schema
                .createTable(this.table, schemaBuilder)
                .then(() => (success = true))
                .catch((err) => logger_1.logger.error(err));
        kn.destroy();
        return success;
    }
    async insert(obj) {
        const kn = (0, knex_1.knex)(this.options);
        let success = false;
        await kn(this.table)
            .insert(obj)
            .then(() => (success = true))
            .catch((err) => logger_1.logger.error(err));
        kn.destroy();
        return success;
    }
    async find(condition, sortColumn, ascending) {
        const kn = (0, knex_1.knex)(this.options);
        let rows = null;
        if (sortColumn != null) {
            await kn
                .from(this.table)
                .where(condition)
                .orderBy(sortColumn)
                .orderBy(ascending ? 'asc' : 'desc')
                .then((res) => (rows = res))
                .catch((err) => logger_1.logger.error(err));
        }
        else {
            await kn
                .from(this.table)
                .where(condition)
                .then((res) => (rows = res))
                .catch((err) => logger_1.logger.error(err));
        }
        kn.destroy();
        return rows;
    }
    async update(condition, update) {
        const kn = (0, knex_1.knex)(this.options);
        let success = false;
        await kn(this.table)
            .where(condition)
            .update(update)
            .then(() => (success = true))
            .catch((err) => logger_1.logger.error(err));
        kn.destroy();
        return success;
    }
    async delete(condition, limit) {
        const kn = (0, knex_1.knex)(this.options);
        let success = false;
        if (limit != null) {
            await kn
                .from(this.table)
                .where(condition || {})
                .limit(limit)
                .del()
                .then(() => (success = true))
                .catch((err) => logger_1.logger.error(err));
        }
        else {
            await kn
                .from(this.table)
                .where(condition || {})
                .del()
                .then(() => (success = true))
                .catch((err) => logger_1.logger.error(err));
        }
        kn.destroy();
        return success;
    }
}
exports.default = Container;
