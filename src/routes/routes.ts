import express from 'express';
import path from 'path';
import { ejsDefaultData } from '../settings/ejs';
import { logger } from '../utils/logger';
import { baseDir } from '../utils/utils';
import CartRouter from './cart-router';
import ProductsRouter from './products-router';
import UserRouter from './user-router';
import UtilsRouter from './utils-router';

// Routers
const router = express.Router();
const productsRouter = new ProductsRouter('pages/products.ejs');
const utilsRouter = new UtilsRouter();
const cartRouter = new CartRouter('pages/cart.ejs');
const userRouter = new UserRouter(
  'pages/login.ejs',
  'pages/logout.ejs',
  'pages/signup.ejs',
  'pages/error.ejs'
);

// Routes
router.use('/', userRouter.router);
router.use('/', utilsRouter.router);
router.use('/api', utilsRouter.apiRouter);
router.use('/carrito', cartRouter.router);
router.use('/productos', productsRouter.router);
router.use('/api', productsRouter.testRouter);
router.use('/api/carrito', cartRouter.apiRouter);
router.use('/api/productos', productsRouter.apiRouter);
router.use(express.static(path.join(baseDir, 'public')));

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
