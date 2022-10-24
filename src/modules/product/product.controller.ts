import { faker } from '@faker-js/faker';
import express from 'express';
import _ from 'lodash';
import { ProductDto } from '../../types/dtos';
import { logger } from '../../utils/logger';
import { NotFoundError, NullError } from '../error/errors';
import { HttpErrorHandler } from '../error/http-error-handler';
import productService from './product.service';

class ProductController {
  async getProducts(req: express.Request, res: express.Response) {
    const prods = await productService.getAllProducts();
    if (prods.length < 1) logger.warn('Empty products list');
    res.json(prods);
  }

  async getProductsById(req: express.Request, res: express.Response) {
    const prodId = req.params.prodId;
    const prod = await productService.getProductById(prodId);

    if (prod == null)
      return new HttpErrorHandler(res)
        .handleError(new NotFoundError('Product not found:'), prodId)
        .send();

    res.json(prod);
  }

  async postProduct(req: express.Request, res: express.Response) {
    await productService.createProduct(req.body);
    res.status(201).redirect('/productos');
  }

  async deleteProductById(req: express.Request, res: express.Response) {
    const prodId = req.params.prodId;
    const success = await productService.deleteProductById(prodId);

    if (success == false)
      return new HttpErrorHandler(res)
        .handleError(new Error('Error deleting product:'), prodId)
        .send();

    res.status(200).send('[200]: Product deleted succesfully');
  }

  async deleteAllProducts(req: express.Request, res: express.Response) {
    const success = await productService.deleteAllProducts();

    if (success == false)
      return new HttpErrorHandler(res)
        .handleError(new Error('Error deleting all products'))
        .send();

    res.status(200).send('[200]: All products deleted succesfully');
  }

  async putProductById(req: express.Request, res: express.Response) {
    const prodId = req.params.prodId;
    const newProd = req.body;
    const httpErrorHandler = new HttpErrorHandler(res, newProd);
    let success = false;

    try {
      if (newProd == null || _.isEmpty(req.body))
        throw new NullError('Empty body:');
      success = await productService.updateProductById(prodId, newProd);
      if (success == false) throw new Error('Error while updating product:');
    } catch (error) {
      if (error instanceof Error)
        return httpErrorHandler.handleError(error).send();
    }

    res.status(200).send('[200]: Product updated succesfully');
  }

  productsTest(req: express.Request, res: express.Response) {
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
  }
}

const productController = new ProductController();
export default productController;
