"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var path_1 = __importDefault(require("path"));
var mongoose_1 = require("../config/mongoose");
var paths_1 = require("../utils/paths");
var cookies_1 = require("./cookies");
var ejs_1 = require("./ejs");
var log_1 = __importDefault(require("./log"));
var passport_1 = __importDefault(require("./passport"));
var middlewares = [
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
//# sourceMappingURL=middlewares.js.map