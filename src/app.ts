// Initialize dotenv for any import that requires it
import dotenv from 'dotenv';
dotenv.config();

import router from './routes/routes';
import minimist from 'minimist';
import cluster from 'cluster';
import express from 'express';
import path from 'path';
import middlewares from './middlewares/middlewares';
import { productsDao } from './daos/products-dao-mongo';
import { messagesDao } from './daos/messages-dao-mongo';
import { initLogger, logger } from './utils/logger';
import { Server as IOServer } from 'socket.io';
import { Server as HttpServer } from 'http';
import { baseDirLocal } from './utils/paths';
import { cpus } from 'os';

// INIT ====================================================================//
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

  // Listen ==================================================================//
  httpServer.listen(PORT, () => {
    const time = new Date().toLocaleTimeString();
    console.log(
      `[${time}]: Server on port ${PORT} in ${mode},` +
        ` ${process.env.NODE_ENV || 'default'} mode`
    );
  });
})();
