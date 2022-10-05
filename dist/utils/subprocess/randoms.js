"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandoms = void 0;
var getRandoms = function (iterations) {
    var randoms = [];
    for (var i = 0; i < iterations; i++) {
        var rand = Math.floor(Math.random() * 1000) + 1;
        randoms[rand] = randoms[rand] + 1 || 1;
    }
    var randomObject = new Object();
    for (var key in randoms) {
        randomObject[key] = randoms[key];
    }
    return randomObject;
};
exports.getRandoms = getRandoms;
process.on('message', function (iterations) {
    process.send && process.send((0, exports.getRandoms)(iterations));
});
//# sourceMappingURL=randoms.js.map