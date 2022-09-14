"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testProductDaoFirebase = void 0;
const products_dao_mongo_1 = __importDefault(require("../../modules/product/products-dao-mongo"));
const tests_1 = require("../tests");
const testProductDaoFirebase = async () => {
    await (0, tests_1.testFunction)('save()', async () => {
        await products_dao_mongo_1.default.dao.save({ id: '0', name: 'Test', price: 100 });
        await products_dao_mongo_1.default.dao.save({ id: '1', name: 'Test2', price: 100 });
        await products_dao_mongo_1.default.dao.save({ id: '2', name: 'Test3', price: 100 });
    });
    await (0, tests_1.testFunction)('getAll()', async () => {
        const res = await products_dao_mongo_1.default.dao.getAll();
        console.log(res);
    });
    await (0, tests_1.testFunction)('getById()', async () => {
        const res = await products_dao_mongo_1.default.dao.getById('0');
        console.log(res);
    });
    await (0, tests_1.testFunction)('updateById()', async () => {
        await products_dao_mongo_1.default.dao.updateById('0', { name: 'Test999' });
        const updated = await products_dao_mongo_1.default.dao.getAll();
        console.log('After update id:"0" name Test => Test999:', updated);
    });
    await (0, tests_1.testFunction)('deleteById()', async () => {
        await products_dao_mongo_1.default.dao.deleteById('0');
        const res = await products_dao_mongo_1.default.dao.getAll();
        console.log('After delete id:"0":', res);
    });
    await (0, tests_1.testFunction)('deleteAll()', async () => {
        await products_dao_mongo_1.default.dao.deleteAll();
        const res = await products_dao_mongo_1.default.dao.getAll();
        console.log('After delete:', res);
    });
    console.log('\nFinished testing productDaoFirebase\n');
};
exports.testProductDaoFirebase = testProductDaoFirebase;
