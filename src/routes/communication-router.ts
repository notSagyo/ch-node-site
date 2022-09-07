import { iRouter } from '../types/types';
import express from 'express';
import { TEST_MAIL, transporter } from '../config/nodemailer';
import { cartsDao } from '../daos/carts-dao-mongo';
import { authn } from '../middlewares/auth';
import { cartProductsToProducts } from '../utils/utils';
import { client, twilioNumber } from '../config/twilio';
import { logger } from '../utils/logger';

export default class CommunicationRouter implements iRouter {
  router = express.Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.getCheckoutMessages();
    this.getSignupMessages();
  }

  private getCheckoutMessages() {
    this.router.get('/checkout-messages', authn, async (req, res) => {
      if (!req.user)
        return res.status(400).send("Error request's reading user");

      const userCart = await cartsDao.getById(req.user.id);
      if (userCart == null)
        return res.status(404).send("Couldn't find a cart for active user");
      const products = await cartProductsToProducts(userCart.products);

      const mailBody = `¡Compra exitosa!<br><br>
        Productos inlcuidos en el pedido:
        <ul>
          ${products.map((prod) => `<li>${prod.name}</li>`).join('')}
        </ul>
      `;

      const mailOptions = {
        from: 'Servidor Node.js',
        to: TEST_MAIL,
        subject: `Nuevo pedido de: ${req.user?.username} (${req.user?.email})`,
        html: mailBody,
      };

      try {
        await transporter.sendMail(mailOptions);
      } catch (err) {
        logger.error(err);
        return res.status(400).send('Checkout: error processing email request');
      }

      try {
        const res = await client.messages.create({
          body: 'Tu pedido se encuentra en proceso',
          from: twilioNumber,
          to: `+${req.user.phone}`,
        });
        logger.info('Twilio SMS res:', res);
      } catch (err) {
        logger.error(err);
        return res.status(400).send('Checkout: error processing SMS request');
      }

      res.redirect('/');
    });
  }

  private getSignupMessages() {
    this.router.get('/signup-messages', authn, async (req, res) => {
      let mailBody = '¡Registro exitoso!<br><br>Nuevo usuario:';

      for (const key in req.user) {
        const value = req.user[key as keyof Express.User];
        mailBody += `<br>* ${key}: ${value}`;
      }

      const mailOptions = {
        from: 'Servidor Node.js',
        to: TEST_MAIL,
        subject: 'Nuevo registro',
        html: mailBody,
      };

      try {
        await transporter.sendMail(mailOptions);
      } catch (err) {
        logger.error(err);
        return res.status(400).send('Register: error processing email request');
      }

      res.redirect('/');
    });
  }
}
