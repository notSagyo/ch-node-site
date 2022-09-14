"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const container_mongo_1 = __importDefault(require("../../containers/container-mongo"));
const parsers_1 = require("../../utils/parsers");
const user_model_1 = require("./user-model");
class UsersDao {
    static dao = new UsersDao();
    container = new container_mongo_1.default(user_model_1.usersModel);
    constructor() {
        return UsersDao.dao;
    }
    async save(user) {
        const parsedUser = (0, parsers_1.parseUser)(user);
        if (parsedUser != null)
            return await this.container.insert(parsedUser);
        return false;
    }
    async getById(id) {
        const res = await this.container.find({ id });
        const user = res ? res[0] : null;
        return user;
    }
    async getByEmail(email) {
        const res = await this.container.find({ email });
        const user = res ? res[0] : null;
        return user;
    }
    async getAll() {
        return (await this.container.find('*')) || [];
    }
    async updateById(id, data) {
        return await this.container.update({ id }, data);
    }
    async deleteById(id) {
        return await this.container.delete({ id });
    }
    async deleteAll() {
        return await this.container.delete('*');
    }
}
exports.default = UsersDao;
