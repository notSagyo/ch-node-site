"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testLogger = exports.logger = exports.initLogger = void 0;
var log4js_1 = __importDefault(require("log4js"));
var path_1 = __importDefault(require("path"));
var paths_1 = require("./paths");
var logger = log4js_1.default.getLogger();
exports.logger = logger;
var initLogger = function (outDir) {
    if (outDir === void 0) { outDir = paths_1.logsDirLocal; }
    log4js_1.default.configure({
        appenders: {
            console: { type: 'console' },
            fileDebug: { type: 'file', filename: path_1.default.join(outDir, 'debug.log') },
            fileError: { type: 'file', filename: path_1.default.join(outDir, 'error.log') },
            fileWarn: { type: 'file', filename: path_1.default.join(outDir, 'warn.log') },
            loggerWarn: {
                type: 'logLevelFilter',
                appender: 'fileWarn',
                level: 'debug',
            },
            loggerError: {
                type: 'logLevelFilter',
                appender: 'fileError',
                level: 'error',
            },
        },
        categories: {
            development: { appenders: ['console'], level: 'trace' },
            production: { appenders: ['loggerError', 'loggerWarn'], level: 'warn' },
            default: {
                appenders: ['console', 'loggerWarn', 'loggerError'],
                level: 'info',
            },
        },
    });
    var loggerType = process.env.NODE_ENV === 'production' ? 'production' : 'development';
    exports.logger = logger = log4js_1.default.getLogger(loggerType);
};
exports.initLogger = initLogger;
var testLogger = function () {
    logger.log('Testing log');
    logger.debug('Testing debug');
    logger.info('Testing info');
    logger.warn('Testing warn');
    logger.error('Testing error');
    logger.fatal('Testing fatal');
};
exports.testLogger = testLogger;
//# sourceMappingURL=logger.js.map