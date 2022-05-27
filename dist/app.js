"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const products_router_1 = require("./products-router");
// INIT ======================================================================//
const PORT = 8080;
const app = express();
const productsRouter = new products_router_1.default();
const baseDir = path.join(__dirname, '..');
app.set('view engine', 'ejs');
app.set('views', path.join(baseDir, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/productos', productsRouter.router);
app.use(express.static(path.join(baseDir, 'public')));
app.get('/', (req, res) => {
    res.render('pages/index.ejs');
});
// Listen ====================================================================//
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}/`);
});
