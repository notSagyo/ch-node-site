import Container from '../containers/container-firebase';
import { arrayRemove, arrayUnion, where } from '@firebase/firestore';
import { iCart, iCartProduct } from '../types/models';
import { iDao } from '../types/daos';
import { parseCart } from '../utils/parsers';

export default class CartsDao implements iDao<iCart> {
  container = new Container<iCart>('carts');

  async save(cart: Partial<iCart>) {
    const parsedCart = parseCart(cart) as iCart;
    return await this.container.insert(parsedCart);
  }

  async getById(id: string) {
    const res = await this.container.find(where('id', '==', id));
    const product = res ? res[0] : null;
    return product;
  }

  async getAll() {
    return await this.container.find('*') || [];
  }

  async updateById(id: string, data: Partial<iCart>) {
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
    const cartProd: iCartProduct = {
      id: productId,
      quantity: quantity || 1,
      code: '',
      timestamp: Date.now(),
    };

    try {
      await this.container.update(where('id', '==', cartId), { products: arrayUnion(cartProd) });
      success = true;
    } catch (error) {
      console.log(error);
    }
    return success;
  }

  async removeProductById(cartId: string, productId: string) {
    let success = false;
    try {
      this.container.update(
        where('id', '==', cartId),
        { products: arrayRemove(where('id', '==', productId)) }
      );
      success = true;
    } catch (error) {
      console.log(error);
    }
    return success;
  }
}

export const cartsDao = new CartsDao();
