"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadsDirLocal = exports.publicDirLocal = exports.baseDirLocal = void 0;
const path_1 = __importDefault(require("path"));
exports.baseDirLocal = path_1.default.join(__dirname, '..', '..');
exports.publicDirLocal = path_1.default.join(exports.baseDirLocal, 'public');
exports.uploadsDirLocal = path_1.default.join(exports.publicDirLocal, 'uploads');
