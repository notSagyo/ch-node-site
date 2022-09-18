import { faker } from '@faker-js/faker';
import express from 'express';
import { ejsDefaultData } from '../../config/ejs';
import { authz } from '../../middlewares/auth';
import { ProductDto } from '../../types/dtos';
import { IRouter } from '../../types/types';
import { logger } from '../../utils/logger';
import { parseProduct } from '../../utils/parsers';
import ProductDao from './product.dao';

export default class ProductRouter implements IRouter {
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
      const prods = await ProductDao.dao.getAll();
      res.render(this.productsHtmlPath, {
        ...ejsDefaultData,
        productList: prods,
      });
    });
  }

  private getProducts() {
    this.apiRouter.get('/', async (req, res) => {
      const prods = await ProductDao.dao.getAll();
      if (prods.length < 1) logger.warn('Empty products list');
      res.json(prods);
    });
  }

  private getProductsById() {
    this.apiRouter.get('/:id', async (req, res) => {
      const prodId = req.params.id;
      const prod = await ProductDao.dao.getById(prodId);

      if (prod == null) {
        const msg = `Product with ID=${prodId} not found`;
        logger.error(msg);
        return res.status(404).send(`404: ${msg}`);
      }

      res.json(prod);
    });
  }

  private postProduct() {
    this.apiRouter.post('/', authz, async (req, res) => {
      const newProd = parseProduct(req.body);

      if (newProd == null) {
        const msg = '400: Error parsing product, malformed request body';
        logger.error(msg);
        return res.status(400).send(`400: ${msg}`);
      }

      await ProductDao.dao.save(newProd);
      res.status(201).redirect('/productos');
    });
  }

  private deleteProductById() {
    this.apiRouter.delete('/:id', authz, async (req, res) => {
      const prodId = req.params.id;
      const success = await ProductDao.dao.deleteById(prodId);

      if (success == false) {
        const msg = 'Error while deleting product';
        logger.error(msg);
        return res.status(400).send(`400: ${msg}`);
      }

      res.status(200).send('200: Product deleted succesfully');
    });
  }

  private putProductById() {
    this.apiRouter.put('/:id', authz, async (req, res) => {
      const prodId = req.params.id;
      const newProd = parseProduct(req.body);

      if (newProd == null) {
        const msg = 'Error parsing product, malformed request body';
        logger.error(msg);
        return res.status(400).send(`400: ${msg}`);
      }

      let success = false;
      const exists = (await ProductDao.dao.getById(prodId)) != null;
      if (exists) success = await ProductDao.dao.updateById(prodId, newProd);
      else success = await ProductDao.dao.save(newProd);

      if (success == false) {
        const msg = 'Error while updating product';
        logger.error(msg);
        return res.status(400).send(`400: ${msg}`);
      }

      res.status(200).send('200: Product updated succesfully');
    });
  }

  private productsTest() {
    this.testRouter.get('/productos-test', async (req, res) => {
      const products: ProductDto[] = [];
      for (let i = 0; i < 5; i++) {
        const prod: ProductDto = {
          id: '0',
          name: faker.commerce.product(),
          price: Number(faker.commerce.price()),
          description: faker.commerce.productDescription(),
          thumbnail: faker.image.abstract(),
        };
        products.push(prod);
      }
      res.status(200).json(products);
    });
  }
}
