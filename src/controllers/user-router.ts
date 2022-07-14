import * as express from 'express';
import * as multer from 'multer';
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

  getLogin() {
    this.router.get('/login', (req, res) => {
      if (req.session.user != null)
        return res.send('Already logged in');
      res.render(this.loginHtmlPath, { user: req.session.user });
    });
  }

  getLogout() {
    this.router.get('/logout', (req, res) => {
      res.render(this.logoutHtmlPath, { user: req.session.user });
      if (req.session.user != null) {
        req.session.destroy(err => res.send(err));
        console.log('Session: destroyed');
      }
    });
  }

  postLogin() {
    const upload = multer();
    this.router.post('/login', upload.none(), (req, res) => {
      const user = req.body;

      if (req.session.user)
        return res.send('Already logged in');
      req.session.user = user;
      res.redirect('/');
    });
  }

  postLogout() {
    this.router.post('/logout', (req, res) => res.redirect('/logout'));
  }
}
