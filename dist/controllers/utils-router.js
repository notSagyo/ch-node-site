"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const express_1 = __importDefault(require("express"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
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
            const argvs = process.argv.slice(2);
            const platform = os_1.default.platform();
            const nodeVer = process.versions.node;
            const projectFolder = process.cwd();
            const execPath = process.argv[1];
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
    getRandoms() {
        this.apiRouter.get('/randoms', (req, res) => {
            console.log('Getting randoms...');
            const iterations = Number(req.query.cant) || 100_000_000;
            const forked = (0, child_process_1.fork)(path_1.default.join(__dirname, '../utils/randoms' + path_1.default.extname(__filename)));
            let result = {};
            forked.send(iterations);
            forked.on('message', (msg) => {
                result = msg;
                res.header('Content-Type', 'application/json');
                let resultString = JSON.stringify(result, null, 2);
                resultString = process.argv.slice(2) + ' ' + resultString;
                res.status(200).send(resultString);
                console.log('Randoms sent!');
            });
        });
    }
}
exports.default = UtilsRouter;
