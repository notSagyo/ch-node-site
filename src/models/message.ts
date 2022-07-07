import * as mongoose from 'mongoose';
import * as norm from 'normalizr';
import { iMessage, iUser } from '../types';

const normalizrAuthorSchema: norm.Schema<iUser> = new norm.schema.Entity('authors', {}, { idAttribute: 'email' });
const normalizrMessageSchema: norm.Schema<iMessage> = new norm.schema.Entity('messages', {
  author: normalizrAuthorSchema,
});

const mongoMsgSchema: mongoose.Schema<iMessage> = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  time: { type: Number, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true }
});

export const messageModel = mongoose.model('messages', mongoMsgSchema);
