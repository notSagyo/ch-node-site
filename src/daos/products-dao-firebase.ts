import Container from '../containers/container-firebase';
import { iProduct } from '../types/models';
import { iDao } from '../types/daos';
import { v4 } from 'uuid';
import { where } from '@firebase/firestore';

export default class ProductsDao implements iDao<iProduct> {
  container = new Container<iProduct>('products');

  async save(product: iProduct) {
    const prodWithId = { ...product, id: v4() };
    return await this.container.insert(prodWithId);
  }

  async getById(id: string) {
    const res = await this.container.find(where('id', '==', id));
    const product = res ? res[0] : null;
    return product;
  }

  async getAll() {
    return await this.container.find('*') || [];
  }

  async updateById(id: string, data: Partial<iProduct>) {
    return await this.container.update(where('id', '==', id), data);
  }

  async deleteById(id: string) {
    return await this.container.delete(where('id', '==', id));
  }

  async deleteAll() {
    return await this.container.delete('*');
  }
}

export const productsDao = new ProductsDao();
