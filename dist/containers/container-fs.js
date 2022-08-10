"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class Container {
    path = './data/output.json';
    constructor(filePath) {
        this.path = filePath;
    }
    async save(obj) {
        let file;
        let newId;
        try {
            const exists = fs_1.default.existsSync(this.path);
            file = exists ? await fs_1.default.promises.readFile(this.path, 'utf-8') : '';
            file = file && file.length > 0 ? file : '[]';
            const parsedFile = JSON.parse(file);
            newId = parsedFile[parsedFile.length - 1]?.id + 1 || 0;
            parsedFile.push({ ...obj, id: newId });
            file = JSON.stringify(parsedFile, null, 2);
            await fs_1.default.promises.writeFile(this.path, file);
        }
        catch (err) {
            console.error(err);
            return null;
        }
        return newId;
    }
    async getbyId(id) {
        try {
            const file = await fs_1.default.promises.readFile(this.path, 'utf-8');
            const parsedFile = JSON.parse(file);
            const result = parsedFile.find((item) => item.id === id);
            return result;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }
    async getAll() {
        try {
            const file = await fs_1.default.promises.readFile(this.path, 'utf-8');
            const parsedFile = file.length > 0 ? JSON.parse(file) : [];
            return parsedFile;
        }
        catch (err) {
            console.error(err);
            return [];
        }
    }
    async updateById(id, obj) {
        obj = { ...obj, id };
        try {
            const file = await fs_1.default.promises.readFile(this.path, 'utf-8');
            const parsedFile = JSON.parse(file);
            const objIndex = parsedFile.findIndex((item) => item.id === id);
            if (objIndex !== -1)
                parsedFile[objIndex] = obj;
            else
                parsedFile.push(obj);
            const newFile = JSON.stringify(parsedFile, null, 2);
            await fs_1.default.promises.writeFile(this.path, newFile);
            return id;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }
    async deleteById(id) {
        try {
            const file = await fs_1.default.promises.readFile(this.path, 'utf-8');
            const parsedFile = JSON.parse(file);
            const objIndex = parsedFile.findIndex((item) => item.id === id);
            if (objIndex === -1)
                throw Error('404: Not found');
            parsedFile.splice(objIndex, 1);
            const newFile = JSON.stringify(parsedFile, null, 2);
            await fs_1.default.promises.writeFile(this.path, newFile);
            return id;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }
    async deleteAll() {
        try {
            fs_1.default.promises.writeFile(this.path, '');
            return true;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }
}
exports.default = Container;
