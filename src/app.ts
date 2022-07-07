import * as express from 'express';
import * as path from 'path';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import ProductsRouter from './product/products-router';
import { parseProduct } from './product/product';
import Messages from './chat/message';
import CartRouter from './cart/cart-router';
import { productsDao } from './daos/productsDaoMongo';
import { messagesDao } from './daos/messagesDaoMongo';
import { iMessage } from './types';

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
  const msgList = await messagesDao.getAll();
  const msgListHTML = Messages.getHtmlList(msgList);
  res.render('pages/chat.ejs', { messageListHTML: msgListHTML });
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

  const updateProducts = async () => {
    const newProductList = await productsDao.getAll();
    ioServer.emit('products_updated', newProductList);
  };

  const updateMessages = async () => {
    const newMessageList = await messagesDao.getAll();
    ioServer.emit('messages_updated', newMessageList);
  };

  socket.on('create_product', async (product) => {
    let parsedProduct = parseProduct(product);
    // TODO: Check if product is valid
    if (!parsedProduct)
      return socket.emit('message_error', 'Invalid product');

    await productsDao.save(parsedProduct);
    updateProducts();
  });

  socket.on('create_message', async (message) => {
    const success = await messagesDao.save(message);
    if (!success)
      return socket.emit('message_error', 'Invalid message');
    updateMessages();
  });
});

// Listen ====================================================================//
httpServer.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}/`);
});
