"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersModel = exports.userSchema = void 0;
var mongoose = require("mongoose");
exports.userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    age: { type: Number, required: true },
    avatar: { type: String },
});
exports.usersModel = mongoose.model('users', exports.userSchema);
