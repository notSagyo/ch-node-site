"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseProduct = void 0;
const uuid_1 = require("uuid");
const logger_1 = require("../../utils/logger");
class Product {
    id;
    name;
    price;
    thumbnail;
    description;
    constructor(id, name, price, thumbnail, description) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.thumbnail = thumbnail;
        this.description = description;
    }
    static fromDto(dto) {
        const parsedProd = (0, exports.parseProduct)(dto);
        if (parsedProd == null)
            throw new Error('Product: error parsing product');
        return new Product(parsedProd.id, parsedProd.name, parsedProd.price, parsedProd.thumbnail, parsedProd.description);
    }
    toDto() {
        const { id, description, name, price, thumbnail } = this;
        return { id, description, name, price, thumbnail };
    }
}
exports.default = Product;
const parseProduct = (prod) => {
    const isValidName = typeof prod?.name === 'string' && prod.name.length > 0;
    const isValidId = typeof prod?.id === 'string' && (0, uuid_1.validate)(prod.id);
    const isValidDescription = typeof prod?.description === 'string';
    const isValidPrice = prod?.price && !isNaN(Number(prod?.price)) && Number(prod?.price) > 0;
    const isValidThumbnail = typeof prod?.thumbnail === 'string' && prod?.thumbnail.length > 0;
    const id = isValidId ? prod.id : (0, uuid_1.v4)();
    const name = isValidName ? prod.name : null;
    const price = isValidPrice ? Number(prod.price) : null;
    const thumbnail = isValidThumbnail ? prod.thumbnail : '';
    const description = isValidDescription ? prod.description : '';
    if (name == null)
        logger_1.logger.error('Invalid product name:', prod?.name);
    if (price == null)
        logger_1.logger.error('Invalid product price:', prod?.price);
    if (name != null && price != null)
        return { id, name, price, thumbnail, description };
    return null;
};
exports.parseProduct = parseProduct;
