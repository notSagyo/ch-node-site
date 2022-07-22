import express from 'express';
import { cartsDao } from '../daos/carts-dao-knex';
import { ejsDefaultData } from '../settings/ejs';
import { iRouter } from '../types/types';

export default class CartRouter implements iRouter {
  router = express.Router();
  apiRouter = express.Router();
  cartHtmlPath: string;

  constructor(cartHtmlPath: string) {
    this.cartHtmlPath = cartHtmlPath;
    this.initRoutes();
  }

  initRoutes() {
    // Router
    this.getProductsPage();

    // API Router
    this.getCartProductsById();
    this.postCart();
    this.postCartProduct();
    this.deleteCartById();
    this.deleteCartProductById();
  }

  private getProductsPage() {
    this.router.get('/', async (req, res) => {
      res.render(this.cartHtmlPath, ejsDefaultData);
    });
  }

  private getCartProductsById() {
    this.apiRouter.get('/:id/productos', async (req, res) => {
      const cartId = req.params.id;
      const cart = await cartsDao.getById(cartId);

      if (!cart)
        return res.status(404).send(`404: Cart with ID:${cartId} not found`);
      res.status(200).json(cart.products);
    });
  }

  private postCart() {
    this.apiRouter.post('/', async (req, res) => {
      const newCartId = await cartsDao.save();

      if (newCartId == null)
        return res.status(400).send('400: Error while saving cart');
      res.status(201).send(`201: Cart N°${newCartId} created succesfully`);
    });
  }

  private deleteCartById() {
    this.apiRouter.delete('/:id', async (req, res) => {
      const cartId = req.params.id;
      const success = await cartsDao.deleteById(cartId);

      if (success == null)
        return res.status(400).send('400: Error while deleting cart');
      res.status(200).send(`200: Cart N°${cartId} deleted succesfully`);
    });
  }

  /** Sample POST body: { "id": 1 } */
  private postCartProduct() {
    this.apiRouter.post('/:id/productos', async (req, res) => {
      const cartId = req.params.id;
      const productId = req.body.id;
      const success = cartsDao.addProductById(cartId, productId);

      if (success == null)
        return res.status(400).send('400: Error while saving cart');
      res.status(201).send('201: Product added succesfully');
    });
  }

  private deleteCartProductById() {
    this.apiRouter.delete('/:cartId/productos/:productId', async (req, res) => {
      const cartId = req.params.cartId;
      const productId = req.params.productId;
      const success = await cartsDao.removeProductById(cartId, productId);

      if (success == null)
        return res.status(400).send('400: Error while saving cart');
      res.status(200).send('200: CartProduct deleted succesfully');
    });
  }
}
