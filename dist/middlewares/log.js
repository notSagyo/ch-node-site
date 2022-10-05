"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("../utils/logger");
var log = function (req, res, next) {
    logger_1.logger.info("".concat(req.method, " ").concat(req.url));
    next();
};
exports.default = log;
//# sourceMappingURL=log.js.map