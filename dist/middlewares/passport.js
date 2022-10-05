"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var passport_1 = __importDefault(require("passport"));
var passport_local_1 = require("passport-local");
var user_entity_1 = require("../user/entities/user.entity");
var user_service_1 = require("../user/user.service");
var bcrypt_2 = require("../config/bcrypt");
var logger_1 = require("../utils/logger");
var userService = new user_service_1.UserService();
passport_1.default.use('registration', new passport_local_1.Strategy({ usernameField: 'email', passReqToCallback: true }, function (req, email, password, callback) { return __awaiter(void 0, void 0, void 0, function () {
    var foundUser, hashedPassword, createdUser, success;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, userService.getUserByEmail(email)];
            case 1:
                foundUser = _a.sent();
                if (foundUser != null)
                    return [2, callback(null, false, { message: 'User already exists' })];
                hashedPassword = bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(bcrypt_2.saltRounds));
                createdUser = (0, user_entity_1.parseUser)({
                    email: email,
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
                    return [2, callback(null, null)];
                }
                return [4, userService.createUser(createdUser)];
            case 2:
                success = _a.sent();
                if (!success) {
                    logger_1.logger.error('Passport middleware: error saving user');
                    return [2, callback(null, null)];
                }
                callback(null, createdUser);
                return [2];
        }
    });
}); }));
passport_1.default.use('login', new passport_local_1.Strategy({ usernameField: 'email' }, function (email, password, callback) { return __awaiter(void 0, void 0, void 0, function () {
    var dbUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, userService.getUserByEmail(email)];
            case 1:
                dbUser = _a.sent();
                if (dbUser == null || !bcrypt_1.default.compareSync(password, dbUser.password))
                    return [2, callback(null, false, { message: 'Invalid email/password' })];
                callback(null, dbUser);
                return [2];
        }
    });
}); }));
passport_1.default.serializeUser(function (user, callback) {
    callback(null, user.email);
});
passport_1.default.deserializeUser(function (user, callback) { return __awaiter(void 0, void 0, void 0, function () {
    var foundUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, userService.getUserByEmail(user)];
            case 1:
                foundUser = _a.sent();
                callback(null, foundUser);
                return [2];
        }
    });
}); });
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map