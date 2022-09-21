"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const container_mongo_1 = __importDefault(require("../../containers/container-mongo"));
const logger_1 = require("../../utils/logger");
const cart_1 = __importDefault(require("./cart"));
const cart_model_1 = require("./cart.model");
class CartDao {
    static dao = new CartDao();
    container = new container_mongo_1.default(cart_model_1.cartModel);
    constructor() {
        return CartDao.dao;
    }
    async save(cart) {
        const dto = cart.toDto();
        return await this.container.insert(dto);
    }
    async getById(id) {
        const res = await this.container.find({ id });
        const cartDto = res[0] ? cart_1.default.fromDto(res[0]) : null;
        return cartDto;
    }
    async getAll() {
        const cartsDto = (await this.container.find({})) || [];
        const carts = cartsDto.map((cart) => cart_1.default.fromDto(cart));
        return carts;
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
exports.default = CartDao;
