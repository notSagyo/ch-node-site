import * as mongoose from 'mongoose';
import { iUser } from '../types';

export const userSchema: mongoose.Schema<iUser> = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  age: { type: Number, required: true },
  avatar: { type: String },
});

export const usersModel = mongoose.model('users', userSchema);
