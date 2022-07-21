import express from 'express';
import multer from 'multer';
import { v4 } from 'uuid';
import { usersDao } from '../daos/users-dao-mongo';
import { ejsDefaultData } from '../settings/ejs';
import { iRouter } from '../types/types';

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
    this.router.post('/login', upload.none(), (req, res) => {
      const user = req.body;
      req.session.user = user;
      ejsDefaultData.user = user;
      console.log('Session: updated', req.session);
      res.redirect('/');
    });
  }

  private postLogout() {
    this.router.post('/logout', (req, res) => res.redirect('/logout'));
  }

  private postSignup() {
    const upload = multer();
    this.router.post('/signup', upload.none(), async (req, res) => {
      const user = req.body;
      const userExists = await usersDao.getByEmail(user.email) != null;

      if (userExists)
        return res.render(this.errorHtmlPath, {
          ejsDefaultData,
          errorTitle: 'Register error',
          errorDescription: 'A user with that username/email already exists'
        });

      // XXX: Replace with the real user data
      const newUser = { age: 20, name: 'Pipo', lastName: 'Pipona', username: v4(), ...user };
      const success = await usersDao.save(newUser);
      if (!success)
        return res.render(this.errorHtmlPath, { ejsDefaultData, errorTitle: 'User could not be created' });

      req.session.user = { email: newUser.email, username: newUser.username };
      ejsDefaultData.user = { email: newUser.email, username: newUser.username };
      console.log('Session: updated', req.session);
      res.redirect('/');
    });
  }
}
