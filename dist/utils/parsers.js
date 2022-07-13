"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCartProduct = exports.parseCart = exports.parseProduct = exports.parseMessage = exports.parseUser = void 0;
var utils_1 = require("./utils");
var uuid_1 = require("uuid");
var parseUser = function (user) {
    if (user == null)
        return null;
    var isValidName = typeof (user === null || user === void 0 ? void 0 : user.name) === 'string' && user.name.length > 1;
    var isValidAge = typeof (user === null || user === void 0 ? void 0 : user.age) === 'number' && user.age > 0;
    var isValidId = typeof (user === null || user === void 0 ? void 0 : user.id) === 'string' && (0, uuid_1.validate)(user.id);
    var isValidLastName = typeof (user === null || user === void 0 ? void 0 : user.lastName) === 'string'
        && user.lastName.length > 1;
    var isValidUsername = typeof (user === null || user === void 0 ? void 0 : user.username) === 'string'
        && user.username.length > 2;
    var isValidAvatar = typeof (user === null || user === void 0 ? void 0 : user.avatar) === 'string'
        && user.avatar.length > 0;
    var isValidEmail = typeof (user === null || user === void 0 ? void 0 : user.email) === 'string'
        && (0, utils_1.validateEmail)(user.email);
    if (!isValidAge)
        console.log('Invalid user age');
    else if (!isValidName)
        console.log('Invalid user name');
    else if (!isValidEmail)
        console.log('Invalid user email');
    else if (!isValidUsername)
        console.log('Invalid user username');
    else if (!isValidLastName)
        console.log('Invalid user last name');
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
        age: user.age,
        name: user.name,
        email: user.email,
        lastName: user.lastName,
        username: user.username,
    });
};
exports.parseUser = parseUser;
var parseMessage = function (msg) {
    if (msg == null)
        return null;
    var author = (0, exports.parseUser)(msg === null || msg === void 0 ? void 0 : msg.author);
    var id = typeof (msg === null || msg === void 0 ? void 0 : msg.id) === 'string' ? msg.id : (0, uuid_1.v4)();
    var content = typeof (msg === null || msg === void 0 ? void 0 : msg.content) === 'string' && (msg === null || msg === void 0 ? void 0 : msg.content.length) > 0
        ? msg.content
        : '';
    var time = (msg === null || msg === void 0 ? void 0 : msg.time) && !isNaN(Number(msg === null || msg === void 0 ? void 0 : msg.time))
        ? Number(msg.time)
        : Date.now();
    if (author == null) {
        console.log('Invalid message author');
        return null;
    }
    return { id: id, time: time, author: author, content: content };
};
exports.parseMessage = parseMessage;
var parseProduct = function (prod) {
    var placeholder = 'https://via.placeholder.com/256';
    var isValidName = typeof (prod === null || prod === void 0 ? void 0 : prod.name) === 'string' && prod.name.length > 0;
    var isValidDescription = typeof (prod === null || prod === void 0 ? void 0 : prod.description) === 'string';
    var isValidPrice = (prod === null || prod === void 0 ? void 0 : prod.price) && !isNaN(Number(prod === null || prod === void 0 ? void 0 : prod.price))
        && Number(prod === null || prod === void 0 ? void 0 : prod.price) > 0;
    var isValidThumbnail = typeof (prod === null || prod === void 0 ? void 0 : prod.thumbnail) === 'string'
        && (prod === null || prod === void 0 ? void 0 : prod.thumbnail.length) > 0;
    var description = isValidDescription ? prod.description : undefined;
    var thumbnail = isValidThumbnail ? prod.thumbnail : placeholder;
    var id = typeof (prod === null || prod === void 0 ? void 0 : prod.id) === 'string' ? prod.id : '-1';
    var price = isValidPrice ? Number(prod.price) : null;
    var name = isValidName ? prod.name : null;
    if (name != null && price != null)
        return { id: id, name: name, price: price, thumbnail: thumbnail, description: description };
    return null;
};
exports.parseProduct = parseProduct;
var parseCart = function (cart) {
    var products = [];
    var timestamp = Date.now();
    var id = (0, uuid_1.v4)();
    if (cart != null) {
        var isValidId = typeof (cart === null || cart === void 0 ? void 0 : cart.id) === 'string' && (0, uuid_1.validate)(cart.id);
        var isValidTimestamp = typeof (cart === null || cart === void 0 ? void 0 : cart.timestamp) === 'number'
            && !isNaN(cart.timestamp);
        var isValidProducts = Array.isArray(cart === null || cart === void 0 ? void 0 : cart.products)
            && cart.products.length > 0
            && cart.products.every(function (prod) { return (0, exports.parseProduct)(prod) != null; });
        isValidId && (id = cart.id);
        isValidProducts && cart.products;
        isValidTimestamp && (timestamp = cart.timestamp);
    }
    return { id: id, timestamp: timestamp, products: products };
};
exports.parseCart = parseCart;
var parseCartProduct = function (prod) {
    var isValidCode = typeof (prod === null || prod === void 0 ? void 0 : prod.code) === 'string' && prod.code.length > 0;
    var isValidId = typeof (prod === null || prod === void 0 ? void 0 : prod.id) === 'string' && (0, uuid_1.validate)(prod.id);
    var isValidTimestamp = typeof (prod === null || prod === void 0 ? void 0 : prod.timestamp) === 'number'
        && prod.timestamp > 0;
    var isValidQuantity = typeof (prod === null || prod === void 0 ? void 0 : prod.quantity) === 'number'
        && prod.quantity > 0;
    if (!isValidId)
        return null;
    var quantity = isValidQuantity ? prod.quantity : 1;
    var timestamp = isValidTimestamp ? prod.timestamp : Date.now();
    var code = isValidCode ? prod.code : '-1';
    var id = prod.id;
    return ({ id: id, code: code, quantity: quantity, timestamp: timestamp });
};
exports.parseCartProduct = parseCartProduct;
