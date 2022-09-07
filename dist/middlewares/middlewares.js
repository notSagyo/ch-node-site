"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = require("../config/mongoose");
const paths_1 = require("../utils/paths");
const log_1 = __importDefault(require("./log"));
const passport_1 = __importDefault(require("./passport"));
const cookies_1 = require("./cookies");
const ejs_1 = require("./ejs");
const middlewares = [
    express_1.default.json(),
    express_1.default.urlencoded({ extended: true }),
    express_1.default.static(path_1.default.join(paths_1.baseDirLocal, 'public')),
    (0, express_session_1.default)({
        store: connect_mongo_1.default.create({ mongoUrl: mongoose_1.mongooseOptions.uri }),
        cookie: { maxAge: 10 * 60 * 1000 },
        secret: 'TheCookieNeverRests',
        resave: false,
        saveUninitialized: false,
    }),
    (0, cookie_parser_1.default)('TheCookieNeverRests'),
    passport_1.default.initialize(),
    passport_1.default.session(),
    cookies_1.resetAge,
    ejs_1.updateEjsDefaultData,
    log_1.default,
];
exports.default = middlewares;
