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
var carts_dao_knex_1 = require("../daos/carts-dao-knex");
var CartRouter = (function () {
    function CartRouter(cartHtmlPath) {
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
        Object.defineProperty(this, "cartHtmlPath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.cartHtmlPath = cartHtmlPath;
        this.initRoutes();
    }
    Object.defineProperty(CartRouter.prototype, "initRoutes", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            this.getProductsPage();
            this.getCartProductsById();
            this.postCart();
            this.postCartProduct();
            this.deleteCartById();
            this.deleteCartProductById();
        }
    });
    Object.defineProperty(CartRouter.prototype, "getProductsPage", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var _this = this;
            this.router.get('/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    res.render(this.cartHtmlPath);
                    return [2];
                });
            }); });
        }
    });
    Object.defineProperty(CartRouter.prototype, "getCartProductsById", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var _this = this;
            this.apiRouter.get('/:id/productos', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var cartId, cart;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            cartId = req.params.id;
                            return [4, carts_dao_knex_1.cartsDao.getById(cartId)];
                        case 1:
                            cart = _a.sent();
                            if (!cart)
                                return [2, res.status(404).send("404: Cart with ID:".concat(cartId, " not found"))];
                            res.status(200).json(cart.products);
                            return [2];
                    }
                });
            }); });
        }
    });
    Object.defineProperty(CartRouter.prototype, "postCart", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var _this = this;
            this.apiRouter.post('/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var newCartId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, carts_dao_knex_1.cartsDao.save()];
                        case 1:
                            newCartId = _a.sent();
                            if (newCartId == null)
                                return [2, res.status(400).send('400: Error while saving cart')];
                            res.status(201).send("201: Cart N\u00B0".concat(newCartId, " created succesfully"));
                            return [2];
                    }
                });
            }); });
        }
    });
    Object.defineProperty(CartRouter.prototype, "deleteCartById", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var _this = this;
            this.apiRouter.delete('/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var cartId, success;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            cartId = req.params.id;
                            return [4, carts_dao_knex_1.cartsDao.deleteById(cartId)];
                        case 1:
                            success = _a.sent();
                            if (success == null)
                                return [2, res.status(400).send('400: Error while deleting cart')];
                            res.status(200).send("200: Cart N\u00B0".concat(cartId, " deleted succesfully"));
                            return [2];
                    }
                });
            }); });
        }
    });
    Object.defineProperty(CartRouter.prototype, "postCartProduct", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var _this = this;
            this.apiRouter.post('/:id/productos', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var cartId, productId, success;
                return __generator(this, function (_a) {
                    cartId = req.params.id;
                    productId = req.body.id;
                    success = carts_dao_knex_1.cartsDao.addProductById(cartId, productId);
                    if (success == null)
                        return [2, res.status(400).send('400: Error while saving cart')];
                    res.status(201).send('201: Product added succesfully');
                    return [2];
                });
            }); });
        }
    });
    Object.defineProperty(CartRouter.prototype, "deleteCartProductById", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var _this = this;
            this.apiRouter.delete('/:cartId/productos/:productId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var cartId, productId, success;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            cartId = req.params.cartId;
                            productId = req.params.productId;
                            return [4, carts_dao_knex_1.cartsDao.removeProductById(cartId, productId)];
                        case 1:
                            success = _a.sent();
                            if (success == null)
                                return [2, res.status(400).send('400: Error while saving cart')];
                            res.status(200).send('200: CartProduct deleted succesfully');
                            return [2];
                    }
                });
            }); });
        }
    });
    return CartRouter;
}());
exports.default = CartRouter;
