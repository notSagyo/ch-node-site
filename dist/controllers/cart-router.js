"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const carts_dao_mongo_1 = require("../daos/carts-dao-mongo");
const ejs_1 = require("../settings/ejs");
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
            res.render(this.cartHtmlPath, ejs_1.ejsDefaultData);
        });
    }
    postCart() {
        this.apiRouter.post('/', async (req, res) => {
            const success = await carts_dao_mongo_1.cartsDao.save();
            if (success == false)
                return res.status(400).send('400: Error while saving cart');
            res.status(201).send('201: Cart created succesfully');
        });
    }
    getCartProducts() {
        this.apiRouter.get('/:id/productos', async (req, res) => {
            const cartId = req.params.id;
            const cart = await carts_dao_mongo_1.cartsDao.getById(cartId);
            if (cart == null)
                return res.status(404).send(`404: Cart with ID:${cartId} not found`);
            res.status(200).json(cart.products);
        });
    }
    deleteCart() {
        this.apiRouter.delete('/:id', async (req, res) => {
            const cartId = req.params.id;
            const success = await carts_dao_mongo_1.cartsDao.deleteById(cartId);
            if (success == false)
                return res.status(400).send('400: Error while deleting cart');
            res.status(200).send(`200: Cart N°${cartId} deleted succesfully`);
        });
    }
    postCartProduct() {
        this.apiRouter.post('/:id/productos', async (req, res) => {
            const cartId = req.params.id;
            const productId = req.body.id;
            const success = await carts_dao_mongo_1.cartsDao.addProductById(cartId, productId);
            if (success == false)
                return res.status(400).send('400: Error while saving product in cart');
            res.status(201).send('201: Product added succesfully');
        });
    }
    deleteCartProductById() {
        this.apiRouter.delete('/:cartId/productos', async (req, res) => {
            const cartId = req.params.cartId;
            const productId = req.body.id;
            const success = await carts_dao_mongo_1.cartsDao.removeProductById(cartId, productId);
            if (success == false)
                return res.status(400).send('400: Error while deleting product from cart');
            res.status(200).send('200: CartProduct deleted succesfully');
        });
    }
}
exports.default = CartRouter;
