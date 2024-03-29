import express from 'express';
import path from 'path';
import { ejsDefaultData } from '../config/ejs';
import CartRouter from '../modules/cart/cart.router';
import ChatRouter from '../modules/chat/chat.router';
import ProductRouter from '../modules/product/product.router';
import UserRouter from '../modules/user/user.router';
import { logger } from '../utils/logger';
import { baseDirLocal } from '../utils/paths';
import NotificationRouter from '../modules/notification/notification.router';
import UtilsRouter from './utils.router';

// Routers
const router = express.Router();
router.use(express.static(path.join(baseDirLocal, 'public')));

const productsRouter = new ProductRouter('pages/products.ejs');
const cartRouter = new CartRouter('pages/cart.ejs');
const chatRouter = new ChatRouter('pages/chat.ejs');
const notificationRouter = new NotificationRouter();
const utilsRouter = new UtilsRouter();
const userRouter = new UserRouter(
  'pages/login.ejs',
  'pages/logout.ejs',
  'pages/signup.ejs',
  'pages/error.ejs'
);

// Routes
router.use('/', userRouter.router);
router.use('/', utilsRouter.router);
router.use('/', notificationRouter.router);
router.use('/chat', chatRouter.router);
router.use('/carrito', cartRouter.router);
router.use('/productos', productsRouter.router);
router.use('/api', utilsRouter.apiRouter);
router.use('/api', productsRouter.testRouter);
router.use('/api/carrito', cartRouter.apiRouter);
router.use('/api/productos', productsRouter.apiRouter);

router.get('/', (req, res) => {
  logger.info('Req. user:', req.user);
  res.render('pages/index.ejs', ejsDefaultData);
});

router.use((req, res) => {
  logger.warn('404:', req.url);
  res.status(404).json({
    error: 404,
    desc: `Route ${req.url} method ${req.method} not implemented`,
  });
});

export default router;
