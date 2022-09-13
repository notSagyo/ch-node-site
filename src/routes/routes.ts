import express from 'express';
import path from 'path';
import { ejsDefaultData } from '../config/ejs';
import CartRouter from '../modules/cart/cart-router';
import ProductsRouter from '../modules/product/products-router';
import UserRouter from '../modules/user/user-router';
import { logger } from '../utils/logger';
import { baseDirLocal } from '../utils/paths';
import CommunicationRouter from './communication-router';
import UtilsRouter from './utils-router';

// Routers
const router = express.Router();
router.use(express.static(path.join(baseDirLocal, 'public')));

const productsRouter = new ProductsRouter('pages/products.ejs');
const communicationRouter = new CommunicationRouter();
const cartRouter = new CartRouter('pages/cart.ejs');
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
router.use('/', communicationRouter.router);
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

router.get('/chat', async (req, res) => {
  res.render('pages/chat.ejs', ejsDefaultData);
});

router.use((req, res) => {
  logger.warn('404:', req.url);
  res.status(404).json({
    error: 404,
    desc: `Route ${req.url} method ${req.method} not implemented`,
  });
});

export default router;
