"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsDao = void 0;
const container_mongo_1 = __importDefault(require("../containers/container-mongo"));
const product_1 = require("../models/product");
const parsers_1 = require("../utils/parsers");
class ProductsDao {
    container = new container_mongo_1.default(product_1.productsModel);
    async save(product) {
        const parsedProd = (0, parsers_1.parseProduct)(product);
        let success = false;
        if (parsedProd != null)
            success = await this.container.insert(parsedProd);
        return success;
    }
    async getById(id) {
        const res = await this.container.find({ id });
        const product = res ? res[0] : null;
        return product;
    }
    async getAll() {
        return await this.container.find('*') || [];
    }
    async updateById(id, data) {
        return await this.container.update({ id }, data);
    }
    async deleteById(id) {
        return await this.container.delete({ id });
    }
    async deleteAll() {
        return await this.container.delete('*');
    }
}
exports.default = ProductsDao;
exports.productsDao = new ProductsDao();
