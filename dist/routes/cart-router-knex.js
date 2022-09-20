"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const carts_dao_knex_1 = require("../daos/carts-dao-knex");
const ejs_1 = require("../config/ejs");
class CartRouter {
    router = express_1.default.Router();
    apiRouter = express_1.default.Router();
    cartHtmlPath;
    constructor(cartHtmlPath) {
        this.cartHtmlPath = cartHtmlPath;
        this.initRoutes();
    }
    initRoutes() {
        this.getProductsPage();
        this.getCartProductsById();
        this.postCart();
        this.postCartProduct();
        this.deleteCartById();
        this.deleteCartProductById();
    }
    getProductsPage() {
        this.router.get('/', async (req, res) => {
            res.render(this.cartHtmlPath, ejs_1.ejsDefaultData);
        });
    }
    getCartProductsById() {
        this.apiRouter.get('/:id/productos', async (req, res) => {
            const cartId = req.params.id;
            const cart = await carts_dao_knex_1.cartsDao.getById(cartId);
            if (!cart)
                return res.status(404).send(`404: Cart with ID:${cartId} not found`);
            res.status(200).json(cart.products);
        });
    }
    postCart() {
        this.apiRouter.post('/', async (req, res) => {
            const newCartId = await carts_dao_knex_1.cartsDao.save();
            if (newCartId == null)
                return res.status(400).send('400: Error while saving cart');
            res.status(201).send(`201: Cart N°${newCartId} created succesfully`);
        });
    }
    deleteCartById() {
        this.apiRouter.delete('/:id', async (req, res) => {
            const cartId = req.params.id;
            const success = await carts_dao_knex_1.cartsDao.deleteById(cartId);
            if (success == null)
                return res.status(400).send('400: Error while deleting cart');
            res.status(200).send(`200: Cart N°${cartId} deleted succesfully`);
        });
    }
    postCartProduct() {
        this.apiRouter.post('/:id/productos', async (req, res) => {
            const cartId = req.params.id;
            const productId = req.body.id;
            const success = carts_dao_knex_1.cartsDao.addProductById(cartId, productId);
            if (success == null)
                return res.status(400).send('400: Error while saving cart');
            res.status(201).send('201: Product added succesfully');
        });
    }
    deleteCartProductById() {
        this.apiRouter.delete('/:cartId/productos/:productId', async (req, res) => {
            const cartId = req.params.cartId;
            const productId = req.params.productId;
            const success = await carts_dao_knex_1.cartsDao.removeProductById(cartId, productId);
            if (success == null)
                return res.status(400).send('400: Error while saving cart');
            res.status(200).send('200: CartProduct deleted succesfully');
        });
    }
}
exports.default = CartRouter;
