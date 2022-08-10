"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartsDao = void 0;
const container_mongo_1 = __importDefault(require("../containers/container-mongo"));
const cart_1 = require("../models/cart");
const parsers_1 = require("../utils/parsers");
class CartsDao {
    container = new container_mongo_1.default(cart_1.cartModel);
    async save(cart) {
        const parsedCart = (0, parsers_1.parseCart)(cart);
        return await this.container.insert(parsedCart);
    }
    async getById(id) {
        const res = await this.container.find({ id });
        const product = res ? res[0] : null;
        return product;
    }
    async getAll() {
        return await this.container.find({}) || [];
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
            timestamp: Date.now()
        };
        try {
            await this.container.update({ id: cartId }, { $push: { products: cartProd } });
            success = true;
        }
        catch (error) {
            console.log(error);
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
            console.log(error);
        }
        return success;
    }
}
exports.default = CartsDao;
exports.cartsDao = new CartsDao();
