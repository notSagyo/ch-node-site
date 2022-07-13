"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqliteOptions = void 0;
var path = require("path");
exports.sqliteOptions = {
    client: 'sqlite3',
    connection: {
        filename: path.join(__dirname, '../../db/ecommerce.sqlite3'),
    },
    useNullAsDefault: true
};
