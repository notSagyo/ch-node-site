"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const notification_controller_1 = __importDefault(require("./notification.controller"));
class NotificationRouter {
    router = express_1.default.Router();
    constructor() {
        this.initRoutes();
    }
    initRoutes() {
        this.getSignupNotifications();
        this.getCheckoutNotifications();
    }
    getSignupNotifications() {
        this.router.get('/signup-notifications', auth_1.authn, async (req, res) => {
            notification_controller_1.default.sendSignUp(req, res);
        });
    }
    getCheckoutNotifications() {
        this.router.get('/checkout-notifications', auth_1.authn, async (req, res) => {
            notification_controller_1.default.sendCheckout(req, res);
        });
    }
}
exports.default = NotificationRouter;
