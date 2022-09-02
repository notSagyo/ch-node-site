"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const ejs_1 = require("../settings/ejs");
const logger_1 = require("../utils/logger");
const utils_1 = require("../utils/utils");
const cart_router_1 = __importDefault(require("./cart-router"));
const communication_router_1 = __importDefault(require("./communication-router"));
const products_router_1 = __importDefault(require("./products-router"));
const user_router_1 = __importDefault(require("./user-router"));
const utils_router_1 = __importDefault(require("./utils-router"));
const router = express_1.default.Router();
router.use(express_1.default.static(path_1.default.join(utils_1.baseDir, 'public')));
const productsRouter = new products_router_1.default('pages/products.ejs');
const communicationRouter = new communication_router_1.default();
const cartRouter = new cart_router_1.default('pages/cart.ejs');
const utilsRouter = new utils_router_1.default();
const userRouter = new user_router_1.default('pages/login.ejs', 'pages/logout.ejs', 'pages/signup.ejs', 'pages/error.ejs');
router.use('/', userRouter.router);
router.use('/', utilsRouter.router);
router.use('/', communicationRouter.router);
router.use('/carrito', cartRouter.router);
router.use('/productos', productsRouter.router);
router.use('/api', utilsRouter.apiRouter);
router.use('/api', productsRouter.testRouter);
router.use('/api/carrito', cartRouter.apiRouter);
router.use('/api/productos', productsRouter.apiRouter);
router.get('/', (req, res) => {
    logger_1.logger.info('Req. user:', req.user);
    res.render('pages/index.ejs', ejs_1.ejsDefaultData);
});
router.get('/chat', async (req, res) => {
    res.render('pages/chat.ejs', ejs_1.ejsDefaultData);
});
router.use((req, res) => {
    logger_1.logger.warn('404:', req.url);
    res.status(404).json({
        error: 404,
        desc: `Route ${req.url} method ${req.method} not implemented`,
    });
});
exports.default = router;
