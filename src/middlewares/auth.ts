import express from 'express';
import { logger } from '../utils/logger';

// Authentication
export const authn: express.RequestHandler = (req, res, next) => {
  if (req.user) next();
  const msg = 'Unauthorized; user is not authenticated';
  logger.error(msg);
  res.status(401).send(`401: ${msg}`);
};

// Authorization
// TODO: update to work with session
export const authz: express.RequestHandler = (req, res, next) => {
  if (req.session.isAdmin) next();
  else res.status(403).send('403: Forbidden, must be and admin');
};
