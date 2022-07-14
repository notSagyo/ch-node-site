import express from 'express';
import { parseProduct } from '../utils/parsers';
import { authn, authz } from '../middlewares/auth';
import Container from '../containers/container-knex';
import { iProduct } from '../types/models';
import { maridadbOptions as mariadbOptions } from '../settings/mariadb';
import { iRouter } from '../types/types';

export default class ProductsRouter implements iRouter {
  router = express.Router();
  apiRouter = express.Router();
  table: Container<iProduct>;
  productsHtmlPath: string;

  constructor(productsHtmlPath: string) {
    this.productsHtmlPath = productsHtmlPath;
    this.initRoutes();
    this.table = new Container<iProduct>(mariadbOptions.connection.database, 'products', mariadbOptions);
    this.table.createTable(table => {
      table.increments('id').primary();
      table.string('name');
      table.integer('price');
      table.string('thumbnail');
      table.string('description');
    });
  }

  initRoutes() {
    // Router
    this.getProductsPage();

    // API Router
    this.getProducts();
    this.getProductsById();
    this.postProduct();
    this.deleteProductById();
    this.putProductById();
  }

  private getProductsPage() {
    this.router.get('/', async (req, res) => {
      const prods = await this.table.find({});
      res.render(this.productsHtmlPath, { productList: prods, user: req.session.user });
    });
  }

  private getProducts() {
    this.apiRouter.get('/', async (req, res) => {
      const prods = await this.table.find({});
      res.json(prods);
    });
  }

  private getProductsById() {
    this.apiRouter.get('/:id', async (req, res) => {
      const prodID = parseInt(req.params.id);
      if (isNaN(prodID)) return res.send('ID must be an integer number');

      const prod = await this.table.find(['id', '=', prodID]);
      if (!prod) return res.status(404).send('404: Product not found');

      res.json(prod);
    });
  }

  private postProduct() {
    this.apiRouter.post('/', authn, authz, async (req, res) => {
      const newProd = parseProduct(req.body);

      if (!newProd)
        return res.status(400).send('400: Error parsing product, malformed request body');

      await this.table.insert(newProd);
      res.status(201).redirect('/productos');
    });
  }

  private deleteProductById() {
    this.apiRouter.delete('/:id', authn, authz, async (req, res) => {
      const prodID = parseInt(req.params.id);
      if (isNaN(prodID)) return res.send('ID must be an integer number');

      const success = await this.table.delete(['id', '=', prodID]);
      if (success == null)
        return res.status(400).send('400: Error while deleting product');
      res.status(200).send('200: Product deleted succesfully');
    });
  }

  private putProductById() {
    this.apiRouter.put('/:id', authn, authz, async (req, res) => {
      const prodID = parseInt(req.params.id);
      if (isNaN(prodID)) return res.send('ID must be an integer number');

      const newProd = parseProduct(req.body);
      if (!newProd)
        return res.status(400).send('400: Error parsing product, malformed request body');

      const success = await this.table.update(['id', '=', prodID], newProd);
      if (success == null)
        return res.status(400).send('400: Error while updating product');
      res.status(200).send('200: Product updated succesfully');
    });
  }
}
