"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firestore_1 = require("@firebase/firestore");
const container_firebase_1 = __importDefault(require("../../containers/container-firebase"));
const logger_1 = require("../../utils/logger");
const cart_1 = __importDefault(require("./cart"));
class CartDao {
    static dao = new CartDao();
    container = new container_firebase_1.default('carts');
    constructor() {
        return CartDao.dao;
    }
    async save(cart) {
        const dto = cart.toDto();
        const success = await this.container.insert(dto);
        return success;
    }
    async getById(id) {
        const res = await this.container.find((0, firestore_1.where)('id', '==', id));
        const cartDto = res[0] ? cart_1.default.fromDto(res[0]) : null;
        return cartDto;
    }
    async getAll() {
        const cartsDto = (await this.container.find('*')) || [];
        const carts = cartsDto.map((cart) => cart_1.default.fromDto(cart));
        return carts;
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
    async addProductById(cartId, productId, quantity) {
        let success = false;
        const cartProd = {
            id: productId,
            quantity: quantity || 1,
            code: '',
            timestamp: Date.now(),
        };
        try {
            await this.container.update((0, firestore_1.where)('id', '==', cartId), {
                products: (0, firestore_1.arrayUnion)(cartProd),
            });
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
            this.container.update((0, firestore_1.where)('id', '==', cartId), {
                products: (0, firestore_1.arrayRemove)((0, firestore_1.where)('id', '==', productId)),
            });
            success = true;
        }
        catch (error) {
            logger_1.logger.error(error);
        }
        return success;
    }
}
exports.default = CartDao;
