import * as express from 'express';
import * as path from 'path';
import ProductsRouter from './controllers/products-router';
import { productsDao } from './daos/products-dao-mongo';
import { messagesDao } from './daos/messages-dao-mongo';
import CartRouter from './controllers/cart-router';
import { Server as IOServer } from 'socket.io';
import { parseProduct } from './utils/parsers';
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
app.get('/', (req, res) => {
  res.render('pages/index.ejs');
});

app.get('/chat', async (req, res) => {
  res.render('pages/chat.ejs');
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

  // TODO: run the product parsing in the DAO
  socket.on('create_product', async (product) => {
    let parsedProduct = parseProduct(product);
    if (parsedProduct == null)
      return socket.emit('message_error', 'Invalid product');
    await productsDao.save(parsedProduct);
    ioServer.emit('products_updated', await productsDao.getAll());
  });

  ioServer.emit('messages_updated', await messagesDao.getAllNormalized());
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
