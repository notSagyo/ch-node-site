"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const express_1 = __importDefault(require("express"));
const ejs_1 = require("../../config/ejs");
const auth_1 = require("../../middlewares/auth");
const logger_1 = require("../../utils/logger");
const parsers_1 = require("../../utils/parsers");
const products_dao_mongo_1 = __importDefault(require("./products-dao-mongo"));
class ProductsRouter {
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
        this.deleteProductById();
        this.putProductById();
        this.productsTest();
    }
    getProductsPage() {
        this.router.get('/', async (req, res) => {
            const prods = await products_dao_mongo_1.default.dao.getAll();
            res.render(this.productsHtmlPath, {
                ...ejs_1.ejsDefaultData,
                productList: prods,
            });
        });
    }
    getProducts() {
        this.apiRouter.get('/', async (req, res) => {
            const prods = await products_dao_mongo_1.default.dao.getAll();
            if (prods.length < 1)
                logger_1.logger.warn('Empty products list');
            res.json(prods);
        });
    }
    getProductsById() {
        this.apiRouter.get('/:id', async (req, res) => {
            const prodId = req.params.id;
            const prod = await products_dao_mongo_1.default.dao.getById(prodId);
            if (prod == null) {
                const msg = `Product with ID=${prodId} not found`;
                logger_1.logger.error(msg);
                return res.status(404).send(`404: ${msg}`);
            }
            res.json(prod);
        });
    }
    postProduct() {
        this.apiRouter.post('/', auth_1.authz, async (req, res) => {
            const newProd = (0, parsers_1.parseProduct)(req.body);
            if (newProd == null) {
                const msg = '400: Error parsing product, malformed request body';
                logger_1.logger.error(msg);
                return res.status(400).send(`400: ${msg}`);
            }
            await products_dao_mongo_1.default.dao.save(newProd);
            res.status(201).redirect('/productos');
        });
    }
    deleteProductById() {
        this.apiRouter.delete('/:id', auth_1.authz, async (req, res) => {
            const prodId = req.params.id;
            const success = await products_dao_mongo_1.default.dao.deleteById(prodId);
            if (success == false) {
                const msg = 'Error while deleting product';
                logger_1.logger.error(msg);
                return res.status(400).send(`400: ${msg}`);
            }
            res.status(200).send('200: Product deleted succesfully');
        });
    }
    putProductById() {
        this.apiRouter.put('/:id', auth_1.authz, async (req, res) => {
            const prodId = req.params.id;
            const newProd = (0, parsers_1.parseProduct)(req.body);
            if (newProd == null) {
                const msg = 'Error parsing product, malformed request body';
                logger_1.logger.error(msg);
                return res.status(400).send(`400: ${msg}`);
            }
            let success = false;
            const exists = (await products_dao_mongo_1.default.dao.getById(prodId)) != null;
            if (exists)
                success = await products_dao_mongo_1.default.dao.updateById(prodId, newProd);
            else
                success = await products_dao_mongo_1.default.dao.save(newProd);
            if (success == false) {
                const msg = 'Error while updating product';
                logger_1.logger.error(msg);
                return res.status(400).send(`400: ${msg}`);
            }
            res.status(200).send('200: Product updated succesfully');
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
exports.default = ProductsRouter;
