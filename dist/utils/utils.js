"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importGqlSchema = exports.validateEmail = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const graphql_1 = require("graphql");
const paths_1 = require("./paths");
const validateEmail = (email) => {
    const regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regex.test(email);
};
exports.validateEmail = validateEmail;
const importGqlSchema = (schema) => {
    const schemaString = fs_1.default
        .readFileSync(path_1.default.join(paths_1.baseDirLocal, 'gql', schema))
        .toString();
    const schemaCompiled = (0, graphql_1.buildSchema)(schemaString);
    return schemaCompiled;
};
exports.importGqlSchema = importGqlSchema;
