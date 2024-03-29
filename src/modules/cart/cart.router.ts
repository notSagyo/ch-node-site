import express from 'express';
import { ejsDefaultData } from '../../config/ejs';
import { authn } from '../../middlewares/auth';
import { ProductDto } from '../../types/dtos';
import { IRouter } from '../../types/types';
import cartController from './cart.controller';
import { gqlMiddleware } from './cart.resolver';
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
    this.graphql();
    this.postCart();
    this.getCartProducts();
    this.postCartProduct();
    this.deleteCart();
    this.deleteCartProductById();
  }

  private graphql() {
    this.apiRouter.all('/graphql', gqlMiddleware);
  }

  private getCartPage() {
    this.router.get('/', async (req, res) => {
      const userId = req.user?.id;
      const cartProds = userId ? await cartService.getAllProducts(userId) : [];
      let prods: ProductDto[] = [];

      if (cartProds.length > 0)
        prods = await cartService.cartProductsToProducts(cartProds);

      res.render(this.cartHtmlPath, {
        ...ejsDefaultData,
        cartProducts: prods,
      });
    });
  }

  private postCart() {
    this.apiRouter.post('/', authn, async (req, res) => {
      cartController.postCart(req, res);
    });
  }

  private getCartProducts() {
    this.apiRouter.get('/:id/productos', async (req, res) => {
      cartController.getCartProducts(req, res);
    });
  }

  private deleteCart() {
    this.apiRouter.delete('/:id', async (req, res) => {
      cartController.deleteCart(req, res);
    });
  }

  /**
   * Sample POST body: { "id": 1 }
   *
   * cartId = 0 uses the current user's ID as cartId
   */
  private postCartProduct() {
    this.apiRouter.post('/:cartId/productos', authn, async (req, res) => {
      cartController.postCartProduct(req, res);
    });
  }

  private deleteCartProductById() {
    this.apiRouter.delete('/:cartId/productos', async (req, res) => {
      cartController.deleteCartProductById(req, res);
    });
  }
}
