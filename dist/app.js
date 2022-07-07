"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var products_router_1 = require("./product/products-router");
var product_1 = require("./product/product");
var message_1 = require("./chat/message");
var cart_router_1 = require("./cart/cart-router");
var productsDaoMongo_1 = require("./daos/productsDaoMongo");
// INIT ======================================================================//
// Constants
var PORT = 8080;
var app = express();
var httpServer = new http_1.Server(app);
var ioServer = new socket_io_1.Server(httpServer);
var baseDir = path.join(__dirname, '..');
var productsRouter = new products_router_1.default('pages/products.ejs');
var cartRouter = new cart_router_1.default('pages/cart.ejs');
// Config
app.set('view engine', 'ejs');
app.set('views', path.join(baseDir, 'views'));
// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Routers
app.use('/productos', productsRouter.router);
app.use('/carrito', cartRouter.router);
app.use('/api/carrito', cartRouter.apiRouter);
app.use('/api/productos', productsRouter.apiRouter);
app.use('/api', productsRouter.testRouter);
app.use(express.static(path.join(baseDir, 'public')));
// Routes
app.get('/', function (req, res) {
    res.render('pages/index.ejs');
});
app.get('/chat', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var msgList, msgListHTML;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, message_1.messagesTable.find({})];
            case 1:
                msgList = _a.sent();
                msgListHTML = message_1.default.getHtmlList(msgList);
                res.render('pages/chat.ejs', { messageListHTML: msgListHTML });
                return [2 /*return*/];
        }
    });
}); });
app.use(function (req, res) {
    res.status(404).json({
        error: 404,
        desc: "Route ".concat(req.url, " method ").concat(req.method, " not implemented")
    });
});
// Websockets
ioServer.on('connection', function (socket) { return __awaiter(void 0, void 0, void 0, function () {
    var updateProducts, updateMessages;
    return __generator(this, function (_a) {
        console.log('New client connected:', socket.id);
        updateProducts = function () { return __awaiter(void 0, void 0, void 0, function () {
            var newProductList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productsDaoMongo_1.productsDao.getAll()];
                    case 1:
                        newProductList = _a.sent();
                        ioServer.emit('products_updated', newProductList);
                        return [2 /*return*/];
                }
            });
        }); };
        updateMessages = function () { return __awaiter(void 0, void 0, void 0, function () {
            var newMessageList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, message_1.messagesTable.find({})];
                    case 1:
                        newMessageList = _a.sent();
                        ioServer.emit('messages_updated', newMessageList);
                        return [2 /*return*/];
                }
            });
        }); };
        socket.on('create_product', function (product) { return __awaiter(void 0, void 0, void 0, function () {
            var parsedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parsedProduct = (0, product_1.parseProduct)(product);
                        // TODO: Check if product is valid
                        if (!parsedProduct)
                            return [2 /*return*/, socket.emit('message_error', 'Invalid product')];
                        return [4 /*yield*/, productsDaoMongo_1.productsDao.save(parsedProduct)];
                    case 1:
                        _a.sent();
                        updateProducts();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on('create_message', function (message) { return __awaiter(void 0, void 0, void 0, function () {
            var parsedMessage, id, msgNoID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parsedMessage = message_1.default.parseMessage(message);
                        // TODO: Check if message is valid
                        if (!parsedMessage)
                            return [2 /*return*/, socket.emit('message_error', 'Invalid message')];
                        id = parsedMessage.id, msgNoID = __rest(parsedMessage, ["id"]);
                        return [4 /*yield*/, message_1.messagesTable.insert(msgNoID)];
                    case 1:
                        _a.sent();
                        updateMessages();
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
// Listen ====================================================================//
httpServer.listen(PORT, function () {
    console.log("Server started at http://localhost:".concat(PORT, "/"));
});
