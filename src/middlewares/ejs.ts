import express from 'express';
import fs from 'fs';
import path from 'path';
import { ejsDefaultData } from '../settings/ejs';
import { uploadsDir } from '../utils/utils';

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
  if (!ejsDefaultData.avatarUrl && req.user) {
    const uploads = fs.readdirSync(uploadsDir);
    const userId = req.user.id;
    const avatarFilename = uploads.find((f) => f.includes(userId));
    avatarFilename &&
      (ejsDefaultData.avatarUrl = path.join('/uploads', avatarFilename));
  }
  next();
};
