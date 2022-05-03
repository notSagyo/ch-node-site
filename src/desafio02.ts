import * as fs from 'fs';

class Container {
  name = 'output';

  constructor(name: string) {
    this.name = name;
  }

  async save(obj: Record<string, unknown>) {
    const exists = fs.existsSync(this.name);
    let file: string;
    let id: number;

    try {
      file = exists ? await fs.promises.readFile(this.name, 'utf-8') : '';
      file = file && file.length > 0 ? file : '[]';

      const parsedFile = JSON.parse(file);
      id = parsedFile[parsedFile.length - 1]?.id + 1 || 0;

      parsedFile.push({ id, ...obj });
      file = JSON.stringify(parsedFile, null, 2);

      await fs.promises.writeFile(this.name, file);
    } catch (err) {
      console.error(err);
      return null;
    }

    return id;
  }

  async getbyId(id: number) {
    try {
      const file = await fs.promises.readFile(this.name, 'utf-8');
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
      const file = await fs.promises.readFile(this.name, 'utf-8');
      const parsedFile = JSON.parse(file);
      return parsedFile;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async deleteById(id: number) {
    try {
      const file = await fs.promises.readFile(this.name, 'utf-8');
      const parsedFile = JSON.parse(file);
      const objIndex = parsedFile.findIndex((item: Record<string, unknown>) => item.id === id);
      parsedFile.splice(objIndex, 1);
      const newFile = JSON.stringify(parsedFile, null, 2);
      await fs.promises.writeFile(this.name, newFile);
    } catch (err) {
      console.error(err);
    }
  }

  async deleteAll() {
    try { fs.promises.writeFile(this.name, ''); }
    catch (err) { console.error(err); }
  }
}

// Test Methods ==============================================================//
(async () => {
  const cats = new Container('cats.txt');
  cats.deleteAll();

  // Fill the file with some data
  await cats.save({ breed: 'Siamese', age: 3, thumbnail: 'http://placekitten.com/300/300' });
  await cats.save({ breed: 'Sphynx', age: 1, thumbnail: 'http://placekitten.com/301/301' });
  await cats.save({ breed: 'Egyptian', age: 4, thumbnail: 'http://placekitten.com/299/299' });
  await cats.save({ breed: 'Persian', age: 7, thumbnail: 'http://placekitten.com/300/301' });
  await cats.save({ breed: 'Savannah', age: 2, thumbnail: 'http://placekitten.com/301/300'});

  await cats.getbyId(0).then((cat) => console.log('Cat ID[0]:', cat));
  await cats.getAll().then((allCats) => console.log('All cats:', allCats));

  await cats.deleteById(0);
  cats.getAll().then((allCats) => console.log('All cats after delete ID[0]:', allCats));
})();
