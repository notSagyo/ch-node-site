"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var mongoose_1 = __importStar(require("mongoose"));
var mongoose_2 = require("../config/mongoose");
var logger_1 = require("../utils/logger");
var Container = (function () {
    function Container(model) {
        this.model = model;
        this.collection = this.model.collection.name;
        Container.connection == null && this.connect();
    }
    Container.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var uri, options, _a, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        uri = mongoose_2.mongooseOptions.uri, options = mongoose_2.mongooseOptions.options;
                        Container.connection = 'pending';
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = Container;
                        return [4, mongoose_1.default.connect(uri, options)];
                    case 2:
                        _a.connection = (_b.sent()).connection;
                        logger_1.logger.info('Connected to mongoDB');
                        return [3, 4];
                    case 3:
                        err_1 = _b.sent();
                        logger_1.logger.error(err_1);
                        Container.connection = undefined;
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    Container.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(Container.connection instanceof mongoose_1.Connection))
                            return [2];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, Container.connection.close()];
                    case 2:
                        _a.sent();
                        Container.connection = undefined;
                        logger_1.logger.info('Disconected from mongoDB\n');
                        return [3, 4];
                    case 3:
                        err_2 = _a.sent();
                        logger_1.logger.error(err_2);
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    Container.prototype.insert = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var success, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        success = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.model.create(data)];
                    case 2:
                        _a.sent();
                        success = true;
                        logger_1.logger.info("Inserted new data to \"".concat(this.collection, "\""));
                        return [3, 4];
                    case 3:
                        err_3 = _a.sent();
                        logger_1.logger.error(err_3);
                        return [3, 4];
                    case 4: return [2, success];
                }
            });
        });
    };
    Container.prototype.find = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var result, allOrFilter, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        allOrFilter = filter === '*' ? {} : filter;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.model.find(allOrFilter).lean()];
                    case 2:
                        result = _a.sent();
                        logger_1.logger.info("Retrieved from \"".concat(this.collection, "\" elements matching:"), filter);
                        return [3, 4];
                    case 3:
                        err_4 = _a.sent();
                        logger_1.logger.error(err_4);
                        return [3, 4];
                    case 4: return [2, result];
                }
            });
        });
    };
    Container.prototype.update = function (filter, data) {
        return __awaiter(this, void 0, void 0, function () {
            var success, allOrFilter, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        success = false;
                        allOrFilter = filter == '*' ? {} : filter;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.model.updateMany(allOrFilter, data)];
                    case 2:
                        _a.sent();
                        success = true;
                        logger_1.logger.info("Updated from \"".concat(this.collection, "\" elements matching:"), filter);
                        return [3, 4];
                    case 3:
                        err_5 = _a.sent();
                        logger_1.logger.error(err_5);
                        return [3, 4];
                    case 4: return [2, success];
                }
            });
        });
    };
    Container.prototype.delete = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var success, allOrFilter, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        success = false;
                        allOrFilter = filter === '*' ? {} : filter;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.model.deleteMany(allOrFilter)];
                    case 2:
                        _a.sent();
                        success = true;
                        logger_1.logger.info("Deleted from \"".concat(this.collection, "\" elements matching:"), filter);
                        return [3, 4];
                    case 3:
                        err_6 = _a.sent();
                        logger_1.logger.error(err_6);
                        return [3, 4];
                    case 4: return [2, success];
                }
            });
        });
    };
    return Container;
}());
exports.default = Container;
//# sourceMappingURL=container-mongo.js.map