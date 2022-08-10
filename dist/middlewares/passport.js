"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_local_1 = require("passport-local");
const users_dao_mongo_1 = require("../daos/users-dao-mongo");
const bcrypt_2 = require("../settings/bcrypt");
const uuid_1 = require("uuid");
passport_1.default.use('registration', new passport_local_1.Strategy({ usernameField: 'email' }, async (email, password, callback) => {
    const foundUser = await users_dao_mongo_1.usersDao.getByEmail(email);
    if (foundUser != null)
        return callback(null, false, { message: 'User already exists' });
    const hashedPassword = bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(bcrypt_2.saltRounds));
    const createdUser = {
        age: 20,
        name: 'Pipo',
        lastName: 'Pipona',
        username: (0, uuid_1.v4)(),
        id: (0, uuid_1.v4)(),
        avatar: '',
        email,
        password: hashedPassword
    };
    await users_dao_mongo_1.usersDao.save(createdUser);
    callback(null, createdUser);
}));
passport_1.default.use('authn', new passport_local_1.Strategy({ usernameField: 'email' }, async (email, password, callback) => {
    const dbUser = await users_dao_mongo_1.usersDao.getByEmail(email);
    if (dbUser == null || !bcrypt_1.default.compareSync(password, dbUser.password))
        return callback(null, false, { message: 'Invalid email/password' });
    callback(null, dbUser);
}));
passport_1.default.serializeUser((user, callback) => {
    callback(null, user.email);
});
passport_1.default.deserializeUser(async (user, callback) => {
    const foundUser = (await users_dao_mongo_1.usersDao.getByEmail(user)) || {};
    callback(null, foundUser);
});
exports.default = passport_1.default;
