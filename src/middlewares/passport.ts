import passport from 'passport';
import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import { usersDao } from '../daos/users-dao-mongo';
import { iUser } from '../types/models';
import { saltRounds } from '../settings/bcrypt';
import { parseUser } from '../utils/parsers';
import { logger } from '../utils/logger';

passport.use(
  'registration',
  new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    async (req, email, password, callback) => {
      const foundUser = await usersDao.getByEmail(email);
      if (foundUser != null)
        return callback(null, false, { message: 'User already exists' });

      const hashedPassword = bcrypt.hashSync(
        password,
        bcrypt.genSaltSync(saltRounds)
      );

      const createdUser = parseUser({
        email,
        age: parseInt(req.body.age),
        name: req.body.name,
        lastName: req.body.lastName,
        username: req.body.username,
        avatar: req.body.avatar,
        phone: req.body.phone,
        password: hashedPassword,
      });

      if (createdUser == null) {
        logger.error('Passport middleware: error parsing user');
        return callback(null, null);
      }

      const success = await usersDao.save(createdUser);
      if (!success) {
        logger.error('Passport middleware: error saving user');
        return callback(null, null);
      }

      callback(null, createdUser);
    }
  )
);

passport.use(
  'authn',
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, callback) => {
      const dbUser = await usersDao.getByEmail(email);
      if (dbUser == null || !bcrypt.compareSync(password, dbUser.password))
        return callback(null, false, { message: 'Invalid email/password' });
      callback(null, dbUser);
    }
  )
);

passport.serializeUser((user, callback) => {
  callback(null, user.email);
});

passport.deserializeUser(async (user: string, callback) => {
  const foundUser = (await usersDao.getByEmail(user)) || ({} as iUser);
  callback(null, foundUser);
});

export default passport;
