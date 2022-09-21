"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = __importStar(require("./message"));
const chat_dao_1 = __importDefault(require("./chat.dao"));
class ChatService {
    async createMessage(messageDto) {
        const cart = message_1.default.fromDto(messageDto);
        const success = await chat_dao_1.default.dao.save(cart);
        if (!success)
            throw new Error('Message service: error saving messageDto');
        return cart;
    }
    async getAllMessages() {
        return await chat_dao_1.default.dao.getAll();
    }
    async getMessageById(messageId) {
        return await chat_dao_1.default.dao.getById(messageId);
    }
    async deleteMessageById(messageId) {
        return await chat_dao_1.default.dao.deleteById(messageId);
    }
    async deleteAllMessages() {
        return await chat_dao_1.default.dao.deleteAll();
    }
    async updateMessageById(messageId, data) {
        let success = false;
        const exists = (await this.getMessageById(messageId)) != null;
        if (exists)
            success = await chat_dao_1.default.dao.updateById(messageId, data);
        else {
            const parsedMessage = (0, message_1.parseMessage)(data);
            if (parsedMessage)
                success = await chat_dao_1.default.dao.save(message_1.default.fromDto(parsedMessage));
        }
        return success;
    }
}
const messageService = new ChatService();
exports.default = messageService;
