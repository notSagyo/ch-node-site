"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsDao = void 0;
const container_firebase_1 = __importDefault(require("../containers/container-firebase"));
const uuid_1 = require("uuid");
const firestore_1 = require("@firebase/firestore");
class ProductsDao {
    container = new container_firebase_1.default('products');
    async save(product) {
        const prodWithId = { ...product, id: (0, uuid_1.v4)() };
        return await this.container.insert(prodWithId);
    }
    async getById(id) {
        const res = await this.container.find((0, firestore_1.where)('id', '==', id));
        const product = res ? res[0] : null;
        return product;
    }
    async getAll() {
        return await this.container.find('*') || [];
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
exports.productsDao = new ProductsDao();
