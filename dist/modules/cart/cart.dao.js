"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_dao_mongo_1 = __importDefault(require("./cart.dao.mongo"));
const CartDao = cart_dao_mongo_1.default;
exports.default = CartDao;
