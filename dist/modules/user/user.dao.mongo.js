"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const container_mongo_1 = __importDefault(require("../../containers/container-mongo"));
const user_1 = __importDefault(require("./user"));
const user_model_1 = require("./user.model");
class UserDao {
    static dao = new UserDao();
    container = new container_mongo_1.default(user_model_1.usersModel);
    constructor() {
        return UserDao.dao;
    }
    async save(user) {
        const dto = user.toDto();
        return await this.container.insert(dto);
    }
    async getById(id) {
        const res = await this.container.find({ id });
        const product = res[0] ? user_1.default.fromDto(res[0]) : null;
        return product;
    }
    async getByEmail(email) {
        const res = await this.container.find({ email });
        const user = res[0] ? user_1.default.fromDto(res[0]) : null;
        return user;
    }
    async getAll() {
        const usersDto = (await this.container.find('*')) || [];
        const users = usersDto.map((u) => user_1.default.fromDto(u));
        return users;
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
exports.default = UserDao;
