"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const placeholder = 'https://via.placeholder.com/256';
class Product {
    // Manual ID will be ignored when saving in the container
    id;
    name;
    price;
    thumbnail;
    constructor(name, price, thumbnail, id) {
        this.name = name;
        this.price = price;
        this.thumbnail = thumbnail || placeholder;
        this.id = id || 0;
    }
    static parseProduct(obj) {
        const isValidPrice = !isNaN(Number(obj?.price)) && Number(obj?.price) > 0;
        const name = typeof obj?.name === 'string' && obj?.name ? obj.name : null;
        const price = isValidPrice ? Number(obj.price) : null;
        const thumbnail = typeof obj?.thumbnail === 'string' && obj?.thumbnail.length > 0 ? obj.thumbnail : placeholder;
        const id = typeof obj?.id === 'number' ? obj.id : 0;
        if (name != null && price != null)
            return new Product(name, price, thumbnail, id);
        return null;
    }
}
exports.Product = Product;
