import Container from '../../containers/container-mongo';
import { ICartDao } from '../../types/daos';
import { CartDto, CartProductDto } from '../../types/dtos';
import { logger } from '../../utils/logger';
import Cart from './cart';
import { cartModel } from './cart.model';

export default class CartDao implements ICartDao {
  static dao = new CartDao();
  container = new Container(cartModel);

  constructor() {
    return CartDao.dao;
  }

  async save(cart: Cart) {
    const dto = cart.toDto();
    return await this.container.insert(dto);
  }

  async getById(id: string) {
    const res = await this.container.find({ id });
    const cartDto = res[0] ? Cart.fromDto(res[0]) : null;
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

  // TODO: move to service methods, use updateById instead of container methods
  // Product methods =========================================================//
  async addProductById(cartId: string, productId: string, quantity?: number) {
    let success = false;
    const cartProd: CartProductDto = {
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
