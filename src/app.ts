// Initialize dotenv for any import that requires it
import dotenv from 'dotenv';
dotenv.config();

import { cpus } from 'os';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import cluster from 'cluster';
import express from 'express';
import minimist from 'minimist';
import path from 'path';
import { baseDirLocal } from './utils/paths';
import { initLogger, logger } from './utils/logger';
import MessagesDao from './modules/chat/messages-dao';
import middlewares from './middlewares/middlewares';
import ProductsDao from './modules/product/products-dao';
import router from './routes/routes';

// INIT ======================================================================//
// Get args
const args = minimist(process.argv.slice(2));
const mode = args.mode === 'cluster' ? 'CLUSTER' : 'FORK';
export const PORT = args.port || process.env.PORT || 8080;

(() => {
  // Check for cluster mode
  if (cluster.isPrimary && mode === 'CLUSTER') {
    for (let i = 0; i < cpus().length; i++) cluster.fork();
    cluster.on('exit', (worker, code) => {
      logger.error(`Worker ${worker.id} died with code ${code}`);
      cluster.fork();
    });
    return;
  }

  // Constants
  const app = express();
  const httpServer = new HttpServer(app);
  const ioServer = new IOServer(httpServer);

  // Config
  app.set('view engine', 'ejs');
  app.set('views', path.join(baseDirLocal, 'views'));
  initLogger(path.join(process.cwd(), 'logs'));

  // Middlewares & Routes
  app.use(middlewares);
  app.use(router);

  // Websockets ==============================================================//
  ioServer.on('connection', async (socket) => {
    logger.info('New client connected:', socket.id);

    ioServer.emit('products_updated', await ProductsDao.dao.getAll());
    ioServer.emit('messages_updated', await MessagesDao.dao.getAllNormalized());

    socket.on('create_product', async (product) => {
      await ProductsDao.dao.save(product);
      ioServer.emit('products_updated', await ProductsDao.dao.getAll());
    });

    socket.on('create_message', async (message) => {
      const success = await MessagesDao.dao.save(message);
      if (!success) return socket.emit('message_error', 'Invalid message');
      ioServer.emit(
        'messages_updated',
        await MessagesDao.dao.getAllNormalized()
      );
    });
  });

  // Listen ==================================================================//
  httpServer.listen(PORT, () => {
    const time = new Date().toLocaleTimeString();
    console.log(
      `[${time}]: Server on port ${PORT} in ${mode},` +
        ` ${process.env.NODE_ENV || 'default'} mode`
    );
  });
})();
