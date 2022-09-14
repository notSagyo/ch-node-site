"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const container_mongo_1 = __importDefault(require("../../containers/container-mongo"));
const logger_1 = require("../../utils/logger");
const parsers_1 = require("../../utils/parsers");
const cart_model_1 = require("./cart-model");
class CartsDao {
    static dao = new CartsDao();
    container = new container_mongo_1.default(cart_model_1.cartModel);
    constructor() {
        return CartsDao.dao;
    }
    async save(cart) {
        const parsed = (0, parsers_1.parseCart)(cart);
        const success = parsed ? await this.container.insert(parsed) : false;
        return success;
    }
    async getById(id) {
        const res = await this.container.find({ id });
        const product = res ? res[0] : null;
        return product;
    }
    async getAll() {
        return (await this.container.find({})) || [];
    }
    async updateById(id, data) {
        return await this.container.update({ id }, data);
    }
    async deleteById(id) {
        return await this.container.delete({ id });
    }
    async deleteAll() {
        return await this.container.delete({});
    }
    async addProductById(cartId, productId, quantity) {
        let success = false;
        const cartProd = {
            id: productId,
            quantity: quantity || 1,
            code: '',
            timestamp: Date.now(),
        };
        try {
            await this.container.update({ id: cartId }, { $push: { products: cartProd } });
            success = true;
        }
        catch (error) {
            logger_1.logger.error(error);
        }
        return success;
    }
    async removeProductById(cartId, productId) {
        let success = false;
        try {
            await this.container.update({ id: cartId }, { $pull: { products: { id: productId } } });
            success = true;
        }
        catch (error) {
            logger_1.logger.error(error);
        }
        return success;
    }
}
exports.default = CartsDao;
