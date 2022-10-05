"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authz = exports.authn = void 0;
var logger_1 = require("../utils/logger");
var authn = function (req, res, next) {
    if (req.user)
        return next();
    var msg = '[401]: Unauthorized; user is not authenticated';
    logger_1.logger.warn(msg);
    res.status(401).send(msg);
};
exports.authn = authn;
var authz = function (req, res, next) {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.isAdmin) === true)
        return next();
    var msg = '[403]: Forbidden, must be admin';
    logger_1.logger.warn(msg);
    res.status(403).send(msg);
};
exports.authz = authz;
//# sourceMappingURL=auth.js.map