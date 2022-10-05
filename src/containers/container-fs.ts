import fs from 'fs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class Container<T extends Record<string, any>> {
  path = './data/output.json';

  constructor(filePath: string) {
    this.path = filePath;
  }

  async save(obj: T) {
    let file: string;
    let newId: string;

    try {
      const exists = fs.existsSync(this.path);
      file = exists ? await fs.promises.readFile(this.path, 'utf-8') : '';
      file = file && file.length > 0 ? file : '[]';

      const parsedFile = JSON.parse(file);
      newId = parsedFile[parsedFile.length - 1]?.id + 1 || 0;

      parsedFile.push({ ...obj, id: newId });
      file = JSON.stringify(parsedFile, null, 2);

      await fs.promises.writeFile(this.path, file);
    } catch (err) {
      console.error(err);
      return null;
    }

    return newId;
  }

  async getbyId(id: string) {
    try {
      const file = await fs.promises.readFile(this.path, 'utf-8');
      const parsedFile = JSON.parse(file);
      const result = parsedFile.find((item: T) => item.id === id);
      return result as T;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async getAll() {
    try {
      const file = await fs.promises.readFile(this.path, 'utf-8');
      const parsedFile = file.length > 0 ? (JSON.parse(file) as T[]) : [];
      return parsedFile;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async updateById(id: string, obj: T) {
    obj = { ...obj, id };
    try {
      const file = await fs.promises.readFile(this.path, 'utf-8');
      const parsedFile = JSON.parse(file);

      const objIndex = parsedFile.findIndex((item: T) => item.id === id);
      if (objIndex !== -1) parsedFile[objIndex] = obj;
      else parsedFile.push(obj);

      const newFile = JSON.stringify(parsedFile, null, 2);
      await fs.promises.writeFile(this.path, newFile);
      return id;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async deleteById(id: string) {
    try {
      const file = await fs.promises.readFile(this.path, 'utf-8');
      const parsedFile = JSON.parse(file);

      const objIndex = parsedFile.findIndex((item: T) => item.id === id);
      if (objIndex === -1) throw Error('404: Not found');

      parsedFile.splice(objIndex, 1);
      const newFile = JSON.stringify(parsedFile, null, 2);
      await fs.promises.writeFile(this.path, newFile);
      return id;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async deleteAll() {
    try {
      fs.promises.writeFile(this.path, '');
      return true;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
