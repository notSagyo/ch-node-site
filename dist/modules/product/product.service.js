"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importStar(require("./product"));
const product_dao_1 = __importDefault(require("./product.dao"));
class ProductService {
    async createProduct(productDto) {
        const prod = product_1.default.fromDto(productDto);
        const success = await product_dao_1.default.dao.save(prod);
        if (!success)
            throw new Error('Product service: error saving productDto');
        return prod;
    }
    async getAllProducts() {
        return await product_dao_1.default.dao.getAll();
    }
    async getProductById(id) {
        return await product_dao_1.default.dao.getById(id);
    }
    async deleteProductById(cartId) {
        return await product_dao_1.default.dao.deleteById(cartId);
    }
    async deleteAllProducts() {
        return await product_dao_1.default.dao.deleteAll();
    }
    async updateProductById(productId, data) {
        let success = false;
        const exists = (await this.getProductById(productId)) != null;
        if (exists)
            success = await product_dao_1.default.dao.updateById(productId, data);
        else {
            const parsedProd = (0, product_1.parseProduct)(data);
            if (parsedProd)
                success = await product_dao_1.default.dao.save(product_1.default.fromDto(parsedProd));
        }
        return success;
    }
}
const productService = new ProductService();
exports.default = productService;
