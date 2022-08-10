"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testFunction = void 0;
const test_container_1 = require("./containers/test-container");
const test_daos_1 = require("./daos/test-daos");
const test_normalizr_1 = require("./test-normalizr");
const testFunction = async (name, callback) => {
    try {
        console.log(`> START test ${name} ------------------------------------<`);
        await callback();
        console.log('> END test\n');
    }
    catch (err) {
        console.error(err);
    }
};
exports.testFunction = testFunction;
(async () => {
    await (0, test_container_1.testContainers)();
    await (0, test_daos_1.testDaos)();
    await (0, test_normalizr_1.testNormalizr)();
    console.log('> FINISHED ALL TESTS');
})();
