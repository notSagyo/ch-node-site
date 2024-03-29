"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_local_1 = require("passport-local");
const bcrypt_2 = require("../config/bcrypt");
const logger_1 = require("../utils/logger");
const user_1 = require("../modules/user/user");
const user_service_1 = __importDefault(require("../modules/user/user.service"));
passport_1.default.use('registration', new passport_local_1.Strategy({ usernameField: 'email', passReqToCallback: true }, async (req, email, password, callback) => {
    const foundUser = await user_service_1.default.getUserByEmail(email);
    if (foundUser != null)
        return callback(null, false, { message: 'User already exists' });
    const hashedPassword = bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(bcrypt_2.saltRounds));
    const createdUser = (0, user_1.parseUser)({
        email,
        age: parseInt(req.body.age),
        name: req.body.name,
        lastName: req.body.lastName,
        username: req.body.username,
        avatar: req.body.avatar,
        phone: req.body.phone,
        password: hashedPassword,
        isAdmin: req.body.isAdmin,
    });
    if (createdUser == null) {
        logger_1.logger.error('Passport middleware: error parsing user');
        return callback(null, null);
    }
    const success = await user_service_1.default.createUser(createdUser);
    if (!success) {
        logger_1.logger.error('Passport middleware: error saving user');
        return callback(null, null);
    }
    callback(null, createdUser);
}));
passport_1.default.use('login', new passport_local_1.Strategy({ usernameField: 'email' }, async (email, password, callback) => {
    const dbUser = await user_service_1.default.getUserByEmail(email);
    if (dbUser == null || !bcrypt_1.default.compareSync(password, dbUser.password))
        return callback(null, false, { message: 'Invalid email/password' });
    callback(null, dbUser);
}));
passport_1.default.serializeUser((user, callback) => {
    callback(null, user.email);
});
passport_1.default.deserializeUser(async (user, callback) => {
    const foundUser = await user_service_1.default.getUserByEmail(user);
    callback(null, foundUser);
});
exports.default = passport_1.default;
