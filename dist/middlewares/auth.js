"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authz = exports.authn = void 0;
const logger_1 = require("../utils/logger");
const authn = (req, res, next) => {
    if (req.user)
        return next();
    const msg = '[401]: Unauthorized; user is not authenticated';
    logger_1.logger.warn(msg);
    res.status(401).send(msg);
};
exports.authn = authn;
const authz = (req, res, next) => {
    if (req.user?.isAdmin === true)
        return next();
    const msg = '[403]: Forbidden, must be admin';
    logger_1.logger.warn(msg);
    res.status(403).send(msg);
};
exports.authz = authz;
