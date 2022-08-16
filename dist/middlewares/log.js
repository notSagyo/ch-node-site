"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../utils/logger");
const log = (req, res, next) => {
    logger_1.logger.info(`${req.method} ${req.url}`);
    next();
};
exports.default = log;
