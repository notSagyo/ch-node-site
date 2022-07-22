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
    this.getErrorInvalidCredentials();
    this.getErrorAlreadyExists();
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

  private postLogin() {
    const upload = multer();
    this.router.post(
      '/login',
      upload.none(),
      passport.authenticate('authn', { failureRedirect: '/loginerror' }),
      (req, res) => res.redirect('/')
    );
  }

  private postSignup() {
    const upload = multer();
    this.router.post(
      '/signup',
      upload.none(),
      passport.authenticate('registration', { failureRedirect: '/signuperror' }),
      (req, res) => res.redirect('/')
    );
  }

  private postLogout() {
    this.router.post('/logout', (req, res) => res.redirect('/logout'));
  }

  private getErrorInvalidCredentials() {
    this.router.get('/loginerror', (req, res) => {
      res.render(this.errorHtmlPath, {
        ejsDefaultData,
        errorTitle: 'Login error',
        errorDescription: 'Invalid credentials: email/password combination'
          + ' do not match an existing user'
      });
    });
  }

  private getErrorAlreadyExists() {
    this.router.get('/signuperror', (req, res) => {
      res.render(this.errorHtmlPath, {
        ejsDefaultData,
        errorTitle: 'Registration error',
        errorDescription: 'User with the same email/username already exists'
      });
    });
  }
}
