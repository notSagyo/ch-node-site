import { maridadbOptions } from '../../config/mariadb';
import Container from '../../containers/container-knex';
import { ICartDao } from '../../types/daos';
import { CartDto } from '../../types/dtos';
import { logger } from '../../utils/logger';
import { parseCartProduct } from '../../utils/parsers';
import Cart from './cart';

export default class CartDao implements ICartDao {
  static dao = new CartDao();
  container = new Container<CartDto>(
    maridadbOptions.connection.database,
    'carts',
    maridadbOptions
  );

  constructor() {
    return CartDao.dao;
  }

  async save(cart: Cart) {
    const dto = cart.toDto();
    const success = await this.container.insert(dto);
    return success;
  }

  async getById(id: string) {
    const res = await this.container.find({ id });
    const cartDto = res ? Cart.fromDto(res[0]) : null;
    return cartDto;
  }

  async getAll() {
    const cartsDto = (await this.container.find({})) || [];
    const carts = cartsDto.map((cart) => Cart.fromDto(cart));
    return carts;
  }

  async updateById(id: string, data: Partial<CartDto>) {
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
