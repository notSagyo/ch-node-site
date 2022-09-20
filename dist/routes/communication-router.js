"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nodemailer_1 = require("../config/nodemailer");
const carts_dao_mongo_1 = require("../daos/carts-dao-mongo");
const auth_1 = require("../middlewares/auth");
const utils_1 = require("../utils/utils");
const twilio_1 = require("../config/twilio");
const logger_1 = require("../utils/logger");
class CommunicationRouter {
    router = express_1.default.Router();
    constructor() {
        this.initRoutes();
    }
    initRoutes() {
        this.getCheckoutMessages();
        this.getSignupMessages();
    }
    getCheckoutMessages() {
        this.router.get('/checkout-messages', auth_1.authn, async (req, res) => {
            if (!req.user)
                return res.status(400).send("Error request's reading user");
            const userCart = await carts_dao_mongo_1.cartsDao.getById(req.user.id);
            if (userCart == null)
                return res.status(404).send("Couldn't find a cart for active user");
            const products = await (0, utils_1.cartProductsToProducts)(userCart.products);
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
        });
    }
    getSignupMessages() {
        this.router.get('/signup-messages', auth_1.authn, async (req, res) => {
            let mailBody = '¡Registro exitoso!<br><br>Nuevo usuario:';
            for (const key in req.user) {
                const value = req.user[key];
                mailBody += `<br>* ${key}: ${value}`;
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
        });
    }
}
exports.default = CommunicationRouter;
