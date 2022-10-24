"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importStar(require("./user"));
const user_dao_1 = __importDefault(require("./user.dao"));
class UserService {
    async createUser(userDto) {
        const user = user_1.default.fromDto(userDto);
        const success = await user_dao_1.default.dao.save(user);
        if (!success)
            throw new Error('User service: error saving userDto');
        return user;
    }
    async getAllUsers() {
        return await user_dao_1.default.dao.getAll();
    }
    async getUserById(userId) {
        return await user_dao_1.default.dao.getById(userId);
    }
    async getUserByEmail(userEmail) {
        return await user_dao_1.default.dao.getByEmail(userEmail);
    }
    async deleteUserById(userId) {
        return await user_dao_1.default.dao.deleteById(userId);
    }
    async deleteAllUsers() {
        return await user_dao_1.default.dao.deleteAll();
    }
    async updateUserById(userId, data) {
        let success = false;
        const exists = (await this.getUserById(userId)) != null;
        if (exists)
            success = await user_dao_1.default.dao.updateById(userId, data);
        else {
            const parsedUser = (0, user_1.parseUser)(data);
            if (parsedUser)
                success = await user_dao_1.default.dao.save(user_1.default.fromDto(parsedUser));
        }
        return success;
    }
}
const userService = new UserService();
exports.default = userService;
