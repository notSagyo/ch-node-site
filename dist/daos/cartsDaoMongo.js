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
var container_mongo_1 = require("../containers/container-mongo");
var cart_1 = require("../models/cart");
var uuid_1 = require("uuid");
// !TODO: Add product!
var CartsDao = /** @class */ (function () {
    function CartsDao() {
        Object.defineProperty(this, "container", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new container_mongo_1.default(cart_1.cartModel)
        });
    }
    Object.defineProperty(CartsDao.prototype, "save", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (cart) {
            return __awaiter(this, void 0, void 0, function () {
                var cartWithId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            cartWithId = {
                                id: (0, uuid_1.v4)(),
                                products: (cart === null || cart === void 0 ? void 0 : cart.products) || [],
                                timestamp: (cart === null || cart === void 0 ? void 0 : cart.timestamp) || Date.now()
                            };
                            return [4 /*yield*/, this.container.insert(cartWithId)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        }
    });
    Object.defineProperty(CartsDao.prototype, "getById", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var res, product;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.container.find({ id: id })];
                        case 1:
                            res = _a.sent();
                            product = res ? res[0] : null;
                            return [2 /*return*/, product];
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
                        case 0: return [4 /*yield*/, this.container.find({})];
                        case 1: return [2 /*return*/, (_a.sent()) || []];
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
                        case 0: return [4 /*yield*/, this.container.update({ id: id }, data)];
                        case 1: return [2 /*return*/, _a.sent()];
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
                        case 0: return [4 /*yield*/, this.container.delete({ id: id })];
                        case 1: return [2 /*return*/, _a.sent()];
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
                        case 0: return [4 /*yield*/, this.container.delete({})];
                        case 1: return [2 /*return*/, _a.sent()];
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
                var success, cartProd, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            success = false;
                            cartProd = {
                                id: productId,
                                quantity: quantity || 1,
                                code: '',
                                timestamp: Date.now()
                            };
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.container.update({ id: cartId }, { $push: { products: cartProd } })];
                        case 2:
                            _a.sent();
                            success = true;
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            console.log(error_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/, success];
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
                var success, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            success = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.container.update({ id: cartId }, { $pull: { products: { id: productId } } })];
                        case 2:
                            _a.sent();
                            success = true;
                            return [3 /*break*/, 4];
                        case 3:
                            error_2 = _a.sent();
                            console.log(error_2);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/, success];
                    }
                });
            });
        }
    });
    return CartsDao;
}());
exports.default = CartsDao;
exports.cartsDao = new CartsDao();
