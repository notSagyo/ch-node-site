"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testDaos = void 0;
const test_cart_dao_firebase_1 = require("./test-cart-dao-firebase");
const test_cart_dao_mongo_1 = require("./test-cart-dao-mongo");
const test_product_dao_mongo_1 = require("./test-product-dao-mongo");
const test_product_dao_firebase_1 = require("./test-product-dao-firebase");
const testDaos = async () => {
    console.log('\n> testProductDaoMongo ==============================================<');
    await (0, test_product_dao_firebase_1.testProductDaoMongo)();
    console.log('\n> testProductDaoFirebase ==============================================<');
    await (0, test_product_dao_mongo_1.testProductDaoFirebase)();
    console.log('\n> testCartDaoMongo ==============================================<');
    await (0, test_cart_dao_mongo_1.testCartDaoMongo)();
    console.log('\n> testCartDaoFirebase ==============================================<');
    await (0, test_cart_dao_firebase_1.testCartDaoFirebase)();
};
exports.testDaos = testDaos;
