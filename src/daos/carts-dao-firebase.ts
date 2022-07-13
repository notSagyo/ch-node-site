import Container from '../containers/container-firebase';
import { arrayRemove, arrayUnion, where } from '@firebase/firestore';
import { iCart, iCartDao, iCartProduct } from '../types';
import { v4 } from 'uuid';

export default class CartsDao implements iCartDao {
  container = new Container<iCart>('carts');

  async save(cart?: Partial<iCart>): Promise<boolean> {
    const cartWithId: iCart = {
      id: v4() ,
      products: cart?.products || [],
      timestamp: cart?.timestamp || Date.now()
    };
    return await this.container.insert(cartWithId);
  }

  async getById(id: string): Promise<iCart | null> {
    const res = await this.container.find(where('id', '==', id));
    const product = res ? res[0] : null;
    return product;
  }

  async getAll(): Promise<iCart[]> {
    return await this.container.find('*') || [];
  }

  async updateById(id: string, data: Partial<iCart>): Promise<boolean> {
    return await this.container.update(where('id', '==', id), data);
  }

  async deleteById(id: string): Promise<boolean> {
    return await this.container.delete(where('id', '==', id));
  }

  async deleteAll(): Promise<boolean> {
    return await this.container.delete('*');
  }

  async addProductById(cartId: string, productId: string, quantity?: number): Promise<boolean> {
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

  async removeProductById(cartId: string, productId: string): Promise<boolean> {
    let success = false;
    try {
      this.container.update(where('id', '==', cartId), {
        products: arrayRemove(where('id', '==', productId))
      });
      success = true;
    } catch (error) {
      console.log(error);
    }
    return success;
  }
}

export const cartsDao = new CartsDao();
