import mongoose from 'mongoose';
import { schema, Schema } from 'normalizr';
import { MessageDto, UserDto } from '../../types/dtos';
import { userSchema } from '../user/user.model';

// Mongoose Schema ===========================================================//
export const messageSchema: mongoose.Schema<MessageDto> = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  time: { type: Number, required: true },
  author: { type: userSchema, required: true },
  content: { type: String, required: true },
});
export const messageModel = mongoose.model('messages', messageSchema);

// Normalizr Schema ==========================================================//
export const normalizrAuthorSchema: Schema<UserDto> = new schema.Entity(
  'authors',
  {},
  { idAttribute: 'email' }
);
export const normalizerMessageSchema: Schema<MessageDto> = new schema.Entity(
  'messages',
  { author: normalizrAuthorSchema }
);
