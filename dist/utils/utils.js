"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importGqlSchema = exports.validateEmail = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var graphql_1 = require("graphql");
var validateEmail = function (email) {
    var regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regex.test(email);
};
exports.validateEmail = validateEmail;
var importGqlSchema = function () {
    var schemaPath = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        schemaPath[_i] = arguments[_i];
    }
    var schemaString = fs_1.default.readFileSync(path_1.default.join.apply(path_1.default, schemaPath)).toString();
    var schemaCompiled = (0, graphql_1.buildSchema)(schemaString);
    return schemaCompiled;
};
exports.importGqlSchema = importGqlSchema;
//# sourceMappingURL=utils.js.map