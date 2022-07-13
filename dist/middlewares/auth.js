"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authz = exports.authn = void 0;
var authn = function (req, res, next) {
    req.user = {
        fullName: 'John Doe',
        isAdmin: true
    };
    next();
};
exports.authn = authn;
var authz = function (req, res, next) {
    if (req.user.isAdmin)
        next();
    else
        res.status(403).send('403: Forbidden, must be and admin');
};
exports.authz = authz;
