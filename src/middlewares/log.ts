import express from 'express';
import { logger } from '../utils/logger';

const log: express.RequestHandler = (req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};

export default log;
