"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testNormalizr = void 0;
const messages_dao_mongo_1 = require("../daos/messages-dao-mongo");
const tests_1 = require("./tests");
const normalizr_1 = require("normalizr");
const util_1 = require("util");
const testNormalizr = async () => {
    const authorSchema = new normalizr_1.schema.Entity('authors');
    const messageSchema = new normalizr_1.schema.Entity('messages', {
        author: authorSchema,
    });
    const messages = await messages_dao_mongo_1.messagesDao.getAll().then((messages) => {
        console.log(typeof []);
        return messages;
    });
    let normalizedMessages;
    let denormalizedMessages;
    await (0, tests_1.testFunction)('Normalize messages', () => {
        normalizedMessages = (0, normalizr_1.normalize)(messages, [messageSchema]);
        console.log('normalizedMessages:', (0, util_1.inspect)(normalizedMessages, false, 12, true));
    });
    await (0, tests_1.testFunction)('Denormalize messages', () => {
        denormalizedMessages = (0, normalizr_1.denormalize)(normalizedMessages.result, [messageSchema], normalizedMessages.entities);
        console.log('denormalizedMessages:', denormalizedMessages);
    });
    await (0, tests_1.testFunction)('Compression rate', () => {
        const compressed = JSON.stringify(normalizedMessages);
        const uncompressed = JSON.stringify(denormalizedMessages);
        console.log(`normalized: ${compressed.length} bytes`);
        console.log(`denormalized: ${uncompressed.length} bytes`);
        console.log(`compression rate: ${(100 -
            (compressed.length / uncompressed.length) * 100).toFixed(2)}%`);
    });
};
exports.testNormalizr = testNormalizr;
