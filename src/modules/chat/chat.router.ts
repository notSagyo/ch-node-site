import express from 'express';
import { ejsDefaultData } from '../../config/ejs';
import { chatSocket } from '../../middlewares/sockets';
import { IRouter } from '../../types/types';

export default class ChatRouter implements IRouter {
  chatHtmlPath: string;
  router = express.Router();

  constructor(cartHtmlPath: string) {
    this.chatHtmlPath = cartHtmlPath;
    this.initRoutes();
  }

  initRoutes() {
    this.getCartPage();
  }

  private getCartPage() {
    this.router.get('/', chatSocket, async (req, res) => {
      res.render(this.chatHtmlPath, ejsDefaultData);
    });
  }
}
