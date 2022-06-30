"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseProduct = exports.productsTable = void 0;
var container_knex_1 = require("../containers/container-knex");
var mariadb_1 = require("../settings/mariadb");
exports.productsTable = new container_knex_1.default(mariadb_1.options.connection.database, 'products', mariadb_1.options);
exports.productsTable.createTable(function (table) {
    table.increments('id').primary();
    table.string('name');
    table.integer('price');
    table.string('thumbnail');
    table.string('description');
});
var parseProduct = function (obj) {
    var placeholder = 'https://via.placeholder.com/256';
    var isValidName = typeof (obj === null || obj === void 0 ? void 0 : obj.name) === 'string' && obj.name.length > 0;
    var isValidPrice = !isNaN(Number(obj === null || obj === void 0 ? void 0 : obj.price)) && Number(obj === null || obj === void 0 ? void 0 : obj.price) > 0;
    var isValidThumbnail = typeof (obj === null || obj === void 0 ? void 0 : obj.thumbnail) === 'string' && (obj === null || obj === void 0 ? void 0 : obj.thumbnail.length) > 0;
    var isValidDescription = typeof (obj === null || obj === void 0 ? void 0 : obj.description) === 'string';
    var name = isValidName ? obj.name : null;
    var price = isValidPrice ? Number(obj.price) : null;
    var description = isValidDescription ? obj.description : undefined;
    var thumbnail = isValidThumbnail ? obj.thumbnail : placeholder;
    var id = typeof (obj === null || obj === void 0 ? void 0 : obj.id) === 'string' ? obj.id : '-1';
    if (name != null && price != null)
        return { id: id, name: name, price: price, thumbnail: thumbnail, description: description };
    return null;
};
exports.parseProduct = parseProduct;
