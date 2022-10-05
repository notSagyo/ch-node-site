"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.twilioNumber = void 0;
var twilio_1 = __importDefault(require("twilio"));
var accountSid = process.env.TWILIO_SID;
var authToken = process.env.TWILIO_TOKEN;
exports.twilioNumber = '+12139960300';
exports.client = (0, twilio_1.default)(accountSid, authToken);
//# sourceMappingURL=twilio.js.map