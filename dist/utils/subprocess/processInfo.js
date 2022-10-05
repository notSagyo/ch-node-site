"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProcessInfo = void 0;
var os_1 = __importDefault(require("os"));
var getProcessInfo = function () {
    var argvs = process.argv.slice(2);
    var platform = os_1.default.platform();
    var nodeVer = process.versions.node;
    var projectFolder = process.cwd();
    var execPath = process.argv[1];
    var rss = "".concat(process.memoryUsage().rss / Math.pow(1024, 2), " MB");
    var pid = process.pid;
    return {
        argvs: argvs,
        osPlatform: platform,
        nodeVer: nodeVer,
        projectFolder: projectFolder,
        execPath: execPath,
        rss: rss,
        pid: pid,
    };
};
exports.getProcessInfo = getProcessInfo;
process.on('message', function () {
    var info = (0, exports.getProcessInfo)();
    process.send && process.send(info);
});
//# sourceMappingURL=processInfo.js.map