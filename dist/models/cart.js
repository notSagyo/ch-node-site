"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartModel = void 0;
var mongoose = require("mongoose");
var collection = 'carts';
var cartSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    timestamp: { type: Number, required: true },
    products: { type: [{
                id: { type: String, required: true },
                code: { type: String, required: true },
                quantity: { type: Number, required: true },
                timestamp: { type: Number, required: true },
            }], required: true },
});
exports.cartModel = mongoose.model(collection, cartSchema);
