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
exports.testContainerMongo = void 0;
var uuid_1 = require("uuid");
var container_mongo_1 = require("../../containers/container-mongo");
var product_1 = require("../../models/product");
var tests_1 = require("../tests");
var testContainerMongo = function () { return __awaiter(void 0, void 0, void 0, function () {
    var container;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                container = new container_mongo_1.default(product_1.productsModel);
                return [4, (0, tests_1.testFunction)('connect()', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, container.connect()];
                                case 1:
                                    _a.sent();
                                    return [2];
                            }
                        });
                    }); })];
            case 1:
                _a.sent();
                return [4, (0, tests_1.testFunction)('close()', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, container.close()];
                                case 1:
                                    _a.sent();
                                    return [2];
                            }
                        });
                    }); })];
            case 2:
                _a.sent();
                return [4, (0, tests_1.testFunction)('insert()', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, container.insert({ id: (0, uuid_1.v4)(), name: 'Test', price: 100 })];
                                case 1:
                                    _a.sent();
                                    return [4, container.insert({ id: (0, uuid_1.v4)(), name: 'Test2', price: 100 })];
                                case 2:
                                    _a.sent();
                                    return [4, container.insert({ id: (0, uuid_1.v4)(), name: 'Test3', price: 100 })];
                                case 3:
                                    _a.sent();
                                    return [2];
                            }
                        });
                    }); })];
            case 3:
                _a.sent();
                return [4, (0, tests_1.testFunction)('find() ALL', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var res;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, container.find({})];
                                case 1:
                                    res = _a.sent();
                                    console.log(res);
                                    return [2];
                            }
                        });
                    }); })];
            case 4:
                _a.sent();
                return [4, (0, tests_1.testFunction)('find() {name: "Test"}', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var res;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, container.find({ name: 'Test' })];
                                case 1:
                                    res = _a.sent();
                                    console.log(res);
                                    return [2];
                            }
                        });
                    }); })];
            case 5:
                _a.sent();
                return [4, (0, tests_1.testFunction)('find() NON-EXISTENT', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var res;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, container.find({ name: 'papaya' })];
                                case 1:
                                    res = _a.sent();
                                    console.log(res);
                                    return [2];
                            }
                        });
                    }); })];
            case 6:
                _a.sent();
                return [4, (0, tests_1.testFunction)('update()', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var updated;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, container.update({ name: 'Test' }, { name: 'Test999' })];
                                case 1:
                                    _a.sent();
                                    return [4, container.find({})];
                                case 2:
                                    updated = _a.sent();
                                    console.log('After update name Test => Test999:', updated);
                                    return [2];
                            }
                        });
                    }); })];
            case 7:
                _a.sent();
                return [4, (0, tests_1.testFunction)('delete()', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var res;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, container.delete({ name: 'Test999' })];
                                case 1:
                                    _a.sent();
                                    return [4, container.find({})];
                                case 2:
                                    res = _a.sent();
                                    console.log('After delete Test999:', res);
                                    return [2];
                            }
                        });
                    }); })];
            case 8:
                _a.sent();
                return [4, (0, tests_1.testFunction)('delete() ALL', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var res;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, container.delete({})];
                                case 1:
                                    _a.sent();
                                    return [4, container.find({})];
                                case 2:
                                    res = _a.sent();
                                    console.log('After delete ALL', res);
                                    return [2];
                            }
                        });
                    }); })];
            case 9:
                _a.sent();
                console.log('\nFinished testing containerMongo\n');
                return [2];
        }
    });
}); };
exports.testContainerMongo = testContainerMongo;
