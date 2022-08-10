"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersDao = exports.UserDao = void 0;
const container_mongo_1 = __importDefault(require("../containers/container-mongo"));
const parsers_1 = require("../utils/parsers");
const user_1 = require("../models/user");
class UserDao {
    container = new container_mongo_1.default(user_1.usersModel);
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
        return await this.container.find('*') || [];
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
exports.UserDao = UserDao;
exports.usersDao = new UserDao();
