"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authz = exports.authn = void 0;
const authn = (req, res, next) => {
    if (req.session.user)
        next();
    res.status(401).send('Unauthorized: you must be logged in');
};
exports.authn = authn;
const authz = (req, res, next) => {
    if (req.session.isAdmin)
        next();
    else
        res.status(403).send('403: Forbidden, must be and admin');
};
exports.authz = authz;
