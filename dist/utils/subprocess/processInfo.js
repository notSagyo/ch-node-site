"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProcessInfo = void 0;
const os_1 = __importDefault(require("os"));
const getProcessInfo = () => {
    const argvs = process.argv.slice(2);
    const platform = os_1.default.platform();
    const nodeVer = process.versions.node;
    const projectFolder = process.cwd();
    const execPath = process.argv[1];
    const rss = `${process.memoryUsage().rss / 1024 ** 2} MB`;
    const pid = process.pid;
    return {
        argvs,
        osPlatform: platform,
        nodeVer,
        projectFolder,
        execPath,
        rss,
        pid,
    };
};
exports.getProcessInfo = getProcessInfo;
process.on('message', () => {
    const info = (0, exports.getProcessInfo)();
    process.send && process.send(info);
});
