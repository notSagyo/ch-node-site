import mongoose from 'mongoose';
import { schema, Schema } from 'normalizr';
import { iMessage, iUser } from '../types/models';
import { userSchema } from './user';

// Mongoose Schema ===========================================================//
export const messageSchema: mongoose.Schema<iMessage> = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  time: { type: Number, required: true },
  author: { type: userSchema, required: true },
  content: { type: String, required: true }
});
export const messageModel = mongoose.model('messages', messageSchema);

// Normalizr Schema ==========================================================//
export const normalizrAuthorSchema: Schema<iUser> =
  new schema.Entity('authors', {  }, { idAttribute: 'email' });
export const normalizerMessageSchema: Schema<iMessage> =
  new schema.Entity('messages', { author: normalizrAuthorSchema, });
