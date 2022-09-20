import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import express from 'express';
import expressSession from 'express-session';
import path from 'path';
import { mongooseOptions } from '../config/mongoose';
import { baseDirLocal } from '../utils/paths';
import log from './log';
import passport from './passport';
import { resetAge } from './cookies';
import { updateEjsDefaultData } from './ejs';

const middlewares = [
  express.json(),
  express.urlencoded({ extended: true }),
  express.static(path.join(baseDirLocal, 'public')),
  expressSession({
    store: MongoStore.create({ mongoUrl: mongooseOptions.uri }),
    cookie: { maxAge: 10 * 60 * 1000 },
    secret: 'TheCookieNeverRests',
    resave: false,
    saveUninitialized: false,
  }),
  cookieParser('TheCookieNeverRests'),
  passport.initialize(),
  passport.session(),
  resetAge,
  updateEjsDefaultData,
  log,
];

export default middlewares;
