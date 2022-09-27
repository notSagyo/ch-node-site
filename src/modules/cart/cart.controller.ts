import express from 'express';
import { logger } from '../../utils/logger';
import cartService from './cart.service';

export class CartController {
  async postCart(req: express.Request, res: express.Response) {
    const userId = req.user?.id;
    const success = userId
      ? await cartService.createCart({ id: userId })
      : false;

    if (success == false)
      return res.status(400).send('400: Error while saving cart');
    res.status(201).send('201: Cart created succesfully');
  }

  async getCartProducts(req: express.Request, res: express.Response) {
    const cartId = req.params.id;
    const products = await cartService.getAllProducts(cartId);
    res.status(200).json(products);
  }

  async deleteCart(req: express.Request, res: express.Response) {
    const cartId = req.params.id;
    const success = await cartService.deleteCartById(cartId);

    if (success == false)
      return res.status(400).send('400: Error while deleting cart');
    res.status(200).send(`200: Cart N°${cartId} deleted succesfully`);
  }

  /**
   * Sample POST body: { "id": 1 }
   *
   * cartId = 0 uses the current user's ID as cartId
   */
  async postCartProduct(req: express.Request, res: express.Response) {
    const productId = req.body.id;
    const cartId = req.params.cartId == '0' ? req.user?.id : req.params.cartId;

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
  }

  async deleteCartProductById(req: express.Request, res: express.Response) {
    const cartId = req.params.cartId;
    const productId = req.body.id;
    const success = await cartService.removeProductById(cartId, productId);

    if (success == false)
      return res
        .status(400)
        .send('400: Error while deleting product from cart');
    res.status(200).send('200: CartProduct deleted succesfully');
  }
}

const cartController = new CartController();
export default cartController;
