"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ejs_1 = require("../../config/ejs");
const auth_1 = require("../../middlewares/auth");
const sockets_1 = require("../../middlewares/sockets");
const product_controller_1 = __importDefault(require("./product.controller"));
const product_resolver_1 = require("./product.resolver");
const product_service_1 = __importDefault(require("./product.service"));
class ProductRouter {
    router = express_1.default.Router();
    apiRouter = express_1.default.Router();
    testRouter = express_1.default.Router();
    productsHtmlPath;
    constructor(productsHtmlPath) {
        this.productsHtmlPath = productsHtmlPath;
        this.initRoutes();
    }
    initRoutes() {
        this.getProductsPage();
        this.graphql();
        this.getProducts();
        this.getProductsById();
        this.postProduct();
        this.deleteAllProducts();
        this.deleteProductById();
        this.putProductById();
        this.productsTest();
    }
    graphql() {
        this.apiRouter.all('/graphql', product_resolver_1.gqlMiddleware);
    }
    getProductsPage() {
        this.router.get('/', sockets_1.productSocket, async (req, res) => {
            const prods = await product_service_1.default.getAllProducts();
            res.render(this.productsHtmlPath, {
                ...ejs_1.ejsDefaultData,
                productList: prods,
            });
        });
    }
    getProducts() {
        this.apiRouter.get('/', async (req, res) => {
            product_controller_1.default.getProducts(req, res);
        });
    }
    getProductsById() {
        this.apiRouter.get('/:prodId', async (req, res) => {
            product_controller_1.default.getProductsById(req, res);
        });
    }
    postProduct() {
        this.apiRouter.post('/', auth_1.authz, async (req, res) => {
            product_controller_1.default.postProduct(req, res);
        });
    }
    deleteProductById() {
        this.apiRouter.delete('/:prodId', auth_1.authz, async (req, res) => {
            product_controller_1.default.deleteProductById(req, res);
        });
    }
    deleteAllProducts() {
        this.apiRouter.delete('/', auth_1.authz, async (req, res) => {
            product_controller_1.default.deleteAllProducts(req, res);
        });
    }
    putProductById() {
        this.apiRouter.put('/:prodId', auth_1.authz, async (req, res) => {
            product_controller_1.default.getProductsById(req, res);
        });
    }
    productsTest() {
        this.testRouter.get('/productos-test', async (req, res) => {
            product_controller_1.default.productsTest(req, res);
        });
    }
}
exports.default = ProductRouter;
