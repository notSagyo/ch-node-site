"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullError = exports.NotFoundError = exports.ClientError = exports.ServerError = void 0;
const abstract_error_1 = require("./abstract-error");
class ServerError extends abstract_error_1.AbstractError {
    constructor(err) {
        super(err);
        this.name = 'ServerError';
    }
}
exports.ServerError = ServerError;
class ClientError extends abstract_error_1.AbstractError {
    constructor(err) {
        super(err);
        this.name = 'ClientError';
    }
}
exports.ClientError = ClientError;
class NotFoundError extends abstract_error_1.AbstractError {
    constructor(err) {
        super(err);
        this.name = 'NotFoundError';
    }
}
exports.NotFoundError = NotFoundError;
class NullError extends abstract_error_1.AbstractError {
    constructor(err) {
        super(err);
        this.name = 'NullError';
    }
}
exports.NullError = NullError;
