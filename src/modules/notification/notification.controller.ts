import { Request, Response } from 'express';
import { TEST_MAIL, transporter } from '../../config/nodemailer';
import { client, twilioNumber } from '../../config/twilio';
import { logger } from '../../utils/logger';
import CartDao from '../cart/cart.dao';
import cartService from '../cart/cart.service';

class NotificationController {
  async sendSignUp(req: Request, res: Response) {
    let mailBody = '¡Registro exitoso!<br><br>Nuevo usuario:';

    for (const field in req.user) {
      const value = req.user[field as keyof Express.User];
      mailBody += `<br>* ${field}: ${value}`;
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
  }

  async sendCheckout(req: Request, res: Response) {
    if (!req.user) return res.status(400).send("Error request's reading user");

    const userCart = await CartDao.dao.getById(req.user.id);
    if (userCart == null)
      return res.status(404).send("Couldn't find a cart for active user");
    const products = await cartService.cartProductsToProducts(
      userCart.products
    );

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
  }
}

const notificationController = new NotificationController();
export default notificationController;
