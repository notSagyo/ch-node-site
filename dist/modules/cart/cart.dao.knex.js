"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mariadb_1 = require("../../config/mariadb");
const container_knex_1 = __importDefault(require("../../containers/container-knex"));
const logger_1 = require("../../utils/logger");
const cart_1 = __importStar(require("./cart"));
class CartDao {
    static dao = new CartDao();
    container = new container_knex_1.default(mariadb_1.maridadbOptions.connection.database, 'carts', mariadb_1.maridadbOptions);
    constructor() {
        return CartDao.dao;
    }
    async save(cart) {
        const dto = cart.toDto();
        const success = await this.container.insert(dto);
        return success;
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
        const parsedProd = (0, cart_1.parseCartProduct)({ id: productId, quantity });
        const cart = await this.getById(cartId);
        let success = false;
        if (parsedProd == null || cart == null)
            return success;
        cart.products.push(parsedProd);
        try {
            await this.container.update({ id: cartId }, { products: cart.products });
        }
        catch (error) {
            logger_1.logger.error(error);
        }
        return success;
    }
    async removeProductById(cartId, productId) {
        const cart = await this.getById(cartId);
        let success = false;
        if (cart == null)
            return success;
        cart.products = cart.products.filter((p) => p.id !== productId);
        try {
            await this.container.update({ id: cartId }, { products: cart.products });
        }
        catch (error) {
            logger_1.logger.error(error);
        }
        return success;
    }
}
exports.default = CartDao;
