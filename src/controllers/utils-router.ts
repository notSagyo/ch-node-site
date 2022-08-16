import { fork } from 'child_process';
import express from 'express';
import os from 'os';
import path from 'path';
import { logger } from '../utils/logger';

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
      const argvs = process.argv.slice(2);
      const platform = os.platform();
      const nodeVer = process.versions.node;
      const projectFolder = process.cwd();
      const execPath = process.argv[1];
      // (resident set size) memory occupied in RAM by the process
      const rss = `${process.memoryUsage().rss / 1024 ** 2} MB`;
      const pid = process.pid;

      const info = {
        argvs,
        osPlatform: platform,
        nodeVer,
        rss,
        projectFolder,
        execPath,
        pid,
      };

      res.header('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(info, null, 2));
    });
  }

  private getRandoms() {
    this.apiRouter.get('/randoms', (req, res) => {
      logger.info('Getting randoms...');
      const iterations = Number(req.query.cant) || 100_000_000;

      const forked = fork(
        path.join(__dirname, '../utils/randoms' + path.extname(__filename))
      );

      let result = {};
      forked.send(iterations);

      forked.on('message', (msg) => {
        result = msg;
        res.header('Content-Type', 'application/json');
        let resultString = JSON.stringify(result, null, 2);
        resultString = process.argv.slice(2) + ' ' + resultString;
        res.status(200).send(resultString);
        logger.info('Randoms sent!');
      });
    });
  }
}
