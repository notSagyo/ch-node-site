"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEjsDefaultData = exports.resetAge = void 0;
const ejs_1 = require("../settings/ejs");
const resetAge = (req, res, next) => {
    req.session.touch();
    next();
};
exports.resetAge = resetAge;
const updateEjsDefaultData = (req, res, next) => {
    res.locals.oldEjsDefaultData = ejs_1.ejsDefaultData;
    ejs_1.ejsDefaultData.user = req.user;
    next();
};
exports.updateEjsDefaultData = updateEjsDefaultData;
