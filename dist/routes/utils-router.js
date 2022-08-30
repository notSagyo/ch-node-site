"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const child_process_1 = require("child_process");
const logger_1 = require("../utils/logger");
const randoms_1 = require("../utils/subprocess/randoms");
class UtilsRouter {
    router = express_1.default.Router();
    apiRouter = express_1.default.Router();
    constructor() {
        this.initRoutes();
    }
    initRoutes() {
        this.getInfo();
        this.getRandoms();
    }
    getInfo() {
        this.router.get('/info', (req, res) => {
            const forked = (0, child_process_1.fork)(path_1.default.join(__dirname, '../utils/subprocess/processInfo' + path_1.default.extname(__filename)));
            forked.send('');
            forked.on('message', (info) => {
                res.header('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(info, null, 2));
            });
        });
    }
    getRandoms() {
        this.apiRouter.get('/randoms', (req, res) => {
            logger_1.logger.info('Getting randoms...');
            const iterations = Number(req.query.cant) || 100_000_000;
            const result = (0, randoms_1.getRandoms)(iterations);
            res.header('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(result, null, 2));
            logger_1.logger.info('Randoms sent!');
        });
    }
}
exports.default = UtilsRouter;
