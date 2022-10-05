import Log4js from 'log4js';
import path from 'path';
import { logsDirLocal } from './paths';

let logger = Log4js.getLogger();

const initLogger = (outDir: string = logsDirLocal) => {
  Log4js.configure({
    appenders: {
      console: { type: 'console' },
      fileDebug: { type: 'file', filename: path.join(outDir, 'debug.log') },
      fileError: { type: 'file', filename: path.join(outDir, 'error.log') },
      fileWarn: { type: 'file', filename: path.join(outDir, 'warn.log') },

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

  const loggerType =
    process.env.NODE_ENV === 'production' ? 'production' : 'development';
  logger = Log4js.getLogger(loggerType);
};

const testLogger = () => {
  logger.log('Testing log');
  logger.debug('Testing debug');
  logger.info('Testing info');
  logger.warn('Testing warn');
  logger.error('Testing error');
  logger.fatal('Testing fatal');
};

export { initLogger, logger, testLogger };
