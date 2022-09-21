"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpErrorHandler = void 0;
const logger_1 = require("../../utils/logger");
const errors_1 = require("./errors");
class HttpErrorHandler {
    res;
    defaultData;
    constructor(res, defaultData = '') {
        this.res = res;
        this.defaultData = defaultData;
    }
    handleError(err, data = this.defaultData, statusCode) {
        let status = 418;
        let message = '';
        let resMessage = '';
        if (statusCode != null)
            status = statusCode;
        else if (err instanceof errors_1.ClientError)
            status = 400;
        else if (err instanceof errors_1.ServerError)
            status = 500;
        else if (err instanceof errors_1.NullError)
            status = 400;
        else if (err instanceof errors_1.NotFoundError)
            status = 404;
        else
            err.name = 'Unknown Error';
        message = `[${status}: ${err.name}] ${err.message}`;
        resMessage = `${message} ${data ? JSON.stringify(data) : ''}`;
        logger_1.logger.error(message, data);
        return { send: () => this.res.status(status).send(resMessage) };
    }
}
exports.HttpErrorHandler = HttpErrorHandler;
