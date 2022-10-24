"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chat_dao_mongo_1 = __importDefault(require("./chat.dao.mongo"));
const MessageDao = chat_dao_mongo_1.default;
exports.default = MessageDao;
