"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCartProduct = exports.parseCart = void 0;
const uuid_1 = require("uuid");
const logger_1 = require("../../utils/logger");
class Cart {
    products;
    timestamp;
    id;
    constructor(idV4, products, timestamp) {
        this.products = products;
        this.timestamp = timestamp;
        this.id = idV4;
    }
    static fromDto(dto) {
        const parsedCart = (0, exports.parseCart)(dto);
        if (parsedCart == null)
            throw new Error('Cart: error parsing cart');
        return new Cart(parsedCart.id, parsedCart.products, parsedCart.timestamp);
    }
    toDto() {
        const { id, products, timestamp } = this;
        return { id, products, timestamp };
    }
}
exports.default = Cart;
const parseCart = (cart) => {
    if (cart == null)
        return null;
    let products = [];
    let timestamp = Date.now();
    const isValidId = typeof cart?.id === 'string' && (0, uuid_1.validate)(cart.id);
    const isValidTimestamp = typeof cart?.timestamp === 'number' && !isNaN(cart.timestamp);
    const isValidProducts = Array.isArray(cart?.products) &&
        cart.products.length > 0 &&
        cart.products.every((prod) => (0, exports.parseCartProduct)(prod) != null);
    if (!isValidId) {
        logger_1.logger.error(`parseCart: ID ${cart.id} is not a valid ID`);
        return null;
    }
    isValidProducts && (products = cart.products);
    isValidTimestamp && (timestamp = cart.timestamp);
    return { id: cart.id, timestamp, products };
};
exports.parseCart = parseCart;
const parseCartProduct = (prod) => {
    const isValidCode = typeof prod?.code === 'string' && prod.code.length > 0;
    const isValidId = typeof prod?.id === 'string' && (0, uuid_1.validate)(prod.id);
    const isValidTimestamp = typeof prod?.timestamp === 'number' && prod.timestamp > 0;
    const isValidQuantity = typeof prod?.quantity === 'number' && prod.quantity > 0;
    if (!isValidId)
        return null;
    const quantity = isValidQuantity ? prod.quantity : 1;
    const timestamp = isValidTimestamp ? prod.timestamp : Date.now();
    const code = isValidCode ? prod.code : '-1';
    const id = prod.id;
    return { id, code, quantity, timestamp };
};
exports.parseCartProduct = parseCartProduct;
