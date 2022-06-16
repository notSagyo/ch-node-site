import * as express from 'express';
import Cart from './cart';
import CartProduct from './cart-product';
import Container from '../container-fs';
import { productsTable } from '../product/product';

export default class CartRouter {
  router = express.Router();
  apiRouter = express.Router();
  productsTable = productsTable;
  cartContainer: Container<Cart>;
  cartHtmlPath: string;

  constructor(
    container: Container<Cart>,
    cartHtmlPath: string) {
    this.cartContainer = container;
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
      res.render(this.cartHtmlPath);
    });
  }

  private getCartProductsById() {
    this.apiRouter.get('/:id/productos', async (req, res) => {
      const cartId = parseInt(req.params.id);
      if (isNaN(cartId))
        return res.status(400).send('400: ID must be an integer number');

      const cart = await this.cartContainer.getbyId(cartId);
      if (!cart)
        return res.status(404).send(`404: Cart with ID:${cartId} not found`);

      res.status(200).json(cart.products);
    });
  }

  private postCart() {
    this.apiRouter.post('/', async (req, res) => {
      const newCartId = await this.cartContainer.save(new Cart());

      if (newCartId == null)
        return res.status(400).send('400: Error while saving cart');
      res.status(201).send(`201: Cart N°${newCartId} created succesfully`);
    });
  }

  private deleteCartById() {
    this.apiRouter.delete('/:id', async (req, res) => {
      const cartId = parseInt(req.params.id);
      if (isNaN(cartId))
        return res.status(400).send('400: ID must be an integer number');

      const success = await this.cartContainer.deleteById(cartId);
      if (success == null)
        return res.status(400).send('400: Error while deleting cart');
      res.status(200).send(`200: Cart N°${cartId} deleted succesfully`);
    });
  }

  // Sample POST body: { "id": 1 }
  private postCartProduct() {
    this.apiRouter.post('/:id/productos', async (req, res) => {
      const cartId = parseInt(req.params.id);
      const productId = parseInt(req.body.id);

      if (isNaN(cartId) || isNaN(productId))
        return res.status(400).send('400: ID must be an integer number');

      // Get Product from product container
      const product = (await this.productsTable.selectWhere('*', ['id', '=', productId]))[0];
      if (!product)
        return res.status(404).send(`404: Product with ID:${productId} not found`);

      // Create a CartProduct from Product
      const cartProduct = CartProduct.parseProduct(product);
      const cart = await this.cartContainer.getbyId(cartId);

      if (!cart)
        return res.status(404).send(`404: Cart with ID:${cartId} not found`);
      if (!cartProduct)
        return res.status(400).send('400: Error while creating product');

      // Add product to cart
      Cart.addProduct(cart, cartProduct);
      const success = await this.cartContainer.updateById(cart.id, cart);

      if (success == null)
        return res.status(400).send('400: Error while saving cart');
      res.status(201).send('201: Product added succesfully');
    });
  }

  private deleteCartProductById() {
    this.apiRouter.delete('/:cartId/productos/:productId', async (req, res) => {
      const cartId = parseInt(req.params.cartId);
      const productId = parseInt(req.params.productId);

      if (isNaN(cartId) || isNaN(productId))
        return res.status(400).send('400: ID must be an integer number');

      // Find cart
      const cart = await this.cartContainer.getbyId(cartId);
      if (cart == null)
        return res.status(404).send(`404: Cart with ID:${cartId} not found`);

      // Delete product from cart
      Cart.deleteProduct(cart, productId);
      const success = await this.cartContainer.updateById(cart.id, cart);

      if (success == null)
        return res.status(400).send('400: Error while saving cart');
      res.status(200).send('200: CartProduct deleted succesfully');
    });
  }
}
