"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = exports.cartProductsToProducts = exports.uploadsDir = exports.publicDir = exports.baseDir = void 0;
const path_1 = __importDefault(require("path"));
const products_dao_mongo_1 = require("../daos/products-dao-mongo");
exports.baseDir = path_1.default.join(__dirname, '..', '..');
exports.publicDir = path_1.default.join(exports.baseDir, 'public');
exports.uploadsDir = path_1.default.join(exports.publicDir, 'uploads');
const cartProductsToProducts = async (cartProds) => {
    const promises = [];
    const products = [];
    for (let i = 0; i < cartProds.length; i++) {
        const element = cartProds[i];
        promises.push(products_dao_mongo_1.productsDao.getById(element.id));
    }
    await Promise.allSettled(promises).then((results) => results.forEach((result) => result.status === 'fulfilled' &&
        result.value &&
        products.push(result.value)));
    return products;
};
exports.cartProductsToProducts = cartProductsToProducts;
const validateEmail = (email) => {
    const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regex.test(email);
};
exports.validateEmail = validateEmail;
