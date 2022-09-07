"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = exports.cartProductsToProducts = void 0;
const products_dao_mongo_1 = require("../daos/products-dao-mongo");
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
