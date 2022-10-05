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
var knex_1 = require("knex");
var logger_1 = require("../utils/logger");
var Container = (function () {
    function Container(schema, table, options) {
        this.options = options;
        this.table = table;
        this.schema = schema;
    }
    Container.prototype.createTable = function (schemaBuilder) {
        return __awaiter(this, void 0, void 0, function () {
            var kn, exists, success;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        kn = (0, knex_1.knex)(this.options);
                        return [4, kn.schema.hasTable(this.table)];
                    case 1:
                        exists = _a.sent();
                        success = exists;
                        if (!!exists) return [3, 3];
                        return [4, kn.schema
                                .createTable(this.table, schemaBuilder)
                                .then(function () { return (success = true); })
                                .catch(function (err) { return logger_1.logger.error(err); })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        kn.destroy();
                        return [2, success];
                }
            });
        });
    };
    Container.prototype.insert = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var kn, success;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        kn = (0, knex_1.knex)(this.options);
                        success = false;
                        return [4, kn(this.table)
                                .insert(obj)
                                .then(function () { return (success = true); })
                                .catch(function (err) { return logger_1.logger.error(err); })];
                    case 1:
                        _a.sent();
                        kn.destroy();
                        return [2, success];
                }
            });
        });
    };
    Container.prototype.find = function (condition, sortColumn, ascending) {
        return __awaiter(this, void 0, void 0, function () {
            var kn, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        kn = (0, knex_1.knex)(this.options);
                        rows = [];
                        if (!(sortColumn != null)) return [3, 2];
                        return [4, kn
                                .from(this.table)
                                .where(condition)
                                .orderBy(sortColumn)
                                .orderBy(ascending ? 'asc' : 'desc')
                                .then(function (res) { return (rows = res); })
                                .catch(function (err) { return logger_1.logger.error(err); })];
                    case 1:
                        _a.sent();
                        return [3, 4];
                    case 2: return [4, kn
                            .from(this.table)
                            .where(condition)
                            .then(function (res) { return (rows = res); })
                            .catch(function (err) { return logger_1.logger.error(err); })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        kn.destroy();
                        return [2, rows];
                }
            });
        });
    };
    Container.prototype.update = function (condition, update) {
        return __awaiter(this, void 0, void 0, function () {
            var kn, success;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        kn = (0, knex_1.knex)(this.options);
                        success = false;
                        return [4, kn(this.table)
                                .where(condition)
                                .update(update)
                                .then(function () { return (success = true); })
                                .catch(function (err) { return logger_1.logger.error(err); })];
                    case 1:
                        _a.sent();
                        kn.destroy();
                        return [2, success];
                }
            });
        });
    };
    Container.prototype.delete = function (condition, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var kn, success;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        kn = (0, knex_1.knex)(this.options);
                        success = false;
                        if (!(limit != null)) return [3, 2];
                        return [4, kn
                                .from(this.table)
                                .where(condition || {})
                                .limit(limit)
                                .del()
                                .then(function () { return (success = true); })
                                .catch(function (err) { return logger_1.logger.error(err); })];
                    case 1:
                        _a.sent();
                        return [3, 4];
                    case 2: return [4, kn
                            .from(this.table)
                            .where(condition || {})
                            .del()
                            .then(function () { return (success = true); })
                            .catch(function (err) { return logger_1.logger.error(err); })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        kn.destroy();
                        return [2, success];
                }
            });
        });
    };
    return Container;
}());
exports.default = Container;
//# sourceMappingURL=container-knex.js.map