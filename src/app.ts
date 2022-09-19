// Initialize dotenv for any import that requires it
import dotenv from 'dotenv';
dotenv.config();

import cluster from 'cluster';
import express from 'express';
import { Server as HttpServer } from 'http';
import minimist from 'minimist';
import { cpus } from 'os';
import path from 'path';
import { Server as IOServer } from 'socket.io';
import middlewares from './middlewares/middlewares';
import router from './routes/routes';
import { initLogger, logger } from './utils/logger';
import { baseDirLocal } from './utils/paths';

// INIT ======================================================================//
// Get args
export const args = minimist(process.argv.slice(2));
export const mode = args.mode === 'cluster' ? 'CLUSTER' : 'FORK';
export const PORT = args.port || process.env.PORT || 8080;

// Constants
export const app = express();
export const httpServer = new HttpServer(app);
export const ioServer = new IOServer(httpServer);

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

  // Config
  app.set('view engine', 'ejs');
  app.set('views', path.join(baseDirLocal, 'views'));
  initLogger(path.join(process.cwd(), 'logs'));

  // Middlewares & Routes
  app.use(middlewares);
  app.use(router);

  // Websockets ==============================================================//

  // Listen ==================================================================//
  httpServer.listen(PORT, () => {
    const time = new Date().toLocaleTimeString();
    console.log(
      `[${time}]: Server on port ${PORT} in ${mode},` +
        ` ${process.env.NODE_ENV || 'default'} mode`
    );
  });
})();
