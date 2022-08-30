"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetAge = void 0;
const resetAge = (req, res, next) => {
    req.session.touch();
    next();
};
exports.resetAge = resetAge;
