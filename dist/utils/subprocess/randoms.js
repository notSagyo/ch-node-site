"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandoms = void 0;
const getRandoms = (iterations) => {
    const randoms = [];
    for (let i = 0; i < iterations; i++) {
        const rand = Math.floor(Math.random() * 1000) + 1;
        randoms[rand] = randoms[rand] + 1 || 1;
    }
    const randomObject = new Object();
    for (const key in randoms) {
        randomObject[key] = randoms[key];
    }
    return randomObject;
};
exports.getRandoms = getRandoms;
process.on('message', (iterations) => {
    process.send && process.send((0, exports.getRandoms)(iterations));
});
