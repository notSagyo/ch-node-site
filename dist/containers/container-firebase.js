"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var firestore_1 = require("@firebase/firestore");
var firebase_1 = require("../settings/firebase");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var Container = /** @class */ (function () {
    function Container(collectionName) {
        Object.defineProperty(this, "collectionRef", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.collectionRef = (0, firestore_1.collection)(firebase_1.db, collectionName);
    }
    Object.defineProperty(Container.prototype, "insert", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var success, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            success = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, (0, firestore_1.addDoc)(this.collectionRef, data)];
                        case 2:
                            _a.sent();
                            success = true;
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _a.sent();
                            console.error(err_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/, success];
                    }
                });
            });
        }
    });
    Object.defineProperty(Container.prototype, "find", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (filter) {
            return __awaiter(this, void 0, void 0, function () {
                var res, q, qSnapshot, err_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            res = null;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            q = filter === '*'
                                ? this.collectionRef
                                : (0, firestore_1.query)(this.collectionRef, filter);
                            return [4 /*yield*/, (0, firestore_1.getDocs)(q)];
                        case 2:
                            qSnapshot = _a.sent();
                            res = qSnapshot.docs.map(function (docSnap) { return docSnap.data(); });
                            return [3 /*break*/, 4];
                        case 3:
                            err_2 = _a.sent();
                            console.error(err_2);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/, res];
                    }
                });
            });
        }
    });
    Object.defineProperty(Container.prototype, "update", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (filter, data) {
            return __awaiter(this, void 0, void 0, function () {
                var success, q, qSnapshot, allPromises, err_3;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            success = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            q = filter === '*'
                                ? this.collectionRef
                                : (0, firestore_1.query)(this.collectionRef, filter);
                            return [4 /*yield*/, (0, firestore_1.getDocs)(q)];
                        case 2:
                            qSnapshot = _a.sent();
                            allPromises = qSnapshot.docs.map(function (docSnap) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, (0, firestore_1.updateDoc)(docSnap.ref, data)];
                            }); }); });
                            return [4 /*yield*/, Promise.all(allPromises)];
                        case 3:
                            _a.sent();
                            success = true;
                            return [3 /*break*/, 5];
                        case 4:
                            err_3 = _a.sent();
                            console.error(err_3);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/, success];
                    }
                });
            });
        }
    });
    Object.defineProperty(Container.prototype, "delete", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (filter) {
            return __awaiter(this, void 0, void 0, function () {
                var success, q, qSnapshot, allPromises, err_4;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            success = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            q = filter === '*'
                                ? this.collectionRef
                                : (0, firestore_1.query)(this.collectionRef, filter);
                            return [4 /*yield*/, (0, firestore_1.getDocs)(q)];
                        case 2:
                            qSnapshot = _a.sent();
                            allPromises = qSnapshot.docs.map(function (docSnap) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, (0, firestore_1.deleteDoc)(docSnap.ref)];
                            }); }); });
                            return [4 /*yield*/, Promise.all(allPromises)];
                        case 3:
                            _a.sent();
                            success = true;
                            return [3 /*break*/, 5];
                        case 4:
                            err_4 = _a.sent();
                            console.error(err_4);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/, success];
                    }
                });
            });
        }
    });
    return Container;
}());
exports.default = Container;
