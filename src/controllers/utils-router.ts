import path from 'path';
import express from 'express';
import { fork } from 'child_process';
import { logger } from '../utils/logger';
import { getRandoms } from '../utils/subprocess/randoms';

export default class UtilsRouter {
  router = express.Router();
  apiRouter = express.Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.getInfo();
    this.getRandoms();
  }

  private getInfo() {
    this.router.get('/info', (req, res) => {
      const forked = fork(
        path.join(
          __dirname,
          '../utils/subprocess/processInfo' + path.extname(__filename)
        )
      );

      forked.send('');
      forked.on('message', (info) => {
        res.header('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(info, null, 2));
      });
    });
  }

  private getRandoms() {
    this.apiRouter.get('/randoms', (req, res) => {
      logger.info('Getting randoms...');
      const iterations = Number(req.query.cant) || 100_000_000;
      const result = getRandoms(iterations);

      res.header('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(result, null, 2));
      logger.info('Randoms sent!');
    });
  }
}
