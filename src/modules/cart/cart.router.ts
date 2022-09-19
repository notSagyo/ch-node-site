import express from 'express';
import { ejsDefaultData } from '../../config/ejs';
import { authn } from '../../middlewares/auth';
import { ProductDto } from '../../types/dtos';
import { IRouter } from '../../types/types';
import { logger } from '../../utils/logger';
import { cartProductsToProducts } from '../../utils/utils';
import cartService from './cart.service';

export default class CartRouter implements IRouter {
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
      const cartProds = userId ? await cartService.getAllProducts(userId) : [];
      let prods: ProductDto[] = [];

      if (cartProds.length > 0) prods = await cartProductsToProducts(cartProds);

      res.render(this.cartHtmlPath, {
        ...ejsDefaultData,
        cartProducts: prods,
      });
    });
  }

  private postCart() {
    this.apiRouter.post('/', authn, async (req, res) => {
      const userId = req.user?.id;
      const success = userId
        ? await cartService.createCart({ id: userId })
        : false;

      if (success == false)
        return res.status(400).send('400: Error while saving cart');
      res.status(201).send('201: Cart created succesfully');
    });
  }

  private getCartProducts() {
    this.apiRouter.get('/:id/productos', async (req, res) => {
      const cartId = req.params.id;
      const products = await cartService.getAllProducts(cartId);
      res.status(200).json(products);
    });
  }

  private deleteCart() {
    this.apiRouter.delete('/:id', async (req, res) => {
      const cartId = req.params.id;
      const success = await cartService.deleteCartById(cartId);

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
        const foundCart = await cartService.getCartById(cartId);
        if (foundCart == null) {
          logger.warn('Cart not found, creating...');
          await cartService.createCart({ id: cartId });
        }
      }

      // Try add prodduct to cart
      const success = cartId
        ? await cartService.addProductById(cartId, productId)
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
      const success = await cartService.removeProductById(cartId, productId);

      if (success == false)
        return res
          .status(400)
          .send('400: Error while deleting product from cart');
      res.status(200).send('200: CartProduct deleted succesfully');
    });
  }
}
