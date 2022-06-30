"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsModel = void 0;
var mongoose = require("mongoose");
var collection = 'products';
var productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    thumbnail: String,
    description: String,
});
exports.productsModel = mongoose.model(collection, productSchema);
