"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = void 0;
const validateEmail = (email) => {
    const regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regex.test(email);
};
exports.validateEmail = validateEmail;
