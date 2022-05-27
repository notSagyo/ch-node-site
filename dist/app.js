"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const products_api_1 = require("./products-api");
// INIT ======================================================================//
const PORT = 8080;
const app = express();
const productsApi = new products_api_1.default();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', productsApi.router);
app.use(express.static('public'));
// listen ====================================================================//
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}/`);
});
