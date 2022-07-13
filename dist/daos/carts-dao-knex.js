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
exports.cartsDao = void 0;
var container_knex_1 = require("../containers/container-knex");
var mariadb_1 = require("../settings/mariadb");
var parsers_1 = require("../utils/parsers");
var CartsDao = (function () {
    function CartsDao() {
        Object.defineProperty(this, "container", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new container_knex_1.default(mariadb_1.maridadbOptions.connection.database, 'carts', mariadb_1.maridadbOptions)
        });
    }
    Object.defineProperty(CartsDao.prototype, "save", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (cart) {
            var parsedCart = (0, parsers_1.parseCart)(cart);
            var success = this.container.insert(parsedCart);
            return success;
        }
    });
    Object.defineProperty(CartsDao.prototype, "getById", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var result, cart;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.container.find({ id: id })];
                        case 1:
                            result = _a.sent();
                            cart = result ? result[0] : null;
                            return [2, cart];
                    }
                });
            });
        }
    });
    Object.defineProperty(CartsDao.prototype, "getAll", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.container.find({})];
                        case 1: return [2, (_a.sent()) || []];
                    }
                });
            });
        }
    });
    Object.defineProperty(CartsDao.prototype, "updateById", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (id, data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.container.update({ id: id }, data)];
                        case 1: return [2, _a.sent()];
                    }
                });
            });
        }
    });
    Object.defineProperty(CartsDao.prototype, "deleteById", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.container.delete({ id: id })];
                        case 1: return [2, _a.sent()];
                    }
                });
            });
        }
    });
    Object.defineProperty(CartsDao.prototype, "deleteAll", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.container.delete({})];
                        case 1: return [2, _a.sent()];
                    }
                });
            });
        }
    });
    Object.defineProperty(CartsDao.prototype, "addProductById", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (cartId, productId, quantity) {
            return __awaiter(this, void 0, void 0, function () {
                var parsedProd, cart, success, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parsedProd = (0, parsers_1.parseCartProduct)({ id: productId, quantity: quantity });
                            return [4, this.getById(cartId)];
                        case 1:
                            cart = _a.sent();
                            success = false;
                            if (parsedProd == null || cart == null)
                                return [2, success];
                            cart.products.push(parsedProd);
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4, this.container.update({ id: cartId }, { products: cart.products })];
                        case 3:
                            _a.sent();
                            return [3, 5];
                        case 4:
                            error_1 = _a.sent();
                            console.log(error_1);
                            return [3, 5];
                        case 5: return [2, success];
                    }
                });
            });
        }
    });
    Object.defineProperty(CartsDao.prototype, "removeProductById", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (cartId, productId) {
            return __awaiter(this, void 0, void 0, function () {
                var cart, success, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.getById(cartId)];
                        case 1:
                            cart = _a.sent();
                            success = false;
                            if (cart == null)
                                return [2, success];
                            cart.products = cart.products.filter(function (p) { return p.id !== productId; });
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4, this.container.update({ id: cartId }, { products: cart.products })];
                        case 3:
                            _a.sent();
                            return [3, 5];
                        case 4:
                            error_2 = _a.sent();
                            console.log(error_2);
                            return [3, 5];
                        case 5: return [2, success];
                    }
                });
            });
        }
    });
    return CartsDao;
}());
exports.default = CartsDao;
exports.cartsDao = new CartsDao();
