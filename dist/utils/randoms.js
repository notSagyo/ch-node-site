"use strict";
process.on('message', (iterations) => {
    const randoms = [];
    for (let i = 0; i < iterations; i++) {
        const rand = Math.floor(Math.random() * 1000) + 1;
        randoms[rand] = randoms[rand] + 1 || 1;
    }
    const randomObject = new Object();
    for (const key in randoms) {
        randomObject[key] = randoms[key];
    }
    process.send && process.send(randomObject);
});
