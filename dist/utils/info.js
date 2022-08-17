"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
process.on('message', (_) => {
    console.log(_);
    const argvs = process.argv.slice(2);
    const platform = os_1.default.platform();
    const nodeVer = process.versions.node;
    const projectFolder = process.cwd();
    const execPath = process.argv[1];
    const rss = `${process.memoryUsage().rss / 1024 ** 2} MB`;
    const pid = process.pid;
    const info = {
        argvs,
        osPlatform: platform,
        nodeVer,
        rss,
        projectFolder,
        execPath,
        pid,
    };
    process.send && process.send(info);
});
