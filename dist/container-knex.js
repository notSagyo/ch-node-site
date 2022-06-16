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
var Knex = require("knex");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var Container = /** @class */ (function () {
    function Container(schema, table, options) {
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "table", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "schema", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.options = options;
        this.table = table;
        this.schema = schema;
    }
    Object.defineProperty(Container.prototype, "createTable", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (schemaBuilder) {
            return __awaiter(this, void 0, void 0, function () {
                var knex, exists, success;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            knex = Knex.knex(this.options);
                            return [4 /*yield*/, knex.schema.hasTable(this.table)];
                        case 1:
                            exists = _a.sent();
                            success = exists;
                            if (!!exists) return [3 /*break*/, 3];
                            return [4 /*yield*/, knex.schema.createTable(this.table, schemaBuilder)
                                    .then(function () { return success = true; })
                                    .catch(function (err) { return console.log(err); })
                                    .finally(function () { return knex.destroy(); })];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2 /*return*/, success];
                    }
                });
            });
        }
    });
    Object.defineProperty(Container.prototype, "insert", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (obj) {
            return __awaiter(this, void 0, void 0, function () {
                var knex, success;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            knex = Knex.knex(this.options);
                            success = false;
                            return [4 /*yield*/, knex(this.table).insert(obj)
                                    .then(function () { return success = true; })
                                    .catch(function (err) { return console.log(err); })
                                    .finally(function () { return knex.destroy(); })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, success];
                    }
                });
            });
        }
    });
    Object.defineProperty(Container.prototype, "select", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (column) {
            return __awaiter(this, void 0, void 0, function () {
                var knex, rows;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            knex = Knex.knex(this.options);
                            rows = [];
                            return [4 /*yield*/, knex.from(this.table).select(column)
                                    .then(function (res) { return rows = res; })
                                    .catch(function (err) { return console.log(err); })
                                    .finally(function () { return knex.destroy(); })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, rows];
                    }
                });
            });
        }
    });
    Object.defineProperty(Container.prototype, "selectWhere", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (columns, condition) {
            return __awaiter(this, void 0, void 0, function () {
                var knex, rows;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            knex = Knex.knex(this.options);
                            rows = [];
                            return [4 /*yield*/, (_a = knex.from(this.table).select(columns)).where.apply(_a, condition).then(function (res) { return rows = res; })
                                    .catch(function (err) { return console.log(err); })
                                    .finally(function () { return knex.destroy(); })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/, rows];
                    }
                });
            });
        }
    });
    Object.defineProperty(Container.prototype, "deleteAll", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return __awaiter(this, void 0, void 0, function () {
                var knex, success;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            knex = Knex.knex(this.options);
                            success = false;
                            return [4 /*yield*/, knex.del().from(this.table)
                                    .then(function () { return success = true; })
                                    .catch(function (err) { return console.log(err); })
                                    .finally(function () { return knex.destroy(); })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, success];
                    }
                });
            });
        }
    });
    Object.defineProperty(Container.prototype, "deleteWhere", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (condition) {
            return __awaiter(this, void 0, void 0, function () {
                var knex, success;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            knex = Knex.knex(this.options);
                            success = false;
                            return [4 /*yield*/, (_a = knex.from(this.table)).where.apply(_a, condition).del()
                                    .then(function () { return success = true; })
                                    .catch(function (err) { return console.log(err); })
                                    .finally(function () { return knex.destroy(); })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/, success];
                    }
                });
            });
        }
    });
    Object.defineProperty(Container.prototype, "updateWhere", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (condition, obj) {
            return __awaiter(this, void 0, void 0, function () {
                var knex, success;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            knex = Knex.knex(this.options);
                            success = false;
                            return [4 /*yield*/, (_a = knex.from(this.table)).where.apply(_a, condition).update(obj)
                                    .then(function () { return success = true; })
                                    .catch(function (err) { return console.log(err); })
                                    .finally(function () { return knex.destroy(); })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/, success];
                    }
                });
            });
        }
    });
    Object.defineProperty(Container.prototype, "orderBy", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (column, order) {
            return __awaiter(this, void 0, void 0, function () {
                var knex, rows;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            knex = Knex.knex(this.options);
                            rows = [];
                            return [4 /*yield*/, knex.from(this.table).orderBy(column, order)
                                    .then(function (res) { return rows = res; })
                                    .catch(function (err) { return console.log(err); })
                                    .finally(function () { return knex.destroy(); })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, rows];
                    }
                });
            });
        }
    });
    return Container;
}());
exports.default = Container;
