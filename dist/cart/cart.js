"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: Delete this class
var Cart = /** @class */ (function () {
    function Cart(products, timestamp, id) {
        // Manual ID input will be ignored when saved in the container
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "timestamp", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "products", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.products = products || [];
        this.timestamp = timestamp || Date.now();
        this.id = id || '0';
    }
    Object.defineProperty(Cart.prototype, "addProduct", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (product) {
            Cart.addProduct(this, product);
        }
    });
    Object.defineProperty(Cart.prototype, "deleteProduct", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (productId) {
            Cart.deleteProduct(this, productId);
        }
    });
    // Static Methods ==========================================================//
    Object.defineProperty(Cart, "addProduct", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (cart, product) {
            var lastId = cart.products.length > 0 ? cart.products[cart.products.length - 1].id : '0';
            var newId = (Number(lastId) + 1).toString();
            cart.products.push(__assign(__assign({}, product), { id: newId }));
            return newId;
        }
    });
    Object.defineProperty(Cart, "deleteProduct", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (cart, productId) {
            var index = cart.products.findIndex(function (prod) { return prod.id == productId; });
            if (index === -1)
                return;
            cart.products.splice(index, 1);
            return productId;
        }
    });
    return Cart;
}());
exports.default = Cart;
