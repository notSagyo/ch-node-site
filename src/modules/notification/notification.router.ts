import express from 'express';
import { authn } from '../../middlewares/auth';
import { IRouter } from '../../types/types';
import notificationController from './notification.controller';

export default class NotificationRouter implements IRouter {
  router = express.Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.getSignupNotifications();
    this.getCheckoutNotifications();
  }

  private getSignupNotifications() {
    this.router.get('/signup-notifications', authn, async (req, res) => {
      notificationController.sendSignUp(req, res);
    });
  }

  private getCheckoutNotifications() {
    this.router.get('/checkout-notifications', authn, async (req, res) => {
      notificationController.sendCheckout(req, res);
    });
  }
}
