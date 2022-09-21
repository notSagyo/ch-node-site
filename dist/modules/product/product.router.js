"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const express_1 = __importDefault(require("express"));
const lodash_1 = __importDefault(require("lodash"));
const ejs_1 = require("../../config/ejs");
const sockets_1 = require("../../middlewares/sockets");
const logger_1 = require("../../utils/logger");
const errors_1 = require("../error/errors");
const http_error_handler_1 = require("../error/http-error-handler");
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
        this.getProducts();
        this.getProductsById();
        this.postProduct();
        this.deleteAllProducts();
        this.deleteProductById();
        this.putProductById();
        this.productsTest();
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
            const prods = await product_service_1.default.getAllProducts();
            if (prods.length < 1)
                logger_1.logger.warn('Empty products list');
            res.json(prods);
        });
    }
    getProductsById() {
        this.apiRouter.get('/:prodId', async (req, res) => {
            const prodId = req.params.prodId;
            const prod = await product_service_1.default.getProductById(prodId);
            if (prod == null)
                return new http_error_handler_1.HttpErrorHandler(res)
                    .handleError(new errors_1.NotFoundError('Product not found:'), prodId)
                    .send();
            res.json(prod);
        });
    }
    postProduct() {
        this.apiRouter.post('/', async (req, res) => {
            await product_service_1.default.createProduct(req.body);
            res.status(201).redirect('/productos');
        });
    }
    deleteProductById() {
        this.apiRouter.delete('/:prodId', async (req, res) => {
            const prodId = req.params.prodId;
            const success = await product_service_1.default.deleteProductById(prodId);
            if (success == false)
                return new http_error_handler_1.HttpErrorHandler(res)
                    .handleError(new Error('Error deleting product:'), prodId)
                    .send();
            res.status(200).send('[200]: Product deleted succesfully');
        });
    }
    deleteAllProducts() {
        this.apiRouter.delete('/', async (req, res) => {
            const success = await product_service_1.default.deleteAllProducts();
            if (success == false)
                return new http_error_handler_1.HttpErrorHandler(res)
                    .handleError(new Error('Error deleting all products'))
                    .send();
            res.status(200).send('[200]: All products deleted succesfully');
        });
    }
    putProductById() {
        this.apiRouter.put('/:prodId', async (req, res) => {
            const prodId = req.params.prodId;
            const newProd = req.body;
            const httpErrorHandler = new http_error_handler_1.HttpErrorHandler(res, newProd);
            let success = false;
            try {
                if (newProd == null || lodash_1.default.isEmpty(req.body))
                    throw new errors_1.NullError('Empty body:');
                success = await product_service_1.default.updateProductById(prodId, newProd);
                if (success == false)
                    throw new Error('Error while updating product:');
            }
            catch (error) {
                if (error instanceof Error)
                    return httpErrorHandler.handleError(error).send();
            }
            res.status(200).send('[200]: Product updated succesfully');
        });
    }
    productsTest() {
        this.testRouter.get('/productos-test', async (req, res) => {
            const products = [];
            for (let i = 0; i < 5; i++) {
                const prod = {
                    id: '0',
                    name: faker_1.faker.commerce.product(),
                    price: Number(faker_1.faker.commerce.price()),
                    description: faker_1.faker.commerce.productDescription(),
                    thumbnail: faker_1.faker.image.abstract(),
                };
                products.push(prod);
            }
            res.status(200).json(products);
        });
    }
}
exports.default = ProductRouter;
