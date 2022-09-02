"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizerMessageSchema = exports.normalizrAuthorSchema = exports.messageModel = exports.messageSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const normalizr_1 = require("normalizr");
const user_1 = require("./user");
exports.messageSchema = new mongoose_1.default.Schema({
    id: { type: String, required: true, unique: true },
    time: { type: Number, required: true },
    author: { type: user_1.userSchema, required: true },
    content: { type: String, required: true },
});
exports.messageModel = mongoose_1.default.model('messages', exports.messageSchema);
exports.normalizrAuthorSchema = new normalizr_1.schema.Entity('authors', {}, { idAttribute: 'email' });
exports.normalizerMessageSchema = new normalizr_1.schema.Entity('messages', { author: exports.normalizrAuthorSchema });
