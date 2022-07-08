"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUser = exports.usersModel = exports.userSchema = void 0;
var mongoose = require("mongoose");
var uuid_1 = require("uuid");
var utils_1 = require("../utils");
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
var parseUser = function (user) {
    if (user == null)
        return null;
    var isValidId = typeof (user === null || user === void 0 ? void 0 : user.id) === 'string' && (0, uuid_1.validate)(user.id);
    var isValidEmail = typeof (user === null || user === void 0 ? void 0 : user.email) === 'string' && (0, utils_1.validateEmail)(user.email);
    var isValidName = typeof (user === null || user === void 0 ? void 0 : user.name) === 'string' && user.name.length > 1;
    var isValidLastName = typeof (user === null || user === void 0 ? void 0 : user.lastName) === 'string' && user.lastName.length > 1;
    var isValidUsername = typeof (user === null || user === void 0 ? void 0 : user.username) === 'string' && user.username.length > 2;
    var isValidAge = typeof (user === null || user === void 0 ? void 0 : user.age) === 'number' && user.age > 0;
    var isValidAvatar = typeof (user === null || user === void 0 ? void 0 : user.avatar) === 'string' && user.avatar.length > 0;
    var isValid = isValidEmail
        && isValidName
        && isValidLastName
        && isValidUsername
        && isValidAge;
    if (!isValid)
        return null;
    var id = isValidId ? user.id : (0, uuid_1.v4)();
    var avatar = isValidAvatar ? user.avatar : '';
    return ({
        id: id,
        avatar: avatar,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        username: user.username,
        age: user.age,
    });
};
exports.parseUser = parseUser;
