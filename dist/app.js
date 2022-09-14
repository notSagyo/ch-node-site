"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const os_1 = require("os");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cluster_1 = __importDefault(require("cluster"));
const express_1 = __importDefault(require("express"));
const minimist_1 = __importDefault(require("minimist"));
const path_1 = __importDefault(require("path"));
const paths_1 = require("./utils/paths");
const logger_1 = require("./utils/logger");
const messages_dao_mongo_1 = __importDefault(require("./modules/chat/messages-dao-mongo"));
const middlewares_1 = __importDefault(require("./middlewares/middlewares"));
const products_dao_mongo_1 = __importDefault(require("./modules/product/products-dao-mongo"));
const routes_1 = __importDefault(require("./routes/routes"));
const args = (0, minimist_1.default)(process.argv.slice(2));
const mode = args.mode === 'cluster' ? 'CLUSTER' : 'FORK';
exports.PORT = args.port || process.env.PORT || 8080;
(() => {
    if (cluster_1.default.isPrimary && mode === 'CLUSTER') {
        for (let i = 0; i < (0, os_1.cpus)().length; i++)
            cluster_1.default.fork();
        cluster_1.default.on('exit', (worker, code) => {
            logger_1.logger.error(`Worker ${worker.id} died with code ${code}`);
            cluster_1.default.fork();
        });
        return;
    }
    const app = (0, express_1.default)();
    const httpServer = new http_1.Server(app);
    const ioServer = new socket_io_1.Server(httpServer);
    app.set('view engine', 'ejs');
    app.set('views', path_1.default.join(paths_1.baseDirLocal, 'views'));
    (0, logger_1.initLogger)(path_1.default.join(process.cwd(), 'logs'));
    app.use(middlewares_1.default);
    app.use(routes_1.default);
    ioServer.on('connection', async (socket) => {
        logger_1.logger.info('New client connected:', socket.id);
        ioServer.emit('products_updated', await products_dao_mongo_1.default.dao.getAll());
        ioServer.emit('messages_updated', await messages_dao_mongo_1.default.dao.getAllNormalized());
        socket.on('create_product', async (product) => {
            await products_dao_mongo_1.default.dao.save(product);
            ioServer.emit('products_updated', await products_dao_mongo_1.default.dao.getAll());
        });
        socket.on('create_message', async (message) => {
            const success = await messages_dao_mongo_1.default.dao.save(message);
            if (!success)
                return socket.emit('message_error', 'Invalid message');
            ioServer.emit('messages_updated', await messages_dao_mongo_1.default.dao.getAllNormalized());
        });
    });
    httpServer.listen(exports.PORT, () => {
        const time = new Date().toLocaleTimeString();
        console.log(`[${time}]: Server on port ${exports.PORT} in ${mode},` +
            ` ${process.env.NODE_ENV || 'default'} mode`);
    });
})();
