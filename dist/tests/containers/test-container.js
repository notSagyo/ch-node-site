"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testContainers = void 0;
const test_container_firebase_1 = require("./test-container-firebase");
const test_container_mongo_1 = require("./test-container-mongo");
const testContainers = async () => {
    console.log('\n> testContainerMongo ==============================================<');
    await (0, test_container_mongo_1.testContainerMongo)();
    console.log('\n> testContainerFirebase ==============================================<');
    await (0, test_container_firebase_1.testContainerFirebase)();
};
exports.testContainers = testContainers;
