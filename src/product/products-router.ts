import * as express from 'express';
import { authn, authz } from '../middlewares';
import Product from './product';
import ProductContainer from './product-container';

export default class ProductsRouter {
  router = express.Router();
  apiRouter = express.Router(); container: ProductContainer;
  productsHtmlPath: string;

  constructor(container: ProductContainer, productsHtmlPath: string) {
    this.container = container;
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
  }

  private getProductsPage() {
    this.router.get('/', async (req, res) => {
      const prods = await this.container.getAll();
      res.render(this.productsHtmlPath, { productList: prods });
    });
  }

  private getProducts() {
    this.apiRouter.get('/', async (req, res) => {
      const prods = await this.container.getAll();
      res.json(prods);
    });
  }

  private getProductsById() {
    this.apiRouter.get('/:id', async (req, res) => {
      const prodID = parseInt(req.params.id);
      if (isNaN(prodID)) return res.send('ID must be an integer number');

      const prod = await this.container.getbyId(prodID);
      if (!prod) return res.status(404).send('404: Product not found');

      res.json(prod);
    });
  }

  private postProduct() {
    this.apiRouter.post('/', authn, authz, async (req, res) => {
      const newProd = Product.parseProduct(req.body);

      if (!newProd)
        return res.status(400).send('400: Error parsing product, malformed request body');

      await this.container.save(newProd);
      res.status(201).redirect('/productos');
    });
  }

  private deleteProductById() {
    this.apiRouter.delete('/:id', authn, authz, async (req, res) => {
      const prodID = parseInt(req.params.id);
      if (isNaN(prodID)) return res.send('ID must be an integer number');

      const success = await this.container.deleteById(prodID);
      if (success == null)
        return res.status(400).send('400: Error while deleting product');
      res.status(200).send('200: Product deleted succesfully');
    });
  }

  private putProductById() {
    this.apiRouter.put('/:id', authn, authz, async (req, res) => {
      const prodID = parseInt(req.params.id);
      if (isNaN(prodID)) return res.send('ID must be an integer number');

      const newProd = Product.parseProduct(req.body);
      if (!newProd)
        return res.status(400).send('400: Error parsing product, malformed request body');

      const success = await this.container.updateById(prodID, newProd);
      if (success == null)
        return res.status(400).send('400: Error while updating product');
      res.status(200).send('200: Product updated succesfully');
    });
  }
}
