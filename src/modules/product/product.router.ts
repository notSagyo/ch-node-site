import express from 'express';
import { ejsDefaultData } from '../../config/ejs';
import { authz } from '../../middlewares/auth';
import { productSocket } from '../../middlewares/sockets';
import { IRouter } from '../../types/types';
import productController from './product.controller';
import { gqlMiddleware } from './product.resolver';
import productService from './product.service';

// TODO: Uncomment authz (disabled for axios)
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
    this.graphql();
    this.getProducts();
    this.getProductsById();
    this.postProduct();
    this.deleteAllProducts();
    this.deleteProductById();
    this.putProductById();

    // API router with test data
    this.productsTest();
  }

  private graphql() {
    this.apiRouter.all('/graphql', gqlMiddleware);
  }

  private getProductsPage() {
    this.router.get('/', productSocket, async (req, res) => {
      const prods = await productService.getAllProducts();
      res.render(this.productsHtmlPath, {
        ...ejsDefaultData,
        productList: prods,
      });
    });
  }

  private getProducts() {
    this.apiRouter.get('/', async (req, res) => {
      productController.getProducts(req, res);
    });
  }

  private getProductsById() {
    this.apiRouter.get('/:prodId', async (req, res) => {
      productController.getProductsById(req, res);
    });
  }

  private postProduct() {
    this.apiRouter.post('/', authz, async (req, res) => {
      productController.postProduct(req, res);
    });
  }

  private deleteProductById() {
    this.apiRouter.delete('/:prodId', authz, async (req, res) => {
      productController.deleteProductById(req, res);
    });
  }

  private deleteAllProducts() {
    this.apiRouter.delete('/', authz, async (req, res) => {
      productController.deleteAllProducts(req, res);
    });
  }

  private putProductById() {
    this.apiRouter.put('/:prodId', authz, async (req, res) => {
      productController.getProductsById(req, res);
    });
  }

  private productsTest() {
    this.testRouter.get('/productos-test', async (req, res) => {
      productController.productsTest(req, res);
    });
  }
}
