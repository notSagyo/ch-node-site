import express from 'express';
import { ejsDefaultData } from '../../config/ejs';
import { authn } from '../../middlewares/auth';
import { iProduct } from '../../types/models';
import { iRouter } from '../../types/types';
import { logger } from '../../utils/logger';
import { cartProductsToProducts } from '../../utils/utils';
import CartsDao from './carts-dao-mongo';

export default class CartRouter implements iRouter {
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
      const userId = req.user?.id;
      const cart = userId ? await CartsDao.dao.getById(userId) : null;
      let products: iProduct[] = [];

      if (cart?.products != null)
        products = await cartProductsToProducts(cart.products);

      res.render(this.cartHtmlPath, {
        ...ejsDefaultData,
        cartProducts: products,
      });
    });
  }

  private postCart() {
    this.apiRouter.post('/', authn, async (req, res) => {
      const user = req.user;
      const success = await CartsDao.dao.save(user);

      if (success == false)
        return res.status(400).send('400: Error while saving cart');
      res.status(201).send('201: Cart created succesfully');
    });
  }

  private getCartProducts() {
    this.apiRouter.get('/:id/productos', async (req, res) => {
      const cartId = req.params.id;
      const cart = await CartsDao.dao.getById(cartId);

      if (cart == null)
        return res.status(404).send(`404: Cart with ID:${cartId} not found`);
      res.status(200).json(cart.products);
    });
  }

  private deleteCart() {
    this.apiRouter.delete('/:id', async (req, res) => {
      const cartId = req.params.id;
      const success = await CartsDao.dao.deleteById(cartId);

      if (success == false)
        return res.status(400).send('400: Error while deleting cart');
      res.status(200).send(`200: Cart N°${cartId} deleted succesfully`);
    });
  }

  /**
   * Sample POST body: { "id": 1 }
   *
   * cartId = 0 uses the current user's ID as cartId
   */
  private postCartProduct() {
    this.apiRouter.post('/:cartId/productos', authn, async (req, res) => {
      const productId = req.body.id;
      const cartId =
        req.params.cartId == '0' ? req.user?.id : req.params.cartId;

      // If cart doesn't exists create it
      if (cartId) {
        const foundCart = await CartsDao.dao.getById(cartId);
        if (foundCart == null) {
          logger.warn('Cart not found, creating...');
          await CartsDao.dao.save({ id: cartId });
        }
      }

      // Try add prodduct to cart
      const success = cartId
        ? await CartsDao.dao.addProductById(cartId, productId)
        : false;

      if (success == false) {
        const msg = '400: Error while saving product in cart';
        logger.error(msg);
        return res.status(400).send(msg);
      }
      res.status(201).send('201: Product added succesfully');
    });
  }

  private deleteCartProductById() {
    this.apiRouter.delete('/:cartId/productos', async (req, res) => {
      const cartId = req.params.cartId;
      const productId = req.body.id;
      const success = await CartsDao.dao.removeProductById(cartId, productId);

      if (success == false)
        return res
          .status(400)
          .send('400: Error while deleting product from cart');
      res.status(200).send('200: CartProduct deleted succesfully');
    });
  }
}
