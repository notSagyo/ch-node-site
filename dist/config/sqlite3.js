"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqliteOptions = void 0;
var path_1 = __importDefault(require("path"));
exports.sqliteOptions = {
    client: 'sqlite3',
    connection: {
        filename: path_1.default.join(__dirname, '../../db/ecommerce.sqlite3'),
    },
    useNullAsDefault: true,
};
//# sourceMappingURL=sqlite3.js.map