import * as express from 'express';
import * as path from 'path';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import ProductsRouter from './products-router';
import ProductContainer from './product-container';
import { Message } from './message';
import MessageContainer from './message-container';

// INIT ======================================================================//
// Constants
const PORT = 8080;

const app = express();
const httpServer = new HttpServer(app);
const ioServer = new IOServer(httpServer);

const messageContainer = new MessageContainer('./data/messages.json');
const productContainer = new ProductContainer('./data/products.json');
const productsRouter = new ProductsRouter(productContainer, 'pages/products.ejs');
const baseDir = path.join(__dirname, '..');

// Config
app.set('view engine', 'ejs');
app.set('views', path.join(baseDir, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/productos', productsRouter.router);
app.use('/api/productos', productsRouter.apiRouter);
app.use(express.static(path.join(baseDir, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('pages/index.ejs');
});

app.get('/chat', async (req, res) => {
  const msgList = await messageContainer.getAll();
  const msgListHTML = Message.getHtmlList(msgList as Message[]);
  res.render('pages/chat.ejs', { messageListHTML: msgListHTML });
});

// Websockets
ioServer.on('connection', async (socket) => {
  console.log('New client connected:', socket.id);

  const updateProducts = async () => {
    const newProductList = await productContainer.getAll();
    ioServer.emit('products_updated', newProductList);
  };

  const updateMessages = async () => {
    const newMessageList = await messageContainer.getAll();
    ioServer.emit('messages_updated', newMessageList);
  };

  socket.on('create_product', async (product) => {
    await productContainer.save(product);
    updateProducts();
  });

  socket.on('create_message', async (message) => {
    await messageContainer.save(message);
    updateMessages();
  });
});

// Listen ====================================================================//
httpServer.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}/`);
});
