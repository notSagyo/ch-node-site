"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ejs_1 = require("../../config/ejs");
const sockets_1 = require("../../middlewares/sockets");
class ChatRouter {
    chatHtmlPath;
    router = express_1.default.Router();
    constructor(cartHtmlPath) {
        this.chatHtmlPath = cartHtmlPath;
        this.initRoutes();
    }
    initRoutes() {
        this.getCartPage();
    }
    getCartPage() {
        this.router.get('/', sockets_1.chatSocket, async (req, res) => {
            res.render(this.chatHtmlPath, ejs_1.ejsDefaultData);
        });
    }
}
exports.default = ChatRouter;
