"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetAge = void 0;
var resetAge = function (req, res, next) {
    req.session.touch();
    next();
};
exports.resetAge = resetAge;
//# sourceMappingURL=cookies.js.map