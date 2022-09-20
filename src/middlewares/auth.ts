import express from 'express';
import { logger } from '../utils/logger';

// Authentication
export const authn: express.RequestHandler = (req, res, next) => {
  if (req.user) return next();
  const msg = '[401]: Unauthorized; user is not authenticated';
  logger.warn(msg);
  res.status(401).send(msg);
};

// Authorization
export const authz: express.RequestHandler = (req, res, next) => {
  if (req.user?.isAdmin === true) return next();
  const msg = '[403]: Forbidden, must be admin';
  logger.warn(msg);
  res.status(403).send(msg);
};
