import ProductsRouter from './controllers/products-router';
import UserRouter from './controllers/user-router';
import CartRouter from './controllers/cart-router';
import passport from './middlewares/passport';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import express from 'express';
import path from 'path';
import { updateEjsDefaultData, resetAge } from './middlewares/middlewares';
import { productsDao } from './daos/products-dao-mongo';
import { messagesDao } from './daos/messages-dao-mongo';
import { ejsDefaultData } from './settings/ejs';
import { Server as IOServer } from 'socket.io';
import { Server as HttpServer } from 'http';

// INIT ======================================================================//
// Constants
const PORT = 8080;
const app = express();
const httpServer = new HttpServer(app);
const ioServer = new IOServer(httpServer);
const baseDir = path.join(__dirname, '..');

const productsRouter = new ProductsRouter('pages/products.ejs');
const cartRouter = new CartRouter('pages/cart.ejs');
const userRouter = new UserRouter(
  'pages/login.ejs',
  'pages/logout.ejs',
  'pages/signup.ejs',
  'pages/error.ejs'
);

// Config
app.set('view engine', 'ejs');
app.set('views', path.join(baseDir, 'views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('TheCookieNeverRests'));
app.use(session({
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://sagyo:sagyo@cluster0.3dem9pw.mongodb.net/?retryWrites=true&w=majority'
  }),
  cookie: { maxAge: 10 * 60 * 1000 },
  secret: 'TheCookieNeverRests',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(resetAge);
app.use(updateEjsDefaultData);

// Routers
app.use('/', userRouter.router);
app.use('/carrito', cartRouter.router);
app.use('/productos', productsRouter.router);
app.use('/api', productsRouter.testRouter);
app.use('/api/carrito', cartRouter.apiRouter);
app.use('/api/productos', productsRouter.apiRouter);
app.use(express.static(path.join(baseDir, 'public')));

// Routes
app.get('/', (req, res) => {
  console.log('Req. user:', req.user);
  res.render('pages/index.ejs', ejsDefaultData);
});

app.get('/chat', async (req, res) => {
  res.render('pages/chat.ejs', ejsDefaultData);
});

app.use((req, res) => {
  res.status(404).json({
    error: 404,
    desc: `Route ${req.url} method ${req.method} not implemented`
  });
});

// Websockets
ioServer.on('connection', async (socket) => {
  console.log('New client connected:', socket.id);

  ioServer.emit('products_updated', await productsDao.getAll());
  ioServer.emit('messages_updated', await messagesDao.getAllNormalized());

  socket.on('create_product', async (product) => {
    await productsDao.save(product);
    ioServer.emit('products_updated', await productsDao.getAll());
  });

  socket.on('create_message', async (message) => {
    const success = await messagesDao.save(message);
    if (!success) return socket.emit('message_error', 'Invalid message');
    ioServer.emit('messages_updated', await messagesDao.getAllNormalized());
  });
});

// Listen ====================================================================//
httpServer.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}/`);
});
