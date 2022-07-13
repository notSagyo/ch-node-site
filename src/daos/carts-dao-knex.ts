import Container from '../containers/container-knex';
import { maridadbOptions } from '../settings/mariadb';
import { iCart, iCartDao } from '../types';
import { parseCart, parseCartProduct } from '../utils/parsers';

export default class CartsDao implements iCartDao {
  container = new Container<iCart>(maridadbOptions.connection.database, 'carts', maridadbOptions);

  save(cart?: iCart): Promise<boolean> {
    const parsedCart = parseCart(cart) as iCart;
    const success = this.container.insert(parsedCart);
    return success;
  }

  async getById(id: string): Promise<iCart | null> {
    const result = await this.container.find({ id });
    const cart = result ? result[0] : null;
    return cart;
  }

  async getAll(): Promise<iCart[]> {
    return await this.container.find({}) || [];
  }

  async updateById(id: string, data: Partial<iCart>): Promise<boolean> {
    return await this.container.update({ id }, data);
  }

  async deleteById(id: string): Promise<boolean> {
    return await this.container.delete({ id });
  }

  async deleteAll(): Promise<boolean> {
    return await this.container.delete({});
  }

  async addProductById(cartId: string, productId: string, quantity?: number) {
    const parsedProd = parseCartProduct({ id: productId, quantity });
    const cart = await this.getById(cartId);
    let success = false;

    if (parsedProd == null || cart == null)
      return success;

    cart.products.push(parsedProd);
    try {
      await this.container.update({ id: cartId }, { products: cart.products });
    } catch (error) {
      console.log(error);
    }
    return success;
  }

  async removeProductById(cartId: string, productId: string) {
    const cart = await this.getById(cartId);
    let success = false;

    if (cart == null)
      return success;

    cart.products = cart.products.filter(p => p.id !== productId);
    try {
      await this.container.update({ id: cartId }, { products: cart.products });
    } catch (error) {
      console.log(error);
    }
    return success;
  }
}

export const cartsDao = new CartsDao();