"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatSocket = exports.productSocket = void 0;
const app_1 = require("../app");
const chat_service_1 = __importDefault(require("../modules/chat/chat.service"));
const product_service_1 = __importDefault(require("../modules/product/product.service"));
const logger_1 = require("../utils/logger");
let listeningProuctSocket = false;
const productSocket = (req, res, next) => {
    if (listeningProuctSocket)
        return next();
    listeningProuctSocket = true;
    app_1.ioServer.on('connection', async (socket) => {
        logger_1.logger.info('productSocket: ', req.user);
        logger_1.logger.info('New client connected:', socket.id);
        app_1.ioServer.emit('products_updated', await product_service_1.default.getAllProducts());
        socket.on('create_product', async (product) => {
            await product_service_1.default.createProduct(product);
            app_1.ioServer.emit('products_updated', await product_service_1.default.getAllProducts());
        });
    });
    next();
};
exports.productSocket = productSocket;
let listeningChatSocket = false;
const chatSocket = (req, res, next) => {
    if (listeningChatSocket)
        return next();
    listeningChatSocket = true;
    app_1.ioServer.on('connection', async (socket) => {
        logger_1.logger.info('New client connected:', socket.id);
        app_1.ioServer.emit('messages_updated', await chat_service_1.default.getAllMessages());
        socket.on('create_message', async (message) => {
            const success = await chat_service_1.default.createMessage(message);
            if (!success)
                return socket.emit('message_error', 'Invalid message');
            app_1.ioServer.emit('messages_updated', await chat_service_1.default.getAllMessages());
        });
    });
    next();
};
exports.chatSocket = chatSocket;
