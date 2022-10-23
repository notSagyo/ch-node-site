"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gqlMiddleware = void 0;
const express_graphql_1 = require("express-graphql");
const utils_1 = require("../../utils/utils");
const product_service_1 = __importDefault(require("./product.service"));
const getProductById = async (args) => await product_service_1.default.getProductById(args.id);
const getAllProducts = async () => (await product_service_1.default.getAllProducts()) || [];
const addProduct = async (product) => await product_service_1.default.createProduct(product);
const editProduct = async ({ args }) => {
    const { id, ...prod } = args;
    return await product_service_1.default.updateProductById(id, prod);
};
const schema = (0, utils_1.importGqlSchema)('product.gql');
exports.gqlMiddleware = (0, express_graphql_1.graphqlHTTP)({
    schema,
    rootValue: { getProductById, getAllProducts, addProduct, editProduct },
    graphiql: true,
});
