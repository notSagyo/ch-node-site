import * as express from 'express';
import { cartsDao } from '../daos/carts-dao-mongo';

export default class CartRouter {
  cartHtmlPath: string;
  router = express.Router();
  apiRouter = express.Router();

  constructor(cartHtmlPath: string) {
    this.cartHtmlPath = cartHtmlPath;
    this.initRoutes();
  }

  initRoutes() {
    // Router
    this.getCartPage();

    // API Router
    this.postCart();
    this.getCartProducts();
    this.postCartProduct();
    this.deleteCart();
    this.deleteCartProductById();
  }

  private getCartPage() {
    this.router.get('/', async (req, res) => {
      res.render(this.cartHtmlPath);
    });
  }

  private postCart() {
    this.apiRouter.post('/', async (req, res) => {
      const success = await cartsDao.save();

      if (success == false)
        return res.status(400).send('400: Error while saving cart');
      res.status(201).send('201: Cart created succesfully');
    });
  }

  private getCartProducts() {
    this.apiRouter.get('/:id/productos', async (req, res) => {
      const cartId = req.params.id;
      const cart = await cartsDao.getById(cartId);

      if (cart == null)
        return res.status(404).send(`404: Cart with ID:${cartId} not found`);
      res.status(200).json(cart.products);
    });
  }

  private deleteCart() {
    this.apiRouter.delete('/:id', async (req, res) => {
      const cartId = req.params.id;
      const success = await cartsDao.deleteById(cartId);

      if (success == false)
        return res.status(400).send('400: Error while deleting cart');
      res.status(200).send(`200: Cart N°${cartId} deleted succesfully`);
    });
  }

  /** Sample POST body: { "id": 1 } */
  private postCartProduct() {
    this.apiRouter.post('/:id/productos', async (req, res) => {
      const cartId = req.params.id;
      const productId = req.body.id;
      const success = await cartsDao.addProductById(cartId, productId);

      if (success == false)
        return res.status(400).send('400: Error while saving product in cart');
      res.status(201).send('201: Product added succesfully');
    });
  }

  private deleteCartProductById() {
    this.apiRouter.delete('/:cartId/productos', async (req, res) => {
      const cartId = req.params.cartId;
      const productId = req.body.id;
      const success = await cartsDao.removeProductById(cartId, productId);

      if (success == false)
        return res.status(400).send('400: Error while deleting product from cart');
      res.status(200).send('200: CartProduct deleted succesfully');
    });
  }
}
