import mongoose from 'mongoose';
import { UserDto } from '../../types/dtos';

export const userSchema: mongoose.Schema<UserDto> = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  avatar: { type: String },
  password: { type: String, required: true },
  isAdmin: { type: Boolean },
});

export const usersModel = mongoose.model('users', userSchema);
