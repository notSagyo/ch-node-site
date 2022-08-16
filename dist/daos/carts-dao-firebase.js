"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartsDao = void 0;
const container_firebase_1 = __importDefault(require("../containers/container-firebase"));
const firestore_1 = require("@firebase/firestore");
const parsers_1 = require("../utils/parsers");
const logger_1 = require("../utils/logger");
class CartsDao {
    container = new container_firebase_1.default('carts');
    async save(cart) {
        const parsedCart = (0, parsers_1.parseCart)(cart);
        return await this.container.insert(parsedCart);
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
exports.default = CartsDao;
exports.cartsDao = new CartsDao();
