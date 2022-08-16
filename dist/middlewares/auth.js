"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authz = exports.authn = void 0;
const logger_1 = require("../utils/logger");
const authn = (req, res, next) => {
    if (req.user)
        next();
    const msg = 'Unauthorized; user is not authenticated';
    logger_1.logger.error(msg);
    res.status(401).send(`401: ${msg}`);
};
exports.authn = authn;
const authz = (req, res, next) => {
    if (req.session.isAdmin)
        next();
    else
        res.status(403).send('403: Forbidden, must be and admin');
};
exports.authz = authz;
