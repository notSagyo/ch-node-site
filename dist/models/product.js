"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsModel = void 0;
var mongoose = require("mongoose");
var collection = 'products';
var productSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: false },
    description: { type: String, required: false },
});
exports.productsModel = mongoose.model(collection, productSchema);
