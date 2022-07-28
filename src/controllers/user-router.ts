import express from 'express';
import multer from 'multer';
import { ejsDefaultData } from '../settings/ejs';
import { iRouter } from '../types/types';
import passport from 'passport';

export default class UserRouter implements iRouter {
  loginHtmlPath: string;
  logoutHtmlPath: string;
  signupHtmlPath: string;
  errorHtmlPath: string;

  router = express.Router();

  constructor(loginHtmlPath: string, logoutHtmlPath: string, signupHtmlPath: string, errorHtmlPath: string) {
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

      req.logout((err) =>  {
        console.log(err);
        success = false;
      });

      if (!success) {
        return res.render(this.errorHtmlPath, {
          ejsDefaultData,
          errorTitle: 'Logout error',
          errorDescription: 'Logout failed'
        });
      }

      ejsDefaultData.user = null;
      res.render(this.logoutHtmlPath, { user: destroyedUser });
    });
  }

  private postLogin() {
    const upload = multer();
    this.router.post(
      '/login',
      upload.none(),
      passport.authenticate('authn', {
        failureRedirect: '/error'
          + '?errorTitle=Login error'
          + '&errorDescription=Invalid credentials: email/password combination'
          + ' do not match an existing user'
      }),
      (req, res) => res.redirect('/')
    );
  }

  private postSignup() {
    const upload = multer();
    this.router.post(
      '/signup',
      upload.none(),
      passport.authenticate('registration', {
        failureRedirect: '/error'
        + '?errorTitle=Registration error'
        + '&errorDescription=User with the same email/username already exists'
      }),
      (req, res) => res.redirect('/')
    );
  }

  private postLogout() {
    this.router.post('/logout', (req, res) => res.redirect('/logout'));
  }

  private getError() {
    this.router.get('/error', (req, res) => {
      const errorTitle = req.query.errorTitle || 'Error';
      const errorDescription = req.query.errorDescription || 'Unknown error';

      res.render(this.errorHtmlPath, {
        ejsDefaultData,
        errorTitle: errorTitle,
        errorDescription: errorDescription
      });
    });
  }
}
