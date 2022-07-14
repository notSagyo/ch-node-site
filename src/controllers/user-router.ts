import * as express from 'express';
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
  }

  getLogin() {
    this.router.get('/login', (req, res) => {
      res.render(this.loginHtmlPath);
    });
  }

  getLogout() {
    this.router.get('/logout', (req, res) => {
      res.render(this.logoutHtmlPath);
    });
  }
}
