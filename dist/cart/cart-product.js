"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCartProduct = void 0;
var product_1 = require("../product/product");
var parseCartProduct = function (obj) {
    var parsedProd = (0, product_1.parseProduct)(obj);
    if (!parsedProd)
        return null;
    var isValidQuantity = typeof (obj === null || obj === void 0 ? void 0 : obj.quantity) === 'number' && obj.quantity > 0;
    var isValidTimestamp = typeof (obj === null || obj === void 0 ? void 0 : obj.timestamp) === 'number' && obj.timestamp > 0;
    var isValidCode = typeof (obj === null || obj === void 0 ? void 0 : obj.code) === 'string' && obj.code.length > 0;
    var quantity = isValidQuantity ? obj.quantity : 1;
    var timestamp = isValidTimestamp ? obj.timestamp : Date.now();
    var code = isValidCode ? obj.code : '-1';
    return ({
        id: parsedProd.id,
        name: parsedProd.name,
        price: parsedProd.price,
        thumbnail: parsedProd.thumbnail,
        description: parsedProd.description,
        code: code,
        quantity: quantity,
        timestamp: timestamp
    });
};
exports.parseCartProduct = parseCartProduct;
