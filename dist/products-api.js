"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const multer = require("multer");
const container_1 = require("./container");
const product_1 = require("./product");
class ProductsAPI {
    router = express.Router();
    container;
    constructor(container) {
        this.container = container || new container_1.Container('./data/products.json');
        this.initRoutes();
    }
    initRoutes() {
        this.getProducts();
        this.getProductsById();
        this.postProduct();
        this.deleteProductById();
        this.putProductById();
    }
    getProducts() {
        this.router.get('/productos', async (req, res) => {
            const prods = await this.container.getAll();
            res.json(prods);
        });
    }
    getProductsById() {
        this.router.get('/productos/:id', async (req, res) => {
            const prodID = parseInt(req.params.id);
            if (isNaN(prodID))
                return res.send('ID must be an integer number');
            const prod = await this.container.getbyId(prodID);
            if (!prod)
                return res.status(404).send('404: Product not found');
            res.json(prod);
        });
    }
    postProduct() {
        const upload = multer();
        this.router.post('/productos', upload.none(), async (req, res) => {
            const newProd = product_1.Product.parseProduct(req.body);
            if (!newProd)
                return res.status(400).send('400: Error parsing product, malformed request body');
            await this.container.save(newProd);
            res.status(201).send(`201: Product created succesfully: ${JSON.stringify(newProd)}`);
        });
    }
    deleteProductById() {
        this.router.delete('/productos/:id', async (req, res) => {
            const prodID = parseInt(req.params.id);
            if (isNaN(prodID))
                return res.send('ID must be an integer number');
            const success = await this.container.deleteById(prodID);
            if (success == null)
                return res.status(400).send('400: Error while deleting product');
            res.status(200).send('200: Product deleted succesfully');
        });
    }
    putProductById() {
        this.router.put('/productos/:id', async (req, res) => {
            const prodID = parseInt(req.params.id);
            if (isNaN(prodID))
                return res.send('ID must be an integer number');
            const newProd = product_1.Product.parseProduct(req.body);
            if (!newProd)
                return res.status(400).send('400: Error parsing product, malformed request body');
            const success = await this.container.updateById(prodID, newProd);
            if (success == null)
                return res.status(400).send('400: Error while updating product');
            res.status(200).send('200: Product updated succesfully');
        });
    }
}
exports.default = ProductsAPI;
