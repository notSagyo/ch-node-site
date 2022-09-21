"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const container_mongo_1 = __importDefault(require("../../containers/container-mongo"));
const message_1 = __importDefault(require("./message"));
const message_model_1 = require("./message.model");
class MessageDao {
    static dao = new MessageDao();
    container = new container_mongo_1.default(message_model_1.messageModel);
    constructor() {
        return MessageDao.dao;
    }
    async save(message) {
        const dto = message.toDto();
        return await this.container.insert(dto);
    }
    async getById(id) {
        const res = await this.container.find({ id });
        const product = res[0] ? message_1.default.fromDto(res[0]) : null;
        return product;
    }
    async getAll() {
        const messagesDto = (await this.container.find('*')) || [];
        const messages = messagesDto.map((msg) => message_1.default.fromDto(msg));
        return messages;
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
}
exports.default = MessageDao;
