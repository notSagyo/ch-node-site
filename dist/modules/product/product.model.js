"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const collection = 'products';
const productSchema = new mongoose_1.default.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: false },
    description: { type: String, required: false },
});
exports.productsModel = mongoose_1.default.model(collection, productSchema);
