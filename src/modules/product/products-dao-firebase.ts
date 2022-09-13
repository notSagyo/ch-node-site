import { where } from '@firebase/firestore';
import { v4 } from 'uuid';
import Container from '../../containers/container-firebase';
import { iDao } from '../../types/daos';
import { iProduct } from '../../types/models';

export default class ProductsDao implements iDao<iProduct> {
  static dao = new ProductsDao();
  container = new Container<iProduct>('products');

  constructor() {
    return ProductsDao.dao;
  }

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
    return (await this.container.find('*')) || [];
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
