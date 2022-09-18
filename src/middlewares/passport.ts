import passport from 'passport';
import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import { saltRounds } from '../config/bcrypt';
import { parseUser } from '../utils/parsers';
import { logger } from '../utils/logger';
import UsersDao from '../modules/user/users-dao';

passport.use(
  'registration',
  new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    async (req, email, password, callback) => {
      const foundUser = await UsersDao.dao.getByEmail(email);
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

      const success = await UsersDao.dao.save(createdUser);
      if (!success) {
        logger.error('Passport middleware: error saving user');
        return callback(null, null);
      }

      callback(null, createdUser);
    }
  )
);

passport.use(
  'login',
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, callback) => {
      const dbUser = await UsersDao.dao.getByEmail(email);
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
  const foundUser = await UsersDao.dao.getByEmail(user);
  callback(null, foundUser);
});

export default passport;
