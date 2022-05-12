import * as fs from 'fs';

export class Container {
  path = 'output';

  constructor(name: string) {
    this.path = name;
  }

  async save(obj: Record<string, unknown>) {
    let file: string;
    let id: number;

    try {
      const exists = fs.existsSync(this.path);
      file = exists ? await fs.promises.readFile(this.path, 'utf-8') : '';
      file = file && file.length > 0 ? file : '[]';

      const parsedFile = JSON.parse(file);
      id = parsedFile[parsedFile.length - 1]?.id + 1 || 0;

      parsedFile.push({ id, ...obj });
      file = JSON.stringify(parsedFile, null, 2);

      await fs.promises.writeFile(this.path, file);
    } catch (err) {
      console.error(err);
      return null;
    }

    return id;
  }

  async getbyId(id: number) {
    try {
      const file = await fs.promises.readFile(this.path, 'utf-8');
      const parsedFile = JSON.parse(file);
      const result = parsedFile.find((item: Record<string, unknown>) => item.id === id);
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async getAll() {
    try {
      const file = await fs.promises.readFile(this.path, 'utf-8');
      const parsedFile = JSON.parse(file) as Record<string, unknown>[];
      return parsedFile;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async deleteById(id: number) {
    try {
      const file = await fs.promises.readFile(this.path, 'utf-8');
      const parsedFile = JSON.parse(file);
      const objIndex = parsedFile.findIndex((item: Record<string, unknown>) => item.id === id);
      parsedFile.splice(objIndex, 1);
      const newFile = JSON.stringify(parsedFile, null, 2);
      await fs.promises.writeFile(this.path, newFile);
    } catch (err) {
      console.error(err);
    }
  }

  async deleteAll() {
    try { fs.promises.writeFile(this.path, ''); }
    catch (err) { console.error(err); }
  }
}
