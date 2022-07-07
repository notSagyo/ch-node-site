import Container from '../containers/container-firebase';
import { iProduct } from '../types';
import { v4 } from 'uuid';
import { where } from '@firebase/firestore';

export default class ProductsDao {
  container = new Container<iProduct>('products');

  async save(product: iProduct): Promise<boolean> {
    const prodWithId = { ...product, id: v4() };
    return await this.container.insert(prodWithId);
  }

  async getById(id: string): Promise<iProduct | null> {
    const res = await this.container.find(where('id', '==', id));
    const product = res ? res[0] : null;
    return product;
  }

  async getAll(): Promise<iProduct[]> {
    return await this.container.find('*') || [];
  }

  async updateById(id: string, data: Partial<iProduct>): Promise<boolean> {
    return await this.container.update(where('id', '==', id), data);
  }

  async deleteById(id: string): Promise<boolean> {
    return await this.container.delete(where('id', '==', id));
  }

  async deleteAll(): Promise<boolean> {
    return await this.container.delete('*');
  }
}

export const productsDao = new ProductsDao();
