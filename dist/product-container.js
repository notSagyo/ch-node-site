"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("./container");
const product_1 = require("./product");
class ProductContainer extends container_1.Container {
    constructor(filePath) {
        super(filePath);
    }
    async save(prod) {
        try {
            const newProd = product_1.Product.parseProduct(prod);
            if (!newProd)
                throw new Error('Error parsing product, malformed body');
            return await super.save(newProd);
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }
}
exports.default = ProductContainer;
