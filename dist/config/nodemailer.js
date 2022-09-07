"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = exports.TEST_MAIL = void 0;
const nodemailer_1 = require("nodemailer");
exports.TEST_MAIL = 'myrtle.langosh70@ethereal.email';
exports.transporter = (0, nodemailer_1.createTransport)({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: exports.TEST_MAIL,
        pass: 'Sr54T5D6CH17DHe48r',
    },
});
