"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testContainerFirebase = void 0;
const firestore_1 = require("@firebase/firestore");
const uuid_1 = require("uuid");
const container_firebase_1 = __importDefault(require("../../containers/container-firebase"));
const tests_1 = require("../tests");
const testContainerFirebase = async () => {
    const container = new container_firebase_1.default('products');
    await (0, tests_1.testFunction)('insert()', async () => {
        await container.insert({ id: (0, uuid_1.v4)(), name: 'Test', price: 100 });
        await container.insert({ id: (0, uuid_1.v4)(), name: 'Test2', price: 100 });
        await container.insert({ id: (0, uuid_1.v4)(), name: 'Test3', price: 100 });
    });
    await (0, tests_1.testFunction)('find() ALL', async () => {
        const res = await container.find('*');
        console.log(res);
    });
    await (0, tests_1.testFunction)('find() {name: Test}', async () => {
        const res = await container.find((0, firestore_1.where)('name', '==', 'Test'));
        console.log(res);
    });
    await (0, tests_1.testFunction)('find() NON-EXISTENT', async () => {
        const res = await container.find((0, firestore_1.where)('name', '==', 'guayaba'));
        console.log(res);
    });
    await (0, tests_1.testFunction)('update()', async () => {
        await container.update((0, firestore_1.where)('name', '==', 'Test'), { name: 'Updated!' });
        const updated = await container.find('*');
        console.log('After update name Test => Updated!:', updated);
    });
    await (0, tests_1.testFunction)('delete()', async () => {
        await container.delete((0, firestore_1.where)('name', '==', 'Updated!'));
        const res = await container.find('*');
        console.log('After delete {name: "Updated!"}:', res);
    });
    await (0, tests_1.testFunction)('delete() ALL', async () => {
        await container.delete('*');
        const res = await container.find('*');
        console.log('After delete ALL', res);
    });
    console.log('\nFinished testing containerFirebase\n');
};
exports.testContainerFirebase = testContainerFirebase;
