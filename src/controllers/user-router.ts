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
    this.getLogout();
    this.getSignup();
    this.postLogin();
    this.postLogout();
    this.postSignup();
  }

  private getLogin() {
    this.router.get('/login', (req, res) => {
      res.render(this.loginHtmlPath, ejsDefaultData);
    });
  }

  private getLogout() {
    this.router.get('/logout', (req, res) => {
      const destroyedUser = res.locals.oldEjsDefaultData.user;

      req.session.destroy((err) => {
        if (err)
          console.error(err);
        else {
          console.log('Session: destroyed');
          ejsDefaultData.user = null;
        }
      });
      res.render(this.logoutHtmlPath, { user: destroyedUser });
    });
  }

  private getSignup() {
    this.router.get('/signup', (req, res) => {
      res.render(this.signupHtmlPath, ejsDefaultData);
    });
  }

  private postLogin() {
    const upload = multer();
    this.router.post('/login', upload.none(), passport.authenticate('authn'), async (req, res) => {
      res.redirect('/');
    });
  }

  private postLogout() {
    this.router.post('/logout', (req, res) => res.redirect('/logout'));
  }

  private postSignup() {
    const upload = multer();
    this.router.post('/signup', upload.none(), passport.authenticate('registration'), (req, res) => {
      res.redirect('/');
    });
  }
}
