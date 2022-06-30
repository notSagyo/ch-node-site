"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCartProduct = void 0;
var uuid_1 = require("uuid");
var parseCartProduct = function (obj) {
    var isValidQuantity = typeof (obj === null || obj === void 0 ? void 0 : obj.quantity) === 'number' && obj.quantity > 0;
    var isValidTimestamp = typeof (obj === null || obj === void 0 ? void 0 : obj.timestamp) === 'number' && obj.timestamp > 0;
    var isValidCode = typeof (obj === null || obj === void 0 ? void 0 : obj.code) === 'string' && obj.code.length > 0;
    var isValidId = typeof (obj === null || obj === void 0 ? void 0 : obj.id) === 'string' && (0, uuid_1.validate)(obj.id);
    if (!isValidId)
        return null;
    var quantity = isValidQuantity ? obj.quantity : 1;
    var timestamp = isValidTimestamp ? obj.timestamp : Date.now();
    var code = isValidCode ? obj.code : '-1';
    var id = obj.id;
    return ({
        id: id,
        code: code,
        quantity: quantity,
        timestamp: timestamp
    });
};
exports.parseCartProduct = parseCartProduct;
