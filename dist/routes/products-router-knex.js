"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const parsers_1 = require("../utils/parsers");
const auth_1 = require("../middlewares/auth");
const container_knex_1 = __importDefault(require("../containers/container-knex"));
const mariadb_1 = require("../settings/mariadb");
const ejs_1 = require("../settings/ejs");
class ProductsRouter {
    router = express_1.default.Router();
    apiRouter = express_1.default.Router();
    table;
    productsHtmlPath;
    constructor(productsHtmlPath) {
        this.productsHtmlPath = productsHtmlPath;
        this.initRoutes();
        this.table = new container_knex_1.default(mariadb_1.maridadbOptions.connection.database, 'products', mariadb_1.maridadbOptions);
        this.table.createTable(table => {
            table.increments('id').primary();
            table.string('name');
            table.integer('price');
            table.string('thumbnail');
            table.string('description');
        });
    }
    initRoutes() {
        this.getProductsPage();
        this.getProducts();
        this.getProductsById();
        this.postProduct();
        this.deleteProductById();
        this.putProductById();
    }
    getProductsPage() {
        this.router.get('/', async (req, res) => {
            const prods = await this.table.find({});
            res.render(this.productsHtmlPath, { ...ejs_1.ejsDefaultData, productList: prods });
        });
    }
    getProducts() {
        this.apiRouter.get('/', async (req, res) => {
            const prods = await this.table.find({});
            res.json(prods);
        });
    }
    getProductsById() {
        this.apiRouter.get('/:id', async (req, res) => {
            const prodID = parseInt(req.params.id);
            if (isNaN(prodID))
                return res.send('ID must be an integer number');
            const prod = await this.table.find(['id', '=', prodID]);
            if (!prod)
                return res.status(404).send('404: Product not found');
            res.json(prod);
        });
    }
    postProduct() {
        this.apiRouter.post('/', auth_1.authn, auth_1.authz, async (req, res) => {
            const newProd = (0, parsers_1.parseProduct)(req.body);
            if (!newProd)
                return res.status(400).send('400: Error parsing product, malformed request body');
            await this.table.insert(newProd);
            res.status(201).redirect('/productos');
        });
    }
    deleteProductById() {
        this.apiRouter.delete('/:id', auth_1.authn, auth_1.authz, async (req, res) => {
            const prodID = parseInt(req.params.id);
            if (isNaN(prodID))
                return res.send('ID must be an integer number');
            const success = await this.table.delete(['id', '=', prodID]);
            if (success == null)
                return res.status(400).send('400: Error while deleting product');
            res.status(200).send('200: Product deleted succesfully');
        });
    }
    putProductById() {
        this.apiRouter.put('/:id', auth_1.authn, auth_1.authz, async (req, res) => {
            const prodID = parseInt(req.params.id);
            if (isNaN(prodID))
                return res.send('ID must be an integer number');
            const newProd = (0, parsers_1.parseProduct)(req.body);
            if (!newProd)
                return res.status(400).send('400: Error parsing product, malformed request body');
            const success = await this.table.update(['id', '=', prodID], newProd);
            if (success == null)
                return res.status(400).send('400: Error while updating product');
            res.status(200).send('200: Product updated succesfully');
        });
    }
}
exports.default = ProductsRouter;
