import express from 'express';
import multer from 'multer';
import bcrypt from 'bcrypt';
import { usersDao } from '../daos/users-dao-mongo';
import { ejsDefaultData } from '../settings/ejs';
import { saltRounds } from '../settings/bcrypt';
import { iRouter } from '../types/types';
import { v4 } from 'uuid';
import { iUser } from '../types/models';

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
    this.router.post('/login', upload.none(), async (req, res) => {
      const user = req.body;
      const dbUser = await usersDao.getByEmail(user.email);
      let success = false;

      // Check if user credentials are correct
      if (dbUser != null && await bcrypt.compare(user.password, dbUser.password))
        success = true;

      // If credentials don't match, render error page
      if (!success)
        return res.render(this.errorHtmlPath, {
          ejsDefaultData,
          errorTitle: 'Login error',
          errorDescription: 'Invalid email/password'
        });

      // Update session
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
      const doUserExist = (await usersDao.getAll())
        .some((u) => u.email == user.email || u.username == user.username);

      // If user already exists, render error page
      if (doUserExist)
        return res.render(this.errorHtmlPath, {
          ejsDefaultData,
          errorTitle: 'Register error',
          errorDescription: 'A user with that username/email already exists'
        });

      // Hash password
      await bcrypt.hash(user.password, saltRounds).then(hash => user.password = hash);

      // HACK: Replace with the real user data
      const newUser: iUser = { age: 20, name: 'Pipo', lastName: 'Pipona', username: v4(), ...user };

      // Try to save user, if fails, render error page
      const success = await usersDao.save(newUser);
      if (!success)
        return res.render(this.errorHtmlPath, {
          ejsDefaultData,
          errorTitle: 'Register error',
          errorDescription: 'User could not be created'
        });

      // Update session
      req.session.user = { email: newUser.email, username: newUser.username };
      ejsDefaultData.user = { email: newUser.email, username: newUser.username };
      console.log('Session: updated', req.session);

      res.redirect('/');
    });
  }
}
