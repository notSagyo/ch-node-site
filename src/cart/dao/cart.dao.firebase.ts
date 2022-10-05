import { arrayRemove, arrayUnion, where } from '@firebase/firestore';
import Container from '../../containers/container-firebase';
import { ICartDao } from '../../types/daos';
import { CartDto, CartProductDto } from '../../types/dtos';
import { logger } from '../../utils/logger';
import Cart from '../entities/cart.entity';

export default class CartDao implements ICartDao {
  static dao = new CartDao();
  container = new Container<CartDto>('carts');

  constructor() {
    return CartDao.dao;
  }

  async save(cart: Cart) {
    const dto = cart.toDto();
    const success = await this.container.insert(dto);
    return success;
  }

  async getById(id: string) {
    const res = await this.container.find(where('id', '==', id));
    const cartDto = res[0] ? Cart.fromDto(res[0]) : null;
    return cartDto;
  }

  async getAll() {
    const cartsDto = (await this.container.find('*')) || [];
    const carts = cartsDto.map((cart) => Cart.fromDto(cart));
    return carts;
  }

  async updateById(id: string, data: Partial<CartDto>) {
    return await this.container.update(where('id', '==', id), data);
  }

  async deleteById(id: string) {
    return await this.container.delete(where('id', '==', id));
  }

  async deleteAll() {
    return await this.container.delete('*');
  }

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
      await this.container.update(where('id', '==', cartId), {
        products: arrayUnion(cartProd),
      });
      success = true;
    } catch (error) {
      logger.error(error);
    }
    return success;
  }

  async removeProductById(cartId: string, productId: string) {
    let success = false;
    try {
      this.container.update(where('id', '==', cartId), {
        products: arrayRemove(where('id', '==', productId)),
      });
      success = true;
    } catch (error) {
      logger.error(error);
    }
    return success;
  }
}
