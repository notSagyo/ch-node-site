"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promises_1 = __importDefault(require("fs/promises"));
const image_type_1 = __importDefault(require("image-type"));
const multer_1 = __importDefault(require("multer"));
const passport_1 = __importDefault(require("passport"));
const path_1 = __importDefault(require("path"));
const ejs_1 = require("../../config/ejs");
const logger_1 = require("../../utils/logger");
const paths_1 = require("../../utils/paths");
class UserRouter {
    loginHtmlPath;
    logoutHtmlPath;
    signupHtmlPath;
    errorHtmlPath;
    router = express_1.default.Router();
    constructor(loginHtmlPath, logoutHtmlPath, signupHtmlPath, errorHtmlPath) {
        this.logoutHtmlPath = logoutHtmlPath;
        this.loginHtmlPath = loginHtmlPath;
        this.signupHtmlPath = signupHtmlPath;
        this.errorHtmlPath = errorHtmlPath;
        this.initRoutes();
    }
    initRoutes() {
        this.getLogin();
        this.getSignup();
        this.getLogout();
        this.postLogin();
        this.postSignup();
        this.postLogout();
        this.getError();
    }
    getLogin() {
        this.router.get('/login', (req, res) => {
            res.render(this.loginHtmlPath, ejs_1.ejsDefaultData);
        });
    }
    getSignup() {
        this.router.get('/signup', (req, res) => {
            res.render(this.signupHtmlPath, ejs_1.ejsDefaultData);
        });
    }
    getLogout() {
        this.router.get('/logout', (req, res) => {
            const destroyedUser = res.locals.oldEjsDefaultData.user;
            let success = true;
            req.logout((err) => {
                logger_1.logger.log(err);
                success = false;
            });
            if (!success) {
                return res.render(this.errorHtmlPath, {
                    ejsDefaultData: ejs_1.ejsDefaultData,
                    errorTitle: 'Logout error',
                    errorDescription: 'Logout failed',
                });
            }
            ejs_1.ejsDefaultData.reset();
            res.render(this.logoutHtmlPath, { user: destroyedUser });
        });
    }
    postLogin() {
        const upload = (0, multer_1.default)();
        this.router.post('/login', upload.none(), passport_1.default.authenticate('login', {
            failureRedirect: '/error' +
                '?errorTitle=Login error' +
                '&errorDescription=Invalid credentials: email/password combination' +
                ' do not match an existing user',
        }), (req, res) => res.redirect(303, '/'));
    }
    postSignup() {
        const upload = (0, multer_1.default)();
        this.router.post('/signup', upload.single('avatar'), passport_1.default.authenticate('registration', {
            failureRedirect: '/error' +
                '?errorTitle=Registration error' +
                '&errorDescription=User with the same email/username/phone already exists',
        }), (req, res) => {
            if (!req.user)
                return;
            if (req.file) {
                const imgExtension = (0, image_type_1.default)(req.file.buffer)?.ext;
                imgExtension &&
                    promises_1.default.writeFile(path_1.default.join(paths_1.uploadsDirLocal, `${req.user?.id}.${imgExtension}`), req.file.buffer);
            }
            res.redirect('/signup-notifications');
        });
    }
    postLogout() {
        this.router.post('/logout', (req, res) => res.redirect('/logout'));
    }
    getError() {
        this.router.get('/error', (req, res) => {
            const errorTitle = req.query.errorTitle || 'Error';
            const errorDescription = req.query.errorDescription || 'Unknown error';
            logger_1.logger.error(`${errorTitle} - ${errorDescription}`);
            res.status(401).render(this.errorHtmlPath, {
                ejsDefaultData: ejs_1.ejsDefaultData,
                errorTitle: errorTitle,
                errorDescription: errorDescription,
            });
        });
    }
}
exports.default = UserRouter;
