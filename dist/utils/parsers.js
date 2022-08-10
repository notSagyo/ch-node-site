"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCartProduct = exports.parseCart = exports.parseProduct = exports.parseMessage = exports.parseUser = void 0;
const utils_1 = require("./utils");
const uuid_1 = require("uuid");
const parseUser = (user) => {
    if (user == null)
        return null;
    const isValidPassword = typeof user?.password === 'string' && user.password.length > 1;
    const isValidName = typeof user?.name === 'string' && user.name.length > 1;
    const isValidAge = typeof user?.age === 'number' && user.age > 0;
    const isValidId = typeof user?.id === 'string' && (0, uuid_1.validate)(user.id);
    const isValidLastName = typeof user?.lastName === 'string'
        && user.lastName.length > 1;
    const isValidUsername = typeof user?.username === 'string'
        && user.username.length > 2;
    const isValidAvatar = typeof user?.avatar === 'string'
        && user.avatar.length > 0;
    const isValidEmail = typeof user?.email === 'string'
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
    else if (!isValidPassword)
        console.log('Invalid user password');
    const isValid = isValidEmail
        && isValidName
        && isValidLastName
        && isValidUsername
        && isValidPassword
        && isValidAge;
    if (!isValid)
        return null;
    const id = isValidId ? user.id : (0, uuid_1.v4)();
    const avatar = isValidAvatar ? user.avatar : '';
    return ({
        id,
        avatar,
        age: user.age,
        name: user.name,
        email: user.email,
        lastName: user.lastName,
        username: user.username,
        password: user.password,
    });
};
exports.parseUser = parseUser;
const parseMessage = (msg) => {
    if (msg == null)
        return null;
    const author = (0, exports.parseUser)(msg?.author);
    const id = typeof msg?.id === 'string' ? msg.id : (0, uuid_1.v4)();
    const content = typeof msg?.content === 'string' && msg?.content.length > 0
        ? msg.content
        : '';
    const time = msg?.time && !isNaN(Number(msg?.time))
        ? Number(msg.time)
        : Date.now();
    if (author == null) {
        console.log('Invalid message author');
        return null;
    }
    return { id, time, author, content };
};
exports.parseMessage = parseMessage;
const parseProduct = (prod) => {
    const placeholder = 'https://via.placeholder.com/256';
    const isValidName = typeof prod?.name === 'string' && prod.name.length > 0;
    const isValidId = typeof prod?.id === 'string' && (0, uuid_1.validate)(prod.id);
    const isValidDescription = typeof prod?.description === 'string';
    const isValidPrice = prod?.price && !isNaN(Number(prod?.price))
        && Number(prod?.price) > 0;
    const isValidThumbnail = typeof prod?.thumbnail === 'string'
        && prod?.thumbnail.length > 0;
    const description = isValidDescription ? prod.description : undefined;
    const thumbnail = isValidThumbnail ? prod.thumbnail : placeholder;
    const price = isValidPrice ? Number(prod.price) : null;
    const name = isValidName ? prod.name : null;
    const id = isValidId ? prod.id : (0, uuid_1.v4)();
    if (name != null && price != null)
        return { id, name, price, thumbnail, description };
    return null;
};
exports.parseProduct = parseProduct;
const parseCart = (cart) => {
    let products = [];
    let timestamp = Date.now();
    let id = (0, uuid_1.v4)();
    if (cart != null) {
        const isValidId = typeof cart?.id === 'string' && (0, uuid_1.validate)(cart.id);
        const isValidTimestamp = typeof cart?.timestamp === 'number'
            && !isNaN(cart.timestamp);
        const isValidProducts = Array.isArray(cart?.products)
            && cart.products.length > 0
            && cart.products.every(prod => (0, exports.parseProduct)(prod) != null);
        isValidId && (id = cart.id);
        isValidProducts && cart.products;
        isValidTimestamp && (timestamp = cart.timestamp);
    }
    return { id, timestamp, products };
};
exports.parseCart = parseCart;
const parseCartProduct = (prod) => {
    const isValidCode = typeof prod?.code === 'string' && prod.code.length > 0;
    const isValidId = typeof prod?.id === 'string' && (0, uuid_1.validate)(prod.id);
    const isValidTimestamp = typeof prod?.timestamp === 'number'
        && prod.timestamp > 0;
    const isValidQuantity = typeof prod?.quantity === 'number'
        && prod.quantity > 0;
    if (!isValidId)
        return null;
    const quantity = isValidQuantity ? prod.quantity : 1;
    const timestamp = isValidTimestamp ? prod.timestamp : Date.now();
    const code = isValidCode ? prod.code : '-1';
    const id = prod.id;
    return ({ id, code, quantity, timestamp });
};
exports.parseCartProduct = parseCartProduct;
