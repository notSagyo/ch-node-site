import express from 'express';
import os from 'os';

export default class UtilsRouter {
  router = express.Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.info();
  }

  private info() {
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
}
