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
exports.testCartDaoMongo = void 0;
var uuid_1 = require("uuid");
var cart_product_1 = require("../../cart/cart-product");
var cartsDaoMongo_1 = require("../../daos/cartsDaoMongo");
var tests_1 = require("../tests");
var testCartDaoMongo = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, tests_1.testFunction)('save()', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, cartsDaoMongo_1.cartsDao.save({ id: '0', products: [], timestamp: Date.now() })];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, cartsDaoMongo_1.cartsDao.save({ id: '1', products: [], timestamp: Date.now() })];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, cartsDaoMongo_1.cartsDao.save({ id: '2', products: [], timestamp: Date.now() })];
                            case 3:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, tests_1.testFunction)('getAll()', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var res;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, cartsDaoMongo_1.cartsDao.getAll()];
                                case 1:
                                    res = _a.sent();
                                    console.log(res);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, tests_1.testFunction)('getById()', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var res;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, cartsDaoMongo_1.cartsDao.getById('0')];
                                case 1:
                                    res = _a.sent();
                                    console.log(res);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 3:
                _a.sent();
                return [4 /*yield*/, (0, tests_1.testFunction)('updateById()', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var newCartProd, updated;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    newCartProd = (0, cart_product_1.parseCartProduct)({ id: (0, uuid_1.v4)(), quantity: 1 });
                                    if (!newCartProd)
                                        return [2 /*return*/];
                                    return [4 /*yield*/, cartsDaoMongo_1.cartsDao.updateById('0', { products: [newCartProd] })];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, cartsDaoMongo_1.cartsDao.getAll()];
                                case 2:
                                    updated = _a.sent();
                                    console.log('After update id:"0" {id: v4(), quantity: 1}:', updated);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 4:
                _a.sent();
                return [4 /*yield*/, (0, tests_1.testFunction)('deleteById()', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var res;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, cartsDaoMongo_1.cartsDao.deleteById('0')];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, cartsDaoMongo_1.cartsDao.getAll()];
                                case 2:
                                    res = _a.sent();
                                    console.log('After delete id:"0":', res);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 5:
                _a.sent();
                return [4 /*yield*/, (0, tests_1.testFunction)('deleteAll()', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var res;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, cartsDaoMongo_1.cartsDao.deleteAll()];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, cartsDaoMongo_1.cartsDao.getAll()];
                                case 2:
                                    res = _a.sent();
                                    console.log('After delete:', res);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 6:
                _a.sent();
                console.log('\nFinished testing cartDaoMongo\n');
                return [2 /*return*/];
        }
    });
}); };
exports.testCartDaoMongo = testCartDaoMongo;
