import { maridadbOptions } from '../../config/mariadb';
import Container from '../../containers/container-knex';
import { iCartDao } from '../../types/daos';
import { iCart } from '../../types/models';
import { logger } from '../../utils/logger';
import { parseCart, parseCartProduct } from '../../utils/parsers';

export default class CartsDao implements iCartDao {
  static dao = new CartsDao();
  container = new Container<iCart>(
    maridadbOptions.connection.database,
    'carts',
    maridadbOptions
  );

  constructor() {
    return CartsDao.dao;
  }

  save(cart?: iCart) {
    const parsedCart = parseCart(cart) as iCart;
    const success = this.container.insert(parsedCart);
    return success;
  }

  async getById(id: string) {
    const result = await this.container.find({ id });
    const cart = result ? result[0] : null;
    return cart;
  }

  async getAll() {
    return (await this.container.find({})) || [];
  }

  async updateById(id: string, data: Partial<iCart>) {
    return await this.container.update({ id }, data);
  }

  async deleteById(id: string) {
    return await this.container.delete({ id });
  }

  async deleteAll() {
    return await this.container.delete({});
  }

  // Product methods =========================================================//
  async addProductById(cartId: string, productId: string, quantity?: number) {
    const parsedProd = parseCartProduct({ id: productId, quantity });
    const cart = await this.getById(cartId);
    let success = false;

    if (parsedProd == null || cart == null) return success;

    cart.products.push(parsedProd);
    try {
      await this.container.update({ id: cartId }, { products: cart.products });
    } catch (error) {
      logger.error(error);
    }
    return success;
  }

  async removeProductById(cartId: string, productId: string) {
    const cart = await this.getById(cartId);
    let success = false;

    if (cart == null) return success;

    cart.products = cart.products.filter((p) => p.id !== productId);
    try {
      await this.container.update({ id: cartId }, { products: cart.products });
    } catch (error) {
      logger.error(error);
    }
    return success;
  }
}
