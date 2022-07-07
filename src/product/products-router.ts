import * as express from 'express';
import { faker } from '@faker-js/faker';
import { productsDao } from '../daos/productsDaoMongo';
import { authn, authz } from '../middlewares';
import { parseProduct } from '../product/product';
import { iProduct } from '../types';

export default class ProductsRouter {
  router = express.Router();
  apiRouter = express.Router();
  testRouter = express.Router();
  productsHtmlPath: string;

  constructor(productsHtmlPath: string) {
    this.productsHtmlPath = productsHtmlPath;
    this.initRoutes();
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

    // API router with test data
    this.productsTest();
  }

  private getProductsPage() {
    this.router.get('/', async (req, res) => {
      const prods = await productsDao.getAll();
      res.render(this.productsHtmlPath, { productList: prods });
    });
  }

  private getProducts() {
    this.apiRouter.get('/', async (req, res) => {
      const prods = await productsDao.getAll();
      res.json(prods);
    });
  }

  private getProductsById() {
    this.apiRouter.get('/:id', async (req, res) => {
      const prodId = req.params.id;
      const prod = await productsDao.getById(prodId);
      if (!prod) return res.status(404).send('404: Product not found');

      res.json(prod);
    });
  }

  private postProduct() {
    this.apiRouter.post('/', authn, authz, async (req, res) => {
      const newProd = parseProduct(req.body);

      if (!newProd)
        return res.status(400).send('400: Error parsing product, malformed request body');

      await productsDao.save(newProd);
      res.status(201).redirect('/productos');
    });
  }

  private deleteProductById() {
    this.apiRouter.delete('/:id', authn, authz, async (req, res) => {
      const prodId = req.params.id;
      const success = await productsDao.deleteById(prodId);
      if (success == null)
        return res.status(400).send('400: Error while deleting product');
      res.status(200).send('200: Product deleted succesfully');
    });
  }

  private putProductById() {
    this.apiRouter.put('/:id', authn, authz, async (req, res) => {
      const prodId = req.params.id;
      const newProd = parseProduct(req.body);
      if (!newProd)
        return res.status(400).send('400: Error parsing product, malformed request body');

      let success = false;
      const exists = await productsDao.getById(prodId) != null ? true : false;
      if (exists) success = await productsDao.updateById(prodId, newProd);
      else success = await productsDao.save(newProd);

      if (success == false)
        return res.status(400).send('400: Error while updating product');
      res.status(200).send('200: Product updated succesfully');
    });
  }

  private productsTest() {
    this.testRouter.get('/productos-test', async (req, res) => {
      const products: iProduct[] = [];
      for (let i = 0; i < 5; i++) {
        const prod: iProduct = {
          id: '0',
          name: faker.commerce.product(),
          price: Number(faker.commerce.price()),
          description: faker.commerce.productDescription(),
          thumbnail: faker.image.abstract()
        };
        products.push(prod);
      }
      res.status(200).json(products);
    });
  }
}
