import Container from '../containers/container-firebase';
import { where } from '@firebase/firestore';
import { iCart } from '../types';
import { v4 } from 'uuid';

export default class CartsDao {
  container = new Container<iCart>('carts');

  async save(cart: Partial<iCart>): Promise<boolean> {
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
}

export const cartsDao = new CartsDao();
