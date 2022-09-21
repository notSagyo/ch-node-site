"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUser = void 0;
const uuid_1 = require("uuid");
const logger_1 = require("../../utils/logger");
const utils_1 = require("../../utils/utils");
class User {
    email;
    username;
    password;
    name;
    lastName;
    phone;
    age;
    avatar;
    isAdmin;
    id;
    constructor(email, username, password, name, lastName, phone, age, avatar, isAdmin, id) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.name = name;
        this.lastName = lastName;
        this.phone = phone;
        this.age = age;
        this.avatar = avatar;
        this.isAdmin = isAdmin;
        this.id = id;
    }
    static fromDto(dto) {
        const parsedUser = (0, exports.parseUser)(dto);
        if (parsedUser == null)
            throw new Error('User: error parsing message');
        return new User(parsedUser.email, parsedUser.username, parsedUser.password, parsedUser.name, parsedUser.lastName, parsedUser.phone, parsedUser.age, parsedUser.avatar, parsedUser.isAdmin, parsedUser.id);
    }
    toDto() {
        const { age, avatar, email, id, isAdmin, lastName, name, password, phone, username, } = this;
        return {
            age,
            avatar,
            email,
            id,
            isAdmin,
            lastName,
            name,
            password,
            phone,
            username,
        };
    }
}
exports.default = User;
const parseUser = (user) => {
    if (user == null)
        return null;
    const isValidPassword = typeof user?.password === 'string' && user.password.length > 1;
    const isValidName = typeof user?.name === 'string' && user.name.length > 1;
    const isValidId = typeof user?.id === 'string' && (0, uuid_1.validate)(user.id);
    const isValidRole = typeof user?.isAdmin === 'boolean';
    const isValidLastName = typeof user?.lastName === 'string' && user.lastName.length > 1;
    const isValidUsername = typeof user?.username === 'string' && user.username.length > 2;
    const isValidAvatar = typeof user?.avatar === 'string' && user.avatar.length > 0;
    const isValidEmail = typeof user?.email === 'string' && (0, utils_1.validateEmail)(user.email);
    const isValidAge = user?.age && !isNaN(Number(user?.age)) && Number(user?.age) > 0;
    const phoneNoSpaces = user?.phone
        ? parseInt(String(user?.phone).replaceAll(' ', ''))
        : null;
    if (!isValidAge)
        logger_1.logger.error('Invalid user age:', user?.age);
    if (!isValidName)
        logger_1.logger.error('Invalid user name:', user?.name);
    if (!isValidEmail)
        logger_1.logger.error('Invalid user email:', user?.email);
    if (!isValidUsername)
        logger_1.logger.error('Invalid user username:', user?.username);
    if (!isValidLastName)
        logger_1.logger.error('Invalid user last name:', user?.lastName);
    if (!isValidPassword)
        logger_1.logger.error('Invalid user password');
    if (!phoneNoSpaces)
        logger_1.logger.error('Invalid user phone:', phoneNoSpaces);
    const isValid = isValidUsername &&
        isValidPassword &&
        isValidLastName &&
        isValidEmail &&
        isValidName &&
        isValidAge &&
        phoneNoSpaces;
    if (!isValid)
        return null;
    const id = isValidId ? user.id : (0, uuid_1.v4)();
    const avatar = isValidAvatar ? user.avatar : '';
    const isAdmin = isValidRole ? user.isAdmin : false;
    return {
        id,
        avatar,
        isAdmin,
        phone: phoneNoSpaces,
        age: user.age,
        name: user.name,
        email: user.email,
        lastName: user.lastName,
        username: user.username,
        password: user.password,
    };
};
exports.parseUser = parseUser;
