"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const normalizr_1 = require("normalizr");
const container_mongo_1 = __importDefault(require("../../containers/container-mongo"));
const parsers_1 = require("../../utils/parsers");
const users_dao_mongo_1 = __importDefault(require("../user/users-dao-mongo"));
const message_model_1 = require("./message-model");
class MessagesDao {
    static dao = new MessagesDao();
    container = new container_mongo_1.default(message_model_1.messageModel);
    constructor() {
        return MessagesDao.dao;
    }
    async save(message) {
        const parsedMessage = (0, parsers_1.parseMessage)(message);
        if (parsedMessage == null)
            return false;
        let foundUser = await users_dao_mongo_1.default.dao.getByEmail(parsedMessage.author.email);
        if (foundUser == null) {
            await users_dao_mongo_1.default.dao.save(parsedMessage.author);
            foundUser = await users_dao_mongo_1.default.dao.getByEmail(parsedMessage.author.email);
            if (foundUser == null)
                return false;
        }
        const messageWithAuthor = { ...parsedMessage, author: foundUser };
        return await this.container.insert(messageWithAuthor);
    }
    async getById(id) {
        const res = await this.container.find({ id });
        const message = res ? res[0] : null;
        return message;
    }
    async getAll() {
        return (await this.container.find('*')) || [];
    }
    async updateById(id, data) {
        return await this.container.update({ id }, data);
    }
    async deleteById(id) {
        return await this.container.delete({ id });
    }
    async deleteAll() {
        return await this.container.delete('*');
    }
    async getAllNormalized() {
        const messages = await this.getAll();
        const normalizedMessages = (0, normalizr_1.normalize)(messages, [message_model_1.normalizerMessageSchema]);
        return normalizedMessages;
    }
}
exports.default = MessagesDao;
