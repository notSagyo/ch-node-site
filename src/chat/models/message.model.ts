import mongoose from 'mongoose';
import { schema, Schema } from 'normalizr';
// import { userSchema } from 'src/user/models/user.model';
import { MessageDto, UserDto } from '../../types/dtos';

// ?TODO: Replace author for real user
// * Keeping commented code to make author real user
// Mongoose Schema ===========================================================//
export const messageSchema: mongoose.Schema<MessageDto> = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  time: { type: Number, required: true },
  author: { type: String, required: true },
  // author: { type: userSchema, required: true },
  content: { type: String, required: true },
});
export const messageModel = mongoose.model('messages', messageSchema);

// Normalizr Schema ==========================================================//
export const normalizrAuthorSchema: Schema<UserDto> = new schema.Entity(
  'authors',
  {},
  { idAttribute: 'email' },
);
export const normalizerMessageSchema: Schema<MessageDto> = new schema.Entity(
  'messages',
  { author: normalizrAuthorSchema },
);
