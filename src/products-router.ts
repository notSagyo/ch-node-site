import * as express from 'express';
import * as multer from 'multer';
import { Product } from './product';
import ProductContainer from './product-container';

export default class ProductsRouter {
  router = express.Router();
  container: ProductContainer;
  htmlPath: string;

  constructor(container: ProductContainer, productsHtmlPath: string) {
    this.container = container;
    this.htmlPath = productsHtmlPath;
    this.initRoutes();
  }

  initRoutes() {
    this.getProducts();
    this.getProductsById();
    this.postProduct();
    this.deleteProductById();
    this.putProductById();
  }

  private getProducts() {
    this.router.get('/', async (req, res) => {
      const prods = await this.container.getAll();
      res.render(this.htmlPath, { productList: prods });
    });
  }

  private getProductsById() {
    this.router.get('/:id', async (req, res) => {
      const prodID = parseInt(req.params.id);
      if (isNaN(prodID)) return res.send('ID must be an integer number');

      const prod = await this.container.getbyId(prodID);
      if (!prod) return res.status(404).send('404: Product not found');

      res.json(prod);
    });
  }

  private postProduct() {
    const upload = multer();
    this.router.post('/', upload.none(), async (req, res) => {
      const newProd = Product.parseProduct(req.body);

      if (!newProd)
        return res.status(400).send('400: Error parsing product, malformed request body');

      await this.container.save(newProd);
      res.status(201).redirect('/productos');
    });
  }

  private deleteProductById() {
    this.router.delete('/:id', async (req, res) => {
      const prodID = parseInt(req.params.id);
      if (isNaN(prodID)) return res.send('ID must be an integer number');

      const success = await this.container.deleteById(prodID);
      if (success == null)
        return res.status(400).send('400: Error while deleting product');
      res.status(200).send('200: Product deleted succesfully');
    });
  }

  private putProductById() {
    this.router.put('/:id', async (req, res) => {
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
