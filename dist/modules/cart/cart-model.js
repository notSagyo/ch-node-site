"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const collection = 'carts';
const cartSchema = new mongoose_1.default.Schema({
    id: { type: String, required: true, unique: true },
    timestamp: { type: Number, required: true },
    products: { type: [{
                id: { type: String, required: true },
                code: { type: String, required: true },
                quantity: { type: Number, required: true },
                timestamp: { type: Number, required: true },
            }], required: true },
});
exports.cartModel = mongoose_1.default.model(collection, cartSchema);
