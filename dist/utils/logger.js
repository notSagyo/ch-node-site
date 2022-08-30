"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testLogger = exports.logger = exports.initLogger = void 0;
const log4js_1 = __importDefault(require("log4js"));
const path_1 = __importDefault(require("path"));
let logger = log4js_1.default.getLogger();
exports.logger = logger;
const initLogger = (outPath) => {
    log4js_1.default.configure({
        appenders: {
            console: { type: 'console' },
            fileDebug: { type: 'file', filename: path_1.default.join(outPath, 'debug.log') },
            fileError: { type: 'file', filename: path_1.default.join(outPath, 'error.log') },
            fileWarn: { type: 'file', filename: path_1.default.join(outPath, 'warn.log') },
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
            development: { appenders: ['console'], level: 'info' },
            production: { appenders: ['loggerError', 'loggerWarn'], level: 'debug' },
            default: {
                appenders: ['console', 'loggerWarn', 'loggerError'],
                level: 'info',
            },
        },
    });
    const loggerType = process.env.NODE_ENV === 'production' ? 'production' : 'development';
    exports.logger = logger = log4js_1.default.getLogger(loggerType);
};
exports.initLogger = initLogger;
const testLogger = () => {
    logger.log('Testing log');
    logger.debug('Testing debug');
    logger.info('Testing info');
    logger.warn('Testing warn');
    logger.error('Testing error');
    logger.fatal('Testing fatal');
};
exports.testLogger = testLogger;
