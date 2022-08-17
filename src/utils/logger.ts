import Log4js from 'log4js';
import path from 'path';

let logger = Log4js.getLogger();

const initLogger = (outPath: string) => {
  Log4js.configure({
    appenders: {
      console: { type: 'console' },
      fileDebug: { type: 'file', filename: path.join(outPath, 'debug.log') },
      fileError: { type: 'file', filename: path.join(outPath, 'error.log') },
      fileWarn: { type: 'file', filename: path.join(outPath, 'warn.log') },

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
      dev: { appenders: ['console'], level: 'info' },
      prod: { appenders: ['loggerError', 'loggerWarn'], level: 'debug' },

      default: {
        appenders: ['console', 'loggerWarn', 'loggerError'],
        level: 'info',
      },
    },
  });

  const loggerType = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
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
