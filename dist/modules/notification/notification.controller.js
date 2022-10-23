"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("../../config/nodemailer");
const twilio_1 = require("../../config/twilio");
const logger_1 = require("../../utils/logger");
const cart_dao_1 = __importDefault(require("../cart/cart.dao"));
const cart_service_1 = __importDefault(require("../cart/cart.service"));
class NotificationController {
    async sendSignUp(req, res) {
        let mailBody = '¡Registro exitoso!<br><br>Nuevo usuario:';
        for (const field in req.user) {
            const value = req.user[field];
            mailBody += `<br>* ${field}: ${value}`;
        }
        const mailOptions = {
            from: 'Servidor Node.js',
            to: nodemailer_1.TEST_MAIL,
            subject: 'Nuevo registro',
            html: mailBody,
        };
        try {
            await nodemailer_1.transporter.sendMail(mailOptions);
        }
        catch (err) {
            logger_1.logger.error(err);
            return res.status(400).send('Register: error processing email request');
        }
        res.redirect('/');
    }
    async sendCheckout(req, res) {
        if (!req.user)
            return res.status(400).send("Error request's reading user");
        const userCart = await cart_dao_1.default.dao.getById(req.user.id);
        if (userCart == null)
            return res.status(404).send("Couldn't find a cart for active user");
        const products = await cart_service_1.default.cartProductsToProducts(userCart.products);
        const mailBody = `¡Compra exitosa!<br><br>
    Productos inlcuidos en el pedido:
    <ul>
      ${products.map((prod) => `<li>${prod.name}</li>`).join('')}
    </ul>
  `;
        const mailOptions = {
            from: 'Servidor Node.js',
            to: nodemailer_1.TEST_MAIL,
            subject: `Nuevo pedido de: ${req.user?.username} (${req.user?.email})`,
            html: mailBody,
        };
        try {
            await nodemailer_1.transporter.sendMail(mailOptions);
        }
        catch (err) {
            logger_1.logger.error(err);
            return res.status(400).send('Checkout: error processing email request');
        }
        try {
            const res = await twilio_1.client.messages.create({
                body: 'Tu pedido se encuentra en proceso',
                from: twilio_1.twilioNumber,
                to: `+${req.user.phone}`,
            });
            logger_1.logger.info('Twilio SMS res:', res);
        }
        catch (err) {
            logger_1.logger.error(err);
            return res.status(400).send('Checkout: error processing SMS request');
        }
        res.redirect('/');
    }
}
const notificationController = new NotificationController();
exports.default = notificationController;
