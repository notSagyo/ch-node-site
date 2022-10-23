"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ejs_1 = require("../../config/ejs");
const auth_1 = require("../../middlewares/auth");
const cart_controller_1 = __importDefault(require("./cart.controller"));
const cart_resolver_1 = require("./cart.resolver");
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
        this.graphql();
        this.postCart();
        this.getCartProducts();
        this.postCartProduct();
        this.deleteCart();
        this.deleteCartProductById();
    }
    graphql() {
        this.apiRouter.all('/graphql', cart_resolver_1.gqlMiddleware);
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
            cart_controller_1.default.postCart(req, res);
        });
    }
    getCartProducts() {
        this.apiRouter.get('/:id/productos', async (req, res) => {
            cart_controller_1.default.getCartProducts(req, res);
        });
    }
    deleteCart() {
        this.apiRouter.delete('/:id', async (req, res) => {
            cart_controller_1.default.deleteCart(req, res);
        });
    }
    postCartProduct() {
        this.apiRouter.post('/:cartId/productos', auth_1.authn, async (req, res) => {
            cart_controller_1.default.postCartProduct(req, res);
        });
    }
    deleteCartProductById() {
        this.apiRouter.delete('/:cartId/productos', async (req, res) => {
            cart_controller_1.default.deleteCartProductById(req, res);
        });
    }
}
exports.default = CartRouter;
