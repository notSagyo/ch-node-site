"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var products_dao_mongo_1 = require("../daos/products-dao-mongo");
var parsers_1 = require("../utils/parsers");
var auth_1 = require("../middlewares/auth");
var faker_1 = require("@faker-js/faker");
var ProductsRouter = (function () {
    function ProductsRouter(productsHtmlPath) {
        Object.defineProperty(this, "router", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: express.Router()
        });
        Object.defineProperty(this, "apiRouter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: express.Router()
        });
        Object.defineProperty(this, "testRouter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: express.Router()
        });
        Object.defineProperty(this, "productsHtmlPath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.productsHtmlPath = productsHtmlPath;
        this.initRoutes();
    }
    Object.defineProperty(ProductsRouter.prototype, "initRoutes", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            this.getProductsPage();
            this.getProducts();
            this.getProductsById();
            this.postProduct();
            this.deleteProductById();
            this.putProductById();
            this.productsTest();
        }
    });
    Object.defineProperty(ProductsRouter.prototype, "getProductsPage", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var _this = this;
            this.router.get('/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var prods;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, products_dao_mongo_1.productsDao.getAll()];
                        case 1:
                            prods = _a.sent();
                            res.render(this.productsHtmlPath, { productList: prods });
                            return [2];
                    }
                });
            }); });
        }
    });
    Object.defineProperty(ProductsRouter.prototype, "getProducts", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var _this = this;
            this.apiRouter.get('/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var prods;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, products_dao_mongo_1.productsDao.getAll()];
                        case 1:
                            prods = _a.sent();
                            res.json(prods);
                            return [2];
                    }
                });
            }); });
        }
    });
    Object.defineProperty(ProductsRouter.prototype, "getProductsById", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var _this = this;
            this.apiRouter.get('/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var prodId, prod;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            prodId = req.params.id;
                            return [4, products_dao_mongo_1.productsDao.getById(prodId)];
                        case 1:
                            prod = _a.sent();
                            if (!prod)
                                return [2, res.status(404).send('404: Product not found')];
                            res.json(prod);
                            return [2];
                    }
                });
            }); });
        }
    });
    Object.defineProperty(ProductsRouter.prototype, "postProduct", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var _this = this;
            this.apiRouter.post('/', auth_1.authn, auth_1.authz, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var newProd;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            newProd = (0, parsers_1.parseProduct)(req.body);
                            if (!newProd)
                                return [2, res.status(400).send('400: Error parsing product, malformed request body')];
                            return [4, products_dao_mongo_1.productsDao.save(newProd)];
                        case 1:
                            _a.sent();
                            res.status(201).redirect('/productos');
                            return [2];
                    }
                });
            }); });
        }
    });
    Object.defineProperty(ProductsRouter.prototype, "deleteProductById", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var _this = this;
            this.apiRouter.delete('/:id', auth_1.authn, auth_1.authz, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var prodId, success;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            prodId = req.params.id;
                            return [4, products_dao_mongo_1.productsDao.deleteById(prodId)];
                        case 1:
                            success = _a.sent();
                            if (success == null)
                                return [2, res.status(400).send('400: Error while deleting product')];
                            res.status(200).send('200: Product deleted succesfully');
                            return [2];
                    }
                });
            }); });
        }
    });
    Object.defineProperty(ProductsRouter.prototype, "putProductById", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var _this = this;
            this.apiRouter.put('/:id', auth_1.authn, auth_1.authz, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var prodId, newProd, success, exists;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            prodId = req.params.id;
                            newProd = (0, parsers_1.parseProduct)(req.body);
                            if (!newProd)
                                return [2, res.status(400).send('400: Error parsing product, malformed request body')];
                            success = false;
                            return [4, products_dao_mongo_1.productsDao.getById(prodId)];
                        case 1:
                            exists = (_a.sent()) != null ? true : false;
                            if (!exists) return [3, 3];
                            return [4, products_dao_mongo_1.productsDao.updateById(prodId, newProd)];
                        case 2:
                            success = _a.sent();
                            return [3, 5];
                        case 3: return [4, products_dao_mongo_1.productsDao.save(newProd)];
                        case 4:
                            success = _a.sent();
                            _a.label = 5;
                        case 5:
                            if (success == false)
                                return [2, res.status(400).send('400: Error while updating product')];
                            res.status(200).send('200: Product updated succesfully');
                            return [2];
                    }
                });
            }); });
        }
    });
    Object.defineProperty(ProductsRouter.prototype, "productsTest", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var _this = this;
            this.testRouter.get('/productos-test', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var products, i, prod;
                return __generator(this, function (_a) {
                    products = [];
                    for (i = 0; i < 5; i++) {
                        prod = {
                            id: '0',
                            name: faker_1.faker.commerce.product(),
                            price: Number(faker_1.faker.commerce.price()),
                            description: faker_1.faker.commerce.productDescription(),
                            thumbnail: faker_1.faker.image.abstract()
                        };
                        products.push(prod);
                    }
                    res.status(200).json(products);
                    return [2];
                });
            }); });
        }
    });
    return ProductsRouter;
}());
exports.default = ProductsRouter;
