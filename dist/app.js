"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const products_router_1 = __importDefault(require("./controllers/products-router"));
const utils_router_1 = __importDefault(require("./controllers/utils-router"));
const user_router_1 = __importDefault(require("./controllers/user-router"));
const cart_router_1 = __importDefault(require("./controllers/cart-router"));
const passport_1 = __importDefault(require("./middlewares/passport"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const express_session_1 = __importDefault(require("express-session"));
const log_1 = __importDefault(require("./middlewares/log"));
const minimist_1 = __importDefault(require("minimist"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const middlewares_1 = require("./middlewares/middlewares");
const products_dao_mongo_1 = require("./daos/products-dao-mongo");
const messages_dao_mongo_1 = require("./daos/messages-dao-mongo");
const ejs_1 = require("./settings/ejs");
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const logger_1 = require("./utils/logger");
const mongoose_1 = require("./settings/mongoose");
const app = (0, express_1.default)();
const httpServer = new http_1.Server(app);
const ioServer = new socket_io_1.Server(httpServer);
const baseDir = path_1.default.join(__dirname, '..');
const args = (0, minimist_1.default)(process.argv.slice(2));
const mode = args.mode === 'cluster' ? 'CLUSTER' : 'FORK';
exports.PORT = args.port || 8080;
const productsRouter = new products_router_1.default('pages/products.ejs');
const utilsRouter = new utils_router_1.default();
const cartRouter = new cart_router_1.default('pages/cart.ejs');
const userRouter = new user_router_1.default('pages/login.ejs', 'pages/logout.ejs', 'pages/signup.ejs', 'pages/error.ejs');
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(baseDir, 'views'));
(0, logger_1.initLogger)(path_1.default.join(process.cwd(), 'logs'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)('TheCookieNeverRests'));
app.use((0, express_session_1.default)({
    store: connect_mongo_1.default.create({ mongoUrl: mongoose_1.mongooseOptions.uri }),
    cookie: { maxAge: 10 * 60 * 1000 },
    secret: 'TheCookieNeverRests',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(middlewares_1.resetAge);
app.use(middlewares_1.updateEjsDefaultData);
app.use(log_1.default);
app.use('/', userRouter.router);
app.use('/', utilsRouter.router);
app.use('/api', utilsRouter.apiRouter);
app.use('/carrito', cartRouter.router);
app.use('/productos', productsRouter.router);
app.use('/api', productsRouter.testRouter);
app.use('/api/carrito', cartRouter.apiRouter);
app.use('/api/productos', productsRouter.apiRouter);
app.use(express_1.default.static(path_1.default.join(baseDir, 'public')));
app.get('/', (req, res) => {
    logger_1.logger.info('Req. user:', req.user);
    res.render('pages/index.ejs', ejs_1.ejsDefaultData);
});
app.get('/chat', async (req, res) => {
    res.render('pages/chat.ejs', ejs_1.ejsDefaultData);
});
app.use((req, res) => {
    res.status(404).json({
        error: 404,
        desc: `Route ${req.url} method ${req.method} not implemented`,
    });
});
ioServer.on('connection', async (socket) => {
    logger_1.logger.info('New client connected:', socket.id);
    ioServer.emit('products_updated', await products_dao_mongo_1.productsDao.getAll());
    ioServer.emit('messages_updated', await messages_dao_mongo_1.messagesDao.getAllNormalized());
    socket.on('create_product', async (product) => {
        await products_dao_mongo_1.productsDao.save(product);
        ioServer.emit('products_updated', await products_dao_mongo_1.productsDao.getAll());
    });
    socket.on('create_message', async (message) => {
        const success = await messages_dao_mongo_1.messagesDao.save(message);
        if (!success)
            return socket.emit('message_error', 'Invalid message');
        ioServer.emit('messages_updated', await messages_dao_mongo_1.messagesDao.getAllNormalized());
    });
});
httpServer.listen(exports.PORT, () => {
    const time = new Date().toLocaleTimeString();
    console.log(`[${time}]: Server on port ${exports.PORT} in ${mode}, ${process.env.NODE_ENV} mode`);
});
