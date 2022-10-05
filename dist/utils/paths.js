"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsViewDir = exports.signupViewDir = exports.logoutViewDir = exports.loginViewDir = exports.chatViewDir = exports.cartViewDir = exports.errorViewDir = exports.indexViewDir = exports.pagesViewDir = exports.uploadsDirLocal = exports.publicDirLocal = exports.viewsDirLocal = exports.baseDirLocal = exports.logsDirLocal = void 0;
var path_1 = __importDefault(require("path"));
exports.logsDirLocal = path_1.default.join(process.cwd(), 'logs');
exports.baseDirLocal = path_1.default.join(__dirname, '..', '..');
exports.viewsDirLocal = path_1.default.join(exports.baseDirLocal, 'views');
exports.publicDirLocal = path_1.default.join(exports.baseDirLocal, 'public');
exports.uploadsDirLocal = path_1.default.join(exports.publicDirLocal, 'uploads');
exports.pagesViewDir = 'pages';
exports.indexViewDir = path_1.default.join(exports.pagesViewDir, 'index.ejs');
exports.errorViewDir = path_1.default.join(exports.pagesViewDir, 'error.ejs');
exports.cartViewDir = path_1.default.join(exports.pagesViewDir, 'cart.ejs');
exports.chatViewDir = path_1.default.join(exports.pagesViewDir, 'chat.ejs');
exports.loginViewDir = path_1.default.join(exports.pagesViewDir, 'login.ejs');
exports.logoutViewDir = path_1.default.join(exports.pagesViewDir, 'logout.ejs');
exports.signupViewDir = path_1.default.join(exports.pagesViewDir, 'signup.ejs');
exports.productsViewDir = path_1.default.join(exports.pagesViewDir, 'products.ejs');
//# sourceMappingURL=paths.js.map