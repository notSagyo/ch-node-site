"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_dao_mongo_1 = __importDefault(require("./user.dao.mongo"));
const UserDao = user_dao_mongo_1.default;
exports.default = UserDao;
