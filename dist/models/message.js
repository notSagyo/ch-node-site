"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizrMessage = exports.normalizrAuthor = exports.messageModel = exports.messageSchema = void 0;
var mongoose = require("mongoose");
var normalizr = require("normalizr");
var user_1 = require("./user");
exports.messageSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    time: { type: Number, required: true },
    author: { type: user_1.userSchema, required: true },
    content: { type: String, required: true }
});
exports.messageModel = mongoose.model('messages', exports.messageSchema);
exports.normalizrAuthor = new normalizr.schema.Entity('authors', {}, { idAttribute: 'email' });
exports.normalizrMessage = new normalizr.schema.Entity('messages', { author: exports.normalizrAuthor, });
