"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ioServer = exports.httpServer = exports.app = exports.PORT = exports.mode = exports.args = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cluster_1 = __importDefault(require("cluster"));
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const minimist_1 = __importDefault(require("minimist"));
const os_1 = require("os");
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
const middlewares_1 = __importDefault(require("./middlewares/middlewares"));
const routes_1 = __importDefault(require("./routes/routes"));
const logger_1 = require("./utils/logger");
const paths_1 = require("./utils/paths");
exports.args = (0, minimist_1.default)(process.argv.slice(2));
exports.mode = exports.args.mode === 'cluster' ? 'CLUSTER' : 'FORK';
exports.PORT = exports.args.port || process.env.PORT || 8080;
exports.app = (0, express_1.default)();
exports.httpServer = new http_1.Server(exports.app);
exports.ioServer = new socket_io_1.Server(exports.httpServer);
(() => {
    if (cluster_1.default.isPrimary && exports.mode === 'CLUSTER') {
        for (let i = 0; i < (0, os_1.cpus)().length; i++)
            cluster_1.default.fork();
        cluster_1.default.on('exit', (worker, code) => {
            logger_1.logger.error(`Worker ${worker.id} died with code ${code}`);
            cluster_1.default.fork();
        });
        return;
    }
    exports.app.set('view engine', 'ejs');
    exports.app.set('views', path_1.default.join(paths_1.baseDirLocal, 'views'));
    (0, logger_1.initLogger)(path_1.default.join(process.cwd(), 'logs'));
    exports.app.use(middlewares_1.default);
    exports.app.use(routes_1.default);
    exports.httpServer.listen(exports.PORT, () => {
        const time = new Date().toLocaleTimeString();
        console.log(`[${time}]: Server on port ${exports.PORT} in ${exports.mode},` +
            ` ${process.env.NODE_ENV || 'default'} mode`);
    });
})();
