"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testContainerMongo = void 0;
const uuid_1 = require("uuid");
const container_mongo_1 = __importDefault(require("../../containers/container-mongo"));
const product_model_1 = require("../../modules/product/product-model");
const tests_1 = require("../tests");
const testContainerMongo = async () => {
    const container = new container_mongo_1.default(product_model_1.productsModel);
    await (0, tests_1.testFunction)('connect()', async () => {
        await container.connect();
    });
    await (0, tests_1.testFunction)('close()', async () => {
        await container.disconnect();
    });
    await (0, tests_1.testFunction)('insert()', async () => {
        await container.insert({ id: (0, uuid_1.v4)(), name: 'Test', price: 100 });
        await container.insert({ id: (0, uuid_1.v4)(), name: 'Test2', price: 100 });
        await container.insert({ id: (0, uuid_1.v4)(), name: 'Test3', price: 100 });
    });
    await (0, tests_1.testFunction)('find() ALL', async () => {
        const res = await container.find({});
        console.log(res);
    });
    await (0, tests_1.testFunction)('find() {name: "Test"}', async () => {
        const res = await container.find({ name: 'Test' });
        console.log(res);
    });
    await (0, tests_1.testFunction)('find() NON-EXISTENT', async () => {
        const res = await container.find({ name: 'papaya' });
        console.log(res);
    });
    await (0, tests_1.testFunction)('update()', async () => {
        await container.update({ name: 'Test' }, { name: 'Test999' });
        const updated = await container.find({});
        console.log('After update name Test => Test999:', updated);
    });
    await (0, tests_1.testFunction)('delete()', async () => {
        await container.delete({ name: 'Test999' });
        const res = await container.find({});
        console.log('After delete Test999:', res);
    });
    await (0, tests_1.testFunction)('delete() ALL', async () => {
        await container.delete({});
        const res = await container.find({});
        console.log('After delete ALL', res);
    });
    console.log('\nFinished testing containerMongo\n');
};
exports.testContainerMongo = testContainerMongo;
