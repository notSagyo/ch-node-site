import passport from 'passport';
import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import { usersDao } from '../daos/users-dao-mongo';
import { iUser } from '../types/models';
import { saltRounds } from './bcrypt';
import { v4 } from 'uuid';

passport.use('registration', new LocalStrategy({ usernameField: 'email' }, async (email, password, callback) => {
  const foundUser = await usersDao.getByEmail(email);
  if (foundUser != null) return callback(new Error('User already exists'));
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds));
  const createdUser: iUser = {
    age: 20,
    name: 'Pipo',
    lastName: 'Pipona',
    username: v4(),
    id: v4(),
    avatar: '',
    email,
    password: hashedPassword
  };
  await usersDao.save(createdUser);
  callback(null, createdUser);
}));

passport.use('authn', new LocalStrategy({ usernameField: 'email' }, async (email, password, callback) => {
  const dbUser = await usersDao.getByEmail(email);
  if (dbUser == null || !bcrypt.compareSync(password, dbUser.password))
    return callback(new Error('Invalid login credentials'));
  callback(null, dbUser);
}));

passport.serializeUser((user, callback) => {
  callback(null, user.email);
});

passport.deserializeUser(async (user: string, callback) => {
  const foundUser = (await usersDao.getByEmail(user)) || {} as iUser;
  callback(null, foundUser);
});

export default passport;
