"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_dao_mongo_1 = __importDefault(require("./product.dao.mongo"));
const ProductDao = product_dao_mongo_1.default;
exports.default = ProductDao;
