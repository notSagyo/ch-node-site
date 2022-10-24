"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gqlMiddleware = void 0;
const express_graphql_1 = require("express-graphql");
const utils_1 = require("../../utils/utils");
const cart_service_1 = __importDefault(require("./cart.service"));
const getCartById = async (args) => await cart_service_1.default.getCartById(args.id);
const getAllCarts = async () => (await cart_service_1.default.getAllCarts()) || [];
const addCart = async (product) => await cart_service_1.default.createCart(product);
const addProductById = async ({ cartId, productId, }) => cart_service_1.default.addProductById(cartId, productId);
const editCart = async ({ args }) => {
    const { id, ...cart } = args;
    return await cart_service_1.default.updateCartById(id, cart);
};
const schema = (0, utils_1.importGqlSchema)('cart.gql');
exports.gqlMiddleware = (0, express_graphql_1.graphqlHTTP)({
    schema,
    rootValue: { getCartById, getAllCarts, addCart, editCart, addProductById },
    graphiql: true,
});
