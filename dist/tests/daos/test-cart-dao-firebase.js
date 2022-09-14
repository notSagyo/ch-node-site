"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testCartDaoFirebase = void 0;
const uuid_1 = require("uuid");
const carts_dao_firebase_1 = __importDefault(require("../../modules/cart/carts-dao-firebase"));
const parsers_1 = require("../../utils/parsers");
const tests_1 = require("../tests");
const testCartDaoFirebase = async () => {
    await (0, tests_1.testFunction)('save()', async () => {
        await carts_dao_firebase_1.default.dao.save({ id: '0', products: [], timestamp: Date.now() });
        await carts_dao_firebase_1.default.dao.save({ id: '1', products: [], timestamp: Date.now() });
        await carts_dao_firebase_1.default.dao.save({ id: '2', products: [], timestamp: Date.now() });
    });
    await (0, tests_1.testFunction)('getAll()', async () => {
        const res = await carts_dao_firebase_1.default.dao.getAll();
        console.log(res);
    });
    await (0, tests_1.testFunction)('getById()', async () => {
        const res = await carts_dao_firebase_1.default.dao.getById('0d59a48a-31ed-4b0b-ad17-60a35d9cbafc');
        console.log(res);
    });
    await (0, tests_1.testFunction)('updateById()', async () => {
        const newCartProd = (0, parsers_1.parseCartProduct)({ id: (0, uuid_1.v4)(), quantity: 1 });
        if (!newCartProd)
            return;
        await carts_dao_firebase_1.default.dao.updateById('0d59a48a-31ed-4b0b-ad17-60a35d9cbafc', {
            products: [newCartProd],
        });
        const updated = await carts_dao_firebase_1.default.dao.getAll();
        console.log('After update id:"0" {id: v4(), quantity: 1}:', updated);
    });
    await (0, tests_1.testFunction)('addProductById()', async () => {
        await carts_dao_firebase_1.default.dao.addProductById('0d59a48a-31ed-4b0b-ad17-60a35d9cbafc', '6666666');
        const updated = await carts_dao_firebase_1.default.dao.getAll();
        console.log('After add product "id":6666666 :', updated);
    });
    await (0, tests_1.testFunction)('removeProductById()', async () => {
        await carts_dao_firebase_1.default.dao.removeProductById('0d59a48a-31ed-4b0b-ad17-60a35d9cbafc', '6666666');
        const updated = await carts_dao_firebase_1.default.dao.getAll();
        console.log('After remove product "id":6666666 :', updated);
    });
    await (0, tests_1.testFunction)('deleteById()', async () => {
        await carts_dao_firebase_1.default.dao.deleteById('0');
        const res = await carts_dao_firebase_1.default.dao.getAll();
        console.log('After delete id:"0":', res);
    });
    console.log('\nFinished testing cartDaoFirebase\n');
};
exports.testCartDaoFirebase = testCartDaoFirebase;
