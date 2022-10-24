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
const product_service_1 = __importDefault(require("../product/product.service"));
const cart_1 = __importStar(require("./cart"));
const cart_dao_1 = __importDefault(require("./cart.dao"));
class CartService {
    async createCart(cartDto) {
        const cart = cart_1.default.fromDto(cartDto);
        const success = await cart_dao_1.default.dao.save(cart);
        if (!success)
            throw new Error('Cart service: error saving cartDto');
        return cart;
    }
    async getAllCarts() {
        return await cart_dao_1.default.dao.getAll();
    }
    async getCartById(id) {
        return await cart_dao_1.default.dao.getById(id);
    }
    async deleteCartById(cartId) {
        return await cart_dao_1.default.dao.deleteById(cartId);
    }
    async deleteAllCarts() {
        return await cart_dao_1.default.dao.deleteAll();
    }
    async updateCartById(cartId, data) {
        const exists = (await this.getCartById(cartId)) != null;
        if (exists)
            return await cart_dao_1.default.dao.updateById(cartId, data);
        const parsedProd = (0, cart_1.parseCart)(data);
        if (parsedProd)
            return await cart_dao_1.default.dao.save(cart_1.default.fromDto(parsedProd));
        return false;
    }
    async getAllProducts(cartId) {
        const cart = await cart_dao_1.default.dao.getById(cartId);
        if (!cart)
            return [];
        const items = cart.products;
        return items;
    }
    async addProductById(cartId, productId, quantity = 1) {
        return await cart_dao_1.default.dao.addProductById(cartId, productId, quantity);
    }
    async removeProductById(cartId, productId) {
        return await cart_dao_1.default.dao.removeProductById(cartId, productId);
    }
    async removeAllProducts(cartId) {
        return await cart_dao_1.default.dao.updateById(cartId, { products: [] });
    }
    async cartProductsToProducts(cartProds) {
        const promises = [];
        const products = [];
        for (let i = 0; i < cartProds.length; i++) {
            const cartProd = cartProds[i];
            promises.push(product_service_1.default.getProductById(cartProd.id));
        }
        await Promise.allSettled(promises).then((results) => results.forEach((result) => result.status === 'fulfilled' &&
            result.value &&
            products.push(result.value)));
        return products;
    }
}
const cartService = new CartService();
exports.default = cartService;
