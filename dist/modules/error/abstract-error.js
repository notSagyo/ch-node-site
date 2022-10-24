"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractError = void 0;
class AbstractError extends Error {
    constructor(err) {
        if (err instanceof Error) {
            super(err.message);
            this.cause = err.cause;
            this.name = err.name;
            this.message = err.message;
            this.stack = err.stack;
        }
        else {
            super(err);
        }
    }
}
exports.AbstractError = AbstractError;
