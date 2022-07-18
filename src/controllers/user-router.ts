import express from 'express';
import multer from 'multer';
import { ejsDefaultData } from '../settings/ejs';
import { iRouter } from '../types/types';

export default class UserRouter implements iRouter {
  loginHtmlPath: string;
  logoutHtmlPath: string;
  router = express.Router();

  constructor(loginHtmlPath: string, logoutHtmlPath: string ) {
    this.logoutHtmlPath = logoutHtmlPath;
    this.loginHtmlPath = loginHtmlPath;
    this.initRoutes();
  }

  initRoutes() {
    this.getLogin();
    this.getLogout();
    this.postLogin();
    this.postLogout();
  }

  private getLogin() {
    this.router.get('/login', (req, res) => {
      if (req.session.user != null)
        return res.send('Already logged in');
      res.render(this.loginHtmlPath, ejsDefaultData);
    });
  }

  private getLogout() {
    this.router.get('/logout', (req, res) => {
      const destroyedUser = req.session.user;
      req.session.destroy((err) => {
        if (err)
          console.error(err);
        else {
          console.log('Session: destroyed');
          ejsDefaultData.user = null;
        }
      });
      res.render(this.logoutHtmlPath, destroyedUser);
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
}
