'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const fs = require('fs');
class Container {
  name = 'output';
  constructor(name) {
    this.name = name;
  }
  save(obj) {
    const exists = fs.existsSync(this.name);
    let file;
    let id;
    try {
      file = exists ? fs.readFileSync(this.name, 'utf-8') : '';
      file = file && file.length > 0 ? file : '[]';
      const parsedFile = JSON.parse(file);
      id = parsedFile[parsedFile.length - 1]?.id + 1 || 0;
      parsedFile.push({ id, ...obj });
      file = JSON.stringify(parsedFile, null, 2);
      fs.writeFileSync(this.name, file);
    }
    catch (err) {
      console.error(err);
      return null;
    }
    return id;
  }
  getbyId(id) {
    try {
      const file = fs.readFileSync(this.name, 'utf-8');
      const parsedFile = JSON.parse(file);
      const result = parsedFile.find((item) => item.id === id);
      return result;
    }
    catch (err) {
      console.error(err);
      return null;
    }
  }
  getAll() {
    try {
      const file = fs.readFileSync(this.name, 'utf-8');
      const parsedFile = JSON.parse(file);
      return parsedFile;
    }
    catch (err) {
      console.error(err);
      return null;
    }
  }
  deleteById(id) {
    try {
      const file = fs.readFileSync(this.name, 'utf-8');
      const parsedFile = JSON.parse(file);
      const objIndex = parsedFile.findIndex((item) => item.id === id);
      parsedFile.splice(objIndex, 1);
      const newFile = JSON.stringify(parsedFile, null, 2);
      fs.writeFileSync(this.name, newFile);
    }
    catch (err) {
      console.error(err);
    }
  }
  async deleteAll() {
    try {
      fs.writeFileSync(this.name, '');
    }
    catch (err) {
      console.error(err);
    }
  }
}
// Test Methods ==============================================================//
const cats = new Container('cats.json');
cats.deleteAll();
// Fill the file with some data
cats.save({ breed: 'Siamese', age: 3 });
cats.save({ breed: 'Sphynx', age: 1 });
cats.save({ breed: 'Egyptian', age: 4 });
cats.save({ breed: 'Persian', age: 7 });
cats.save({ breed: 'Savannah', age: 2 });
console.log('Cat ID[0]:', cats.getbyId(0));
console.log('All cats:', cats.getAll());
cats.deleteById(0);
console.log('After delete ID[0]:', cats.getAll());
