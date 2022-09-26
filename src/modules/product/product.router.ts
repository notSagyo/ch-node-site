import express from 'express';
import { ejsDefaultData } from '../../config/ejs';
import { productSocket } from '../../middlewares/sockets';
import { IRouter } from '../../types/types';
import productControllerRest from './product.controller.rest';
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
    this.getProducts();
    this.getProductsById();
    this.postProduct();
    this.deleteAllProducts();
    this.deleteProductById();
    this.putProductById();

    // API router with test data
    this.productsTest();
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
      productControllerRest.getProducts(req, res);
    });
  }

  private getProductsById() {
    this.apiRouter.get('/:prodId', async (req, res) => {
      productControllerRest.getProductsById(req, res);
    });
  }

  private postProduct() {
    this.apiRouter.post('/', /* authz, */ async (req, res) => {
      productControllerRest.postProduct(req, res);
    });
  }

  private deleteProductById() {
    this.apiRouter.delete('/:prodId', /* authz, */ async (req, res) => {
      productControllerRest.deleteProductById(req, res);
    });
  }

  private deleteAllProducts() {
    this.apiRouter.delete('/', /* authz, */ async (req, res) => {
      productControllerRest.deleteAllProducts(req, res);
    });
  }

  private putProductById() {
    this.apiRouter.put('/:prodId', /* authz, */ async (req, res) => {
      productControllerRest.getProductsById(req, res);
    });
  }

  private productsTest() {
    this.testRouter.get('/productos-test', async (req, res) => {
      productControllerRest.productsTest(req, res);
    });
  }
}
