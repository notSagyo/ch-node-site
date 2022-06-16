"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var product_1 = require("../product/product");
var CartProduct = /** @class */ (function (_super) {
    __extends(CartProduct, _super);
    function CartProduct(name, price, quantity, timestamp, code, description, thumbnail, id) {
        var _this = _super.call(this, name, price, description, thumbnail, id) || this;
        Object.defineProperty(_this, "quantity", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "timestamp", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        _this.quantity = quantity || 1;
        _this.timestamp = timestamp || Date.now();
        _this.code = code || (0, uuid_1.v4)();
        return _this;
    }
    Object.defineProperty(CartProduct, "parseProduct", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (obj) {
            var parsedProd = product_1.default.parseProduct(obj);
            if (!parsedProd)
                return null;
            // TS assertion because not not all params have the same signature
            obj = obj;
            var isValidQuantity = typeof (obj === null || obj === void 0 ? void 0 : obj.quantity) === 'number' && obj.quantity > 0;
            var isValidTimestamp = typeof (obj === null || obj === void 0 ? void 0 : obj.timestamp) === 'number' && obj.timestamp > 0;
            var isValidCode = typeof (obj === null || obj === void 0 ? void 0 : obj.code) === 'string' && obj.code.length > 0;
            var quantity = isValidQuantity ? obj.quantity : undefined;
            var timestamp = isValidTimestamp ? obj.timestamp : undefined;
            var code = isValidCode ? obj.code : undefined;
            return new CartProduct(parsedProd.name, parsedProd.price, quantity, timestamp, code, parsedProd.description, parsedProd.thumbnail, parsedProd.id);
        }
    });
    return CartProduct;
}(product_1.default));
exports.default = CartProduct;
