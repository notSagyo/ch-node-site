"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const logger_1 = require("../../utils/logger");
const cart_service_1 = __importDefault(require("./cart.service"));
class CartController {
    async postCart(req, res) {
        const userId = req.user?.id;
        const success = userId
            ? await cart_service_1.default.createCart({ id: userId })
            : false;
        if (success == false)
            return res.status(400).send('400: Error while saving cart');
        res.status(201).send('201: Cart created succesfully');
    }
    async getCartProducts(req, res) {
        const cartId = req.params.id;
        const products = await cart_service_1.default.getAllProducts(cartId);
        res.status(200).json(products);
    }
    async deleteCart(req, res) {
        const cartId = req.params.id;
        const success = await cart_service_1.default.deleteCartById(cartId);
        if (success == false)
            return res.status(400).send('400: Error while deleting cart');
        res.status(200).send(`200: Cart N°${cartId} deleted succesfully`);
    }
    async postCartProduct(req, res) {
        const productId = req.body.id;
        const cartId = req.params.cartId == '0' ? req.user?.id : req.params.cartId;
        if (cartId) {
            const foundCart = await cart_service_1.default.getCartById(cartId);
            if (foundCart == null) {
                logger_1.logger.warn('Cart not found, creating...');
                await cart_service_1.default.createCart({ id: cartId });
            }
        }
        const success = cartId
            ? await cart_service_1.default.addProductById(cartId, productId)
            : false;
        if (success == false) {
            const msg = '400: Error while saving product in cart';
            logger_1.logger.error(msg);
            return res.status(400).send(msg);
        }
        res.status(201).send('201: Product added succesfully');
    }
    async deleteCartProductById(req, res) {
        const cartId = req.params.cartId;
        const productId = req.body.id;
        const success = await cart_service_1.default.removeProductById(cartId, productId);
        if (success == false)
            return res
                .status(400)
                .send('400: Error while deleting product from cart');
        res.status(200).send('200: CartProduct deleted succesfully');
    }
}
exports.CartController = CartController;
const cartController = new CartController();
exports.default = cartController;
