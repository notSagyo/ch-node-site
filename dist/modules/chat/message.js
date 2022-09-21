"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMessage = void 0;
const uuid_1 = require("uuid");
const logger_1 = require("../../utils/logger");
class Message {
    content;
    author;
    time;
    id;
    constructor(author, content, time, id) {
        this.content = content;
        this.author = author;
        this.time = time;
        this.id = id;
    }
    static fromDto(dto) {
        const parsedMessage = (0, exports.parseMessage)(dto);
        if (parsedMessage == null)
            throw new Error('Message: error parsing message');
        return new Message(parsedMessage.author, parsedMessage.content, parsedMessage.time, parsedMessage.id);
    }
    toDto() {
        const { author, content, time, id } = this;
        return { author, content, time, id };
    }
}
exports.default = Message;
const parseMessage = (msg) => {
    if (msg == null)
        return null;
    const id = typeof msg?.id === 'string' ? msg.id : (0, uuid_1.v4)();
    const author = typeof msg?.author === 'string' ? msg.author : null;
    const time = msg?.time && !isNaN(Number(msg?.time)) ? Number(msg.time) : Date.now();
    const content = typeof msg?.content === 'string' && msg?.content.length > 0
        ? msg.content
        : '';
    if (author == null) {
        logger_1.logger.error('Invalid message author');
        return null;
    }
    return { id, time, author, content };
};
exports.parseMessage = parseMessage;
