"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEjsDefaultData = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ejs_1 = require("../settings/ejs");
const utils_1 = require("../utils/utils");
const updateEjsDefaultData = (req, res, next) => {
    res.locals.oldEjsDefaultData = ejs_1.ejsDefaultData;
    ejs_1.ejsDefaultData.user = req.user;
    if (!ejs_1.ejsDefaultData.avatarUrl && req.user) {
        const uploads = fs_1.default.readdirSync(utils_1.uploadsDir);
        const userId = req.user.id;
        const avatarFilename = uploads.find((f) => f.includes(userId));
        avatarFilename &&
            (ejs_1.ejsDefaultData.avatarUrl = path_1.default.join('/uploads', avatarFilename));
    }
    next();
};
exports.updateEjsDefaultData = updateEjsDefaultData;
