"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsTable = void 0;
var container_knex_1 = require("../container-knex");
var mariadb_1 = require("../settings/mariadb");
exports.productsTable = new container_knex_1.default(mariadb_1.options.connection.database, 'messages', mariadb_1.options);
exports.productsTable.createTable(function (table) {
    table.increments('id').primary();
    table.string('name');
    table.integer('price');
    table.string('thumbnail');
    table.string('description');
});
var placeholder = 'https://via.placeholder.com/256';
var Product = /** @class */ (function () {
    function Product(name, price, description, thumbnail, id) {
        // Manual ID input will be ignored when saved in the container
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
        Object.defineProperty(this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = name;
        this.price = price;
        this.description = description || '';
        this.thumbnail = thumbnail || placeholder;
        this.id = id || 0;
    }
    Object.defineProperty(Product, "parseProduct", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (obj) {
            var isValidName = typeof (obj === null || obj === void 0 ? void 0 : obj.name) === 'string' && obj.name.length > 0;
            var isValidPrice = !isNaN(Number(obj === null || obj === void 0 ? void 0 : obj.price)) && Number(obj === null || obj === void 0 ? void 0 : obj.price) > 0;
            var isValidThumbnail = typeof (obj === null || obj === void 0 ? void 0 : obj.thumbnail) === 'string' && (obj === null || obj === void 0 ? void 0 : obj.thumbnail.length) > 0;
            var isValidDescription = typeof (obj === null || obj === void 0 ? void 0 : obj.description) === 'string';
            var name = isValidName ? obj.name : null;
            var price = isValidPrice ? Number(obj.price) : null;
            var description = isValidDescription ? obj.description : undefined;
            var thumbnail = isValidThumbnail ? obj.thumbnail : undefined;
            var id = typeof (obj === null || obj === void 0 ? void 0 : obj.id) === 'number' ? obj.id : undefined;
            if (name != null && price != null)
                return new Product(name, price, description, thumbnail, id);
            return null;
        }
    });
    return Product;
}());
exports.default = Product;
