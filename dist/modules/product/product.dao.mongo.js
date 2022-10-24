"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const container_mongo_1 = __importDefault(require("../../containers/container-mongo"));
const product_1 = __importDefault(require("./product"));
const product_model_1 = require("./product.model");
class ProductDao {
    static dao = new ProductDao();
    container = new container_mongo_1.default(product_model_1.productsModel);
    constructor() {
        return ProductDao.dao;
    }
    async save(product) {
        const dto = product.toDto();
        return await this.container.insert(dto);
    }
    async getById(id) {
        const res = await this.container.find({ id });
        const product = res[0] ? product_1.default.fromDto(res[0]) : null;
        return product;
    }
    async getAll() {
        const productsDto = (await this.container.find('*')) || [];
        const products = productsDto.map((prod) => product_1.default.fromDto(prod));
        return products;
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
exports.default = ProductDao;
