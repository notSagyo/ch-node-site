"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testCartDaoMongo = void 0;
const uuid_1 = require("uuid");
const carts_dao_mongo_1 = require("../../daos/carts-dao-mongo");
const parsers_1 = require("../../utils/parsers");
const tests_1 = require("../tests");
const testCartDaoMongo = async () => {
    await (0, tests_1.testFunction)('save()', async () => {
        await carts_dao_mongo_1.cartsDao.save({ id: '0', products: [], timestamp: Date.now() });
        await carts_dao_mongo_1.cartsDao.save({ id: '1', products: [], timestamp: Date.now() });
        await carts_dao_mongo_1.cartsDao.save({ id: '2', products: [], timestamp: Date.now() });
    });
    await (0, tests_1.testFunction)('getAll()', async () => {
        const res = await carts_dao_mongo_1.cartsDao.getAll();
        console.log(res);
    });
    await (0, tests_1.testFunction)('getById()', async () => {
        const res = await carts_dao_mongo_1.cartsDao.getById('0');
        console.log(res);
    });
    await (0, tests_1.testFunction)('updateById()', async () => {
        const newCartProd = (0, parsers_1.parseCartProduct)({ id: (0, uuid_1.v4)(), quantity: 1 });
        if (!newCartProd)
            return;
        await carts_dao_mongo_1.cartsDao.updateById('0', { products: [newCartProd] });
        const updated = await carts_dao_mongo_1.cartsDao.getAll();
        console.log('After update id:"0" {id: v4(), quantity: 1}:', updated);
    });
    await (0, tests_1.testFunction)('deleteById()', async () => {
        await carts_dao_mongo_1.cartsDao.deleteById('0');
        const res = await carts_dao_mongo_1.cartsDao.getAll();
        console.log('After delete id:"0":', res);
    });
    await (0, tests_1.testFunction)('deleteAll()', async () => {
        await carts_dao_mongo_1.cartsDao.deleteAll();
        const res = await carts_dao_mongo_1.cartsDao.getAll();
        console.log('After delete:', res);
    });
    console.log('\nFinished testing cartDaoMongo\n');
};
exports.testCartDaoMongo = testCartDaoMongo;
