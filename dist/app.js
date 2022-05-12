"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const container_1 = require("./container");
const PORT = 8080;
const app = express();
const container = new container_1.Container('./data/products.json');
app.get('/productos', async (req, res) => {
    const prods = await container.getAll();
    res.send(prods);
});
app.get('/productoRandom', async (req, res) => {
    const prods = await container.getAll();
    const rand = Math.floor(Math.random() * prods.length);
    const randomProd = prods[rand];
    res.send(randomProd);
});
const fillMockData = async () => {
    await container.deleteAll();
    await container.save({ name: 'shirt', price: 10 });
    await container.save({ name: 'jeans', price: 20 });
    await container.save({ name: 'shoes', price: 30 });
    await container.save({ name: 'hat', price: 25 });
    await container.save({ name: 'glasses', price: 15 });
    await container.save({ name: 'shorts', price: 20 });
    await container.save({ name: 'socks', price: 2 });
};
fillMockData();
// listen ====================================================================//
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}/`);
});
