"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var placeholder = 'https://via.placeholder.com/256';
var Product = /** @class */ (function () {
    function Product(name, price, thumbnail, id) {
        // Manual ID will be ignored when saving in the container
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "price", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "thumbnail", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = name;
        this.price = price;
        this.thumbnail = thumbnail || placeholder;
        this.id = id || 0;
    }
    Object.defineProperty(Product, "parseProduct", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (obj) {
            var isValidPrice = !isNaN(Number(obj === null || obj === void 0 ? void 0 : obj.price)) && Number(obj === null || obj === void 0 ? void 0 : obj.price) > 0;
            var name = typeof (obj === null || obj === void 0 ? void 0 : obj.name) === 'string' && (obj === null || obj === void 0 ? void 0 : obj.name) ? obj.name : null;
            var price = isValidPrice ? Number(obj.price) : null;
            var thumbnail = typeof (obj === null || obj === void 0 ? void 0 : obj.thumbnail) === 'string' && (obj === null || obj === void 0 ? void 0 : obj.thumbnail.length) > 0 ? obj.thumbnail : placeholder;
            var id = typeof (obj === null || obj === void 0 ? void 0 : obj.id) === 'number' ? obj.id : 0;
            if (name != null && price != null)
                return new Product(name, price, thumbnail, id);
            return null;
        }
    });
    return Product;
}());
exports.Product = Product;
