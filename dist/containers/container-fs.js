"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var Container = (function () {
    function Container(filePath) {
        this.path = './data/output.json';
        this.path = filePath;
    }
    Container.prototype.save = function (obj) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var file, newId, exists, _b, parsedFile, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        exists = fs_1.default.existsSync(this.path);
                        if (!exists) return [3, 2];
                        return [4, fs_1.default.promises.readFile(this.path, 'utf-8')];
                    case 1:
                        _b = _c.sent();
                        return [3, 3];
                    case 2:
                        _b = '';
                        _c.label = 3;
                    case 3:
                        file = _b;
                        file = file && file.length > 0 ? file : '[]';
                        parsedFile = JSON.parse(file);
                        newId = ((_a = parsedFile[parsedFile.length - 1]) === null || _a === void 0 ? void 0 : _a.id) + 1 || 0;
                        parsedFile.push(__assign(__assign({}, obj), { id: newId }));
                        file = JSON.stringify(parsedFile, null, 2);
                        return [4, fs_1.default.promises.writeFile(this.path, file)];
                    case 4:
                        _c.sent();
                        return [3, 6];
                    case 5:
                        err_1 = _c.sent();
                        console.error(err_1);
                        return [2, null];
                    case 6: return [2, newId];
                }
            });
        });
    };
    Container.prototype.getbyId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var file, parsedFile, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, fs_1.default.promises.readFile(this.path, 'utf-8')];
                    case 1:
                        file = _a.sent();
                        parsedFile = JSON.parse(file);
                        result = parsedFile.find(function (item) { return item.id === id; });
                        return [2, result];
                    case 2:
                        err_2 = _a.sent();
                        console.error(err_2);
                        return [2, null];
                    case 3: return [2];
                }
            });
        });
    };
    Container.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var file, parsedFile, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, fs_1.default.promises.readFile(this.path, 'utf-8')];
                    case 1:
                        file = _a.sent();
                        parsedFile = file.length > 0 ? JSON.parse(file) : [];
                        return [2, parsedFile];
                    case 2:
                        err_3 = _a.sent();
                        console.error(err_3);
                        return [2, []];
                    case 3: return [2];
                }
            });
        });
    };
    Container.prototype.updateById = function (id, obj) {
        return __awaiter(this, void 0, void 0, function () {
            var file, parsedFile, objIndex, newFile, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        obj = __assign(__assign({}, obj), { id: id });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4, fs_1.default.promises.readFile(this.path, 'utf-8')];
                    case 2:
                        file = _a.sent();
                        parsedFile = JSON.parse(file);
                        objIndex = parsedFile.findIndex(function (item) { return item.id === id; });
                        if (objIndex !== -1)
                            parsedFile[objIndex] = obj;
                        else
                            parsedFile.push(obj);
                        newFile = JSON.stringify(parsedFile, null, 2);
                        return [4, fs_1.default.promises.writeFile(this.path, newFile)];
                    case 3:
                        _a.sent();
                        return [2, id];
                    case 4:
                        err_4 = _a.sent();
                        console.error(err_4);
                        return [2, null];
                    case 5: return [2];
                }
            });
        });
    };
    Container.prototype.deleteById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var file, parsedFile, objIndex, newFile, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, fs_1.default.promises.readFile(this.path, 'utf-8')];
                    case 1:
                        file = _a.sent();
                        parsedFile = JSON.parse(file);
                        objIndex = parsedFile.findIndex(function (item) { return item.id === id; });
                        if (objIndex === -1)
                            throw Error('404: Not found');
                        parsedFile.splice(objIndex, 1);
                        newFile = JSON.stringify(parsedFile, null, 2);
                        return [4, fs_1.default.promises.writeFile(this.path, newFile)];
                    case 2:
                        _a.sent();
                        return [2, id];
                    case 3:
                        err_5 = _a.sent();
                        console.error(err_5);
                        return [2, null];
                    case 4: return [2];
                }
            });
        });
    };
    Container.prototype.deleteAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    fs_1.default.promises.writeFile(this.path, '');
                    return [2, true];
                }
                catch (err) {
                    console.error(err);
                    return [2, null];
                }
                return [2];
            });
        });
    };
    return Container;
}());
exports.default = Container;
//# sourceMappingURL=container-fs.js.map