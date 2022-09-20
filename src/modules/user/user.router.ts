import express from 'express';
import fs from 'fs/promises';
import imageType from 'image-type';
import multer from 'multer';
import passport from 'passport';
import path from 'path';
import { ejsDefaultData } from '../../config/ejs';
import { IRouter } from '../../types/types';
import { logger } from '../../utils/logger';
import { uploadsDirLocal } from '../../utils/paths';

export default class UserRouter implements IRouter {
  loginHtmlPath: string;
  logoutHtmlPath: string;
  signupHtmlPath: string;
  errorHtmlPath: string;

  router = express.Router();

  constructor(
    loginHtmlPath: string,
    logoutHtmlPath: string,
    signupHtmlPath: string,
    errorHtmlPath: string
  ) {
    this.logoutHtmlPath = logoutHtmlPath;
    this.loginHtmlPath = loginHtmlPath;
    this.signupHtmlPath = signupHtmlPath;
    this.errorHtmlPath = errorHtmlPath;
    this.initRoutes();
  }

  initRoutes() {
    this.getLogin();
    this.getSignup();
    this.getLogout();
    this.postLogin();
    this.postSignup();
    this.postLogout();
    this.getError();
  }

  private getLogin() {
    this.router.get('/login', (req, res) => {
      res.render(this.loginHtmlPath, ejsDefaultData);
    });
  }

  private getSignup() {
    this.router.get('/signup', (req, res) => {
      res.render(this.signupHtmlPath, ejsDefaultData);
    });
  }

  private getLogout() {
    this.router.get('/logout', (req, res) => {
      const destroyedUser = res.locals.oldEjsDefaultData.user;
      let success = true;

      req.logout((err) => {
        logger.log(err);
        success = false;
      });

      if (!success) {
        return res.render(this.errorHtmlPath, {
          ejsDefaultData,
          errorTitle: 'Logout error',
          errorDescription: 'Logout failed',
        });
      }

      ejsDefaultData.reset();
      res.render(this.logoutHtmlPath, { user: destroyedUser });
    });
  }

  private postLogin() {
    const upload = multer();
    this.router.post(
      '/login',
      upload.none(),
      passport.authenticate('login', {
        failureRedirect:
          '/error' +
          '?errorTitle=Login error' +
          '&errorDescription=Invalid credentials: email/password combination' +
          ' do not match an existing user',
      }),
      (req, res) => res.redirect(303, '/')
    );
  }

  private postSignup() {
    const upload = multer();
    this.router.post(
      '/signup',
      upload.single('avatar'),
      passport.authenticate('registration', {
        failureRedirect:
          '/error' +
          '?errorTitle=Registration error' +
          '&errorDescription=User with the same email/username/phone already exists',
      }),
      (req, res) => {
        if (!req.user) return;

        // If file is provided and is an image, upload it
        if (req.file) {
          const imgExtension = imageType(req.file.buffer)?.ext;
          imgExtension &&
            fs.writeFile(
              path.join(uploadsDirLocal, `${req.user?.id}.${imgExtension}`),
              req.file.buffer
            );
        }

        res.redirect('/signup-messages');
      }
    );
  }

  private postLogout() {
    this.router.post('/logout', (req, res) => res.redirect('/logout'));
  }

  private getError() {
    this.router.get('/error', (req, res) => {
      const errorTitle = req.query.errorTitle || 'Error';
      const errorDescription = req.query.errorDescription || 'Unknown error';

      logger.error(`${errorTitle} - ${errorDescription}`);
      res.status(401).render(this.errorHtmlPath, {
        ejsDefaultData,
        errorTitle: errorTitle,
        errorDescription: errorDescription,
      });
    });
  }
}
