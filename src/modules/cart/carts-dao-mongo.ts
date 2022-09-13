import Container from '../../containers/container-mongo';
import { iCartDao } from '../../types/daos';
import { iCart, iCartProduct } from '../../types/models';
import { logger } from '../../utils/logger';
import { parseCart } from '../../utils/parsers';
import { cartModel } from './cart-model';

export default class CartsDao implements iCartDao {
  static dao = new CartsDao();
  container = new Container(cartModel);

  constructor() {
    return CartsDao.dao;
  }

  async save(cart?: Partial<iCart>) {
    const parsed = parseCart(cart);
    const success = parsed ? await this.container.insert(parsed) : false;
    return success;
  }

  async getById(id: string) {
    const res = await this.container.find({ id });
    const product = res ? res[0] : null;
    return product;
  }

  async getAll(): Promise<iCart[]> {
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
    let success = false;
    const cartProd: iCartProduct = {
      id: productId,
      quantity: quantity || 1,
      code: '',
      timestamp: Date.now(),
    };

    try {
      await this.container.update(
        { id: cartId },
        { $push: { products: cartProd } }
      );
      success = true;
    } catch (error) {
      logger.error(error);
    }
    return success;
  }

  async removeProductById(cartId: string, productId: string) {
    let success = false;
    try {
      await this.container.update(
        { id: cartId },
        { $pull: { products: { id: productId } } }
      );
      success = true;
    } catch (error) {
      logger.error(error);
    }
    return success;
  }
}
