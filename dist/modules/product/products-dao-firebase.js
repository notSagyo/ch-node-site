"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firestore_1 = require("@firebase/firestore");
const container_firebase_1 = __importDefault(require("../../containers/container-firebase"));
const parsers_1 = require("../../utils/parsers");
class ProductsDao {
    static dao = new ProductsDao();
    container = new container_firebase_1.default('products');
    constructor() {
        return ProductsDao.dao;
    }
    async save(product) {
        const parsedProd = (0, parsers_1.parseProduct)(product);
        let success = false;
        if (parsedProd != null)
            success = await this.container.insert(parsedProd);
        return success;
    }
    async getById(id) {
        const res = await this.container.find((0, firestore_1.where)('id', '==', id));
        const product = res ? res[0] : null;
        return product;
    }
    async getAll() {
        return (await this.container.find('*')) || [];
    }
    async updateById(id, data) {
        return await this.container.update((0, firestore_1.where)('id', '==', id), data);
    }
    async deleteById(id) {
        return await this.container.delete((0, firestore_1.where)('id', '==', id));
    }
    async deleteAll() {
        return await this.container.delete('*');
    }
}
exports.default = ProductsDao;
