"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartsDao = void 0;
const container_knex_1 = __importDefault(require("../containers/container-knex"));
const mariadb_1 = require("../settings/mariadb");
const parsers_1 = require("../utils/parsers");
class CartsDao {
    container = new container_knex_1.default(mariadb_1.maridadbOptions.connection.database, 'carts', mariadb_1.maridadbOptions);
    save(cart) {
        const parsedCart = (0, parsers_1.parseCart)(cart);
        const success = this.container.insert(parsedCart);
        return success;
    }
    async getById(id) {
        const result = await this.container.find({ id });
        const cart = result ? result[0] : null;
        return cart;
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
        const parsedProd = (0, parsers_1.parseCartProduct)({ id: productId, quantity });
        const cart = await this.getById(cartId);
        let success = false;
        if (parsedProd == null || cart == null)
            return success;
        cart.products.push(parsedProd);
        try {
            await this.container.update({ id: cartId }, { products: cart.products });
        }
        catch (error) {
            console.log(error);
        }
        return success;
    }
    async removeProductById(cartId, productId) {
        const cart = await this.getById(cartId);
        let success = false;
        if (cart == null)
            return success;
        cart.products = cart.products.filter(p => p.id !== productId);
        try {
            await this.container.update({ id: cartId }, { products: cart.products });
        }
        catch (error) {
            console.log(error);
        }
        return success;
    }
}
exports.default = CartsDao;
exports.cartsDao = new CartsDao();
