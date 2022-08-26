import express from 'express';
import { ejsDefaultData } from '../settings/ejs';

/**
 * Ensures data passed to EJS is synced with session data.
 *
 * Access previous data with "res.locals.oldEjsDefaultData"
 */
export const updateEjsDefaultData: express.RequestHandler = (
  req,
  res,
  next
) => {
  res.locals.oldEjsDefaultData = ejsDefaultData;
  ejsDefaultData.user = req.user;
  next();
};
