"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEjsDefaultData = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var ejs_1 = require("../config/ejs");
var paths_1 = require("../utils/paths");
var updateEjsDefaultData = function (req, res, next) {
    res.locals.oldEjsDefaultData = ejs_1.ejsDefaultData;
    ejs_1.ejsDefaultData.user = req.user;
    if (!ejs_1.ejsDefaultData.avatarUrl && req.user) {
        var uploads = fs_1.default.readdirSync(paths_1.uploadsDirLocal);
        var userId_1 = req.user.id;
        var avatarFilename = uploads.find(function (f) { return f.includes(userId_1); });
        avatarFilename &&
            (ejs_1.ejsDefaultData.avatarUrl = path_1.default.join('/uploads', avatarFilename));
    }
    next();
};
exports.updateEjsDefaultData = updateEjsDefaultData;
//# sourceMappingURL=ejs.js.map