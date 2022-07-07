import * as mongoose from 'mongoose';
import { iUser } from '../types';

const userSchema: mongoose.Schema<iUser> = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  avatar: { type: String, required: true },
  username: { type: String, required: true },
  age: { type: Number, required: true },
});

export const usermodel = mongoose.model('users', userSchema);
