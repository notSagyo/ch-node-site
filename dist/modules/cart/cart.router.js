"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ejs_1 = require("../../config/ejs");
const auth_1 = require("../../middlewares/auth");
const logger_1 = require("../../utils/logger");
const cart_service_1 = __importDefault(require("./cart.service"));
class CartRouter {
    cartHtmlPath;
    router = express_1.default.Router();
    apiRouter = express_1.default.Router();
    constructor(cartHtmlPath) {
        this.cartHtmlPath = cartHtmlPath;
        this.initRoutes();
    }
    initRoutes() {
        this.getCartPage();
        this.postCart();
        this.getCartProducts();
        this.postCartProduct();
        this.deleteCart();
        this.deleteCartProductById();
    }
    getCartPage() {
        this.router.get('/', async (req, res) => {
            const userId = req.user?.id;
            const cartProds = userId ? await cart_service_1.default.getAllProducts(userId) : [];
            let prods = [];
            if (cartProds.length > 0)
                prods = await cart_service_1.default.cartProductsToProducts(cartProds);
            res.render(this.cartHtmlPath, {
                ...ejs_1.ejsDefaultData,
                cartProducts: prods,
            });
        });
    }
    postCart() {
        this.apiRouter.post('/', auth_1.authn, async (req, res) => {
            const userId = req.user?.id;
            const success = userId
                ? await cart_service_1.default.createCart({ id: userId })
                : false;
            if (success == false)
                return res.status(400).send('400: Error while saving cart');
            res.status(201).send('201: Cart created succesfully');
        });
    }
    getCartProducts() {
        this.apiRouter.get('/:id/productos', async (req, res) => {
            const cartId = req.params.id;
            const products = await cart_service_1.default.getAllProducts(cartId);
            res.status(200).json(products);
        });
    }
    deleteCart() {
        this.apiRouter.delete('/:id', async (req, res) => {
            const cartId = req.params.id;
            const success = await cart_service_1.default.deleteCartById(cartId);
            if (success == false)
                return res.status(400).send('400: Error while deleting cart');
            res.status(200).send(`200: Cart N°${cartId} deleted succesfully`);
        });
    }
    postCartProduct() {
        this.apiRouter.post('/:cartId/productos', auth_1.authn, async (req, res) => {
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
        });
    }
    deleteCartProductById() {
        this.apiRouter.delete('/:cartId/productos', async (req, res) => {
            const cartId = req.params.cartId;
            const productId = req.body.id;
            const success = await cart_service_1.default.removeProductById(cartId, productId);
            if (success == false)
                return res
                    .status(400)
                    .send('400: Error while deleting product from cart');
            res.status(200).send('200: CartProduct deleted succesfully');
        });
    }
}
exports.default = CartRouter;
