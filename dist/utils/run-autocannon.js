"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const autocannon_1 = __importDefault(require("autocannon"));
const stream_1 = require("stream");
async function runAutocannon(url) {
    console.log('Running benchmarks...');
    const buf = [];
    const outputStream = new stream_1.PassThrough();
    const inst = await (0, autocannon_1.default)({
        url,
        connections: 100,
        duration: 20,
    }, console.log);
    autocannon_1.default.track(inst, { outputStream });
    outputStream.on('data', (data) => buf.push(data));
    inst.on('done', () => process.stdout.write(Buffer.concat(buf)));
}
exports.default = runAutocannon;
