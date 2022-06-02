"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const products_router_1 = require("./products-router");
const product_container_1 = require("./product-container");
const message_1 = require("./message");
const container_1 = require("./container");
// INIT ======================================================================//
// Constants
const PORT = 8080;
const app = express();
const httpServer = new http_1.Server(app);
const ioServer = new socket_io_1.Server(httpServer);
const messageContainer = new container_1.Container('./data/messages.json');
const productContainer = new product_container_1.default('./data/products.json');
const productsRouter = new products_router_1.default(productContainer, 'pages/products.ejs');
const baseDir = path.join(__dirname, '..');
// Config
app.set('view engine', 'ejs');
app.set('views', path.join(baseDir, 'views'));
// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/productos', productsRouter.router);
app.use(express.static(path.join(baseDir, 'public')));
// Routes
app.get('/', (req, res) => {
    res.render('pages/index.ejs');
});
app.get('/chat', async (req, res) => {
    const msgList = await messageContainer.getAll();
    const msgListHTML = message_1.Message.getHtmlList(msgList);
    res.render('pages/chat.ejs', { messageListHTML: msgListHTML });
});
// Websockets
ioServer.on('connection', async (socket) => {
    console.log('New client connected');
    socket.on('create_product', async (product) => {
        await productContainer.save(product);
        const newProductList = await productContainer.getAll();
        ioServer.emit('product_created', newProductList);
    });
    socket.on('create_message', async (message) => {
        console.log(message);
        const parsedMessage = message_1.Message.parseMessage(message);
        if (!parsedMessage) {
            console.log('Error parsing message');
            return;
        }
        await messageContainer.save(parsedMessage);
        const newMessageList = await messageContainer.getAll();
        ioServer.emit('message_created', newMessageList);
    });
});
// Listen ====================================================================//
httpServer.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}/`);
});
