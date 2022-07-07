import * as mongoose from 'mongoose';
import { v4, validate } from 'uuid';
import { iUser } from '../types';
import { validateEmail } from '../utils';

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

export const parseUser = (user: Partial<iUser> | Record<string, unknown> | undefined | null): iUser | null => {
  if (user == null) return null;
  const isValidId = typeof user?.id === 'string' && validate(user.id);
  const isValidEmail = typeof user?.email === 'string' && validateEmail(user.email);
  const isValidName = typeof user?.name === 'string' && user.name.length > 1;
  const isValidLastName = typeof user?.lastName === 'string' && user.lastName.length > 1;
  const isValidUsername = typeof user?.username === 'string' && user.username.length > 2;
  const isValidAge = typeof user?.age === 'number' && user.age > 0;
  const isValidAvatar = typeof user?.avatar === 'string' && user.avatar.length > 0;


  // TODO: add specific log for each case
  const isValid = isValidEmail
    && isValidName
    && isValidLastName
    && isValidUsername
    && isValidAge;

  if (!isValid)
    return null;
  const id = isValidId ? user.id as string: v4();
  const avatar = isValidAvatar ? user.avatar as string : '';

  return({
    id,
    avatar,
    email: user.email as string,
    name: user.name as string,
    lastName: user.lastName as string,
    username: user.username as string,
    age: user.age as number,
  });
};
