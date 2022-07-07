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
var mongoose_1 = require("mongoose");
var mongoose_2 = require("../settings/mongoose");
var Container = /** @class */ (function () {
    function Container(model) {
        Object.defineProperty(this, "connection", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "model", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.model = model;
    }
    Object.defineProperty(Container.prototype, "connect", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return __awaiter(this, void 0, void 0, function () {
                var uri, connectOptions, _a, err_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            uri = mongoose_2.mongooseOptions.uri, connectOptions = mongoose_2.mongooseOptions.options;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            _a = this;
                            return [4 /*yield*/, mongoose_1.default.connect(uri, connectOptions)];
                        case 2:
                            _a.connection = (_b.sent()).connection;
                            console.log('Connected to mongoDB');
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _b.sent();
                            console.error(err_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
    });
    Object.defineProperty(Container.prototype, "close", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return __awaiter(this, void 0, void 0, function () {
                var err_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.connection)
                                return [2 /*return*/];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.connection.close()];
                        case 2:
                            _a.sent();
                            this.connection = undefined;
                            console.log('Disconected from mongoDB\n');
                            return [3 /*break*/, 4];
                        case 3:
                            err_2 = _a.sent();
                            console.error(err_2);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
    });
    Object.defineProperty(Container.prototype, "insert", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var success, err_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connect()];
                        case 1:
                            _a.sent();
                            success = false;
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, this.model.create(data)];
                        case 3:
                            _a.sent();
                            success = true;
                            console.log('Inserted new data:', data);
                            return [3 /*break*/, 5];
                        case 4:
                            err_3 = _a.sent();
                            console.error(err_3);
                            return [3 /*break*/, 5];
                        case 5:
                            this.close();
                            return [2 /*return*/, success];
                    }
                });
            });
        }
    });
    Object.defineProperty(Container.prototype, "find", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (filter) {
            return __awaiter(this, void 0, void 0, function () {
                var result, allOrFilter, err_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connect()];
                        case 1:
                            _a.sent();
                            result = null;
                            allOrFilter = filter === '*' ? {} : filter;
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, this.model.find(allOrFilter).exec()];
                        case 3:
                            result = _a.sent();
                            console.log("Found data matching ".concat(filter, ": ").concat(result));
                            return [3 /*break*/, 5];
                        case 4:
                            err_4 = _a.sent();
                            console.error(err_4);
                            return [3 /*break*/, 5];
                        case 5:
                            this.close();
                            return [2 /*return*/, result];
                    }
                });
            });
        }
    });
    Object.defineProperty(Container.prototype, "update", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (filter, data) {
            return __awaiter(this, void 0, void 0, function () {
                var success, allOrFilter, err_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connect()];
                        case 1:
                            _a.sent();
                            success = false;
                            allOrFilter = filter == '*' ? {} : filter;
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, this.model.updateMany(allOrFilter, data)];
                        case 3:
                            _a.sent();
                            success = true;
                            console.log('Updated elements matching:', filter);
                            return [3 /*break*/, 5];
                        case 4:
                            err_5 = _a.sent();
                            console.error(err_5);
                            return [3 /*break*/, 5];
                        case 5:
                            this.close();
                            return [2 /*return*/, success];
                    }
                });
            });
        }
    });
    Object.defineProperty(Container.prototype, "delete", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (filter) {
            return __awaiter(this, void 0, void 0, function () {
                var success, allOrFilter, err_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connect()];
                        case 1:
                            _a.sent();
                            success = false;
                            allOrFilter = filter === '*' ? {} : filter;
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, this.model.deleteMany(allOrFilter)];
                        case 3:
                            _a.sent();
                            success = true;
                            console.log('Deleted elements matching:', filter);
                            return [3 /*break*/, 5];
                        case 4:
                            err_6 = _a.sent();
                            console.error(err_6);
                            return [3 /*break*/, 5];
                        case 5:
                            this.close();
                            return [2 /*return*/, success];
                    }
                });
            });
        }
    });
    return Container;
}());
exports.default = Container;
