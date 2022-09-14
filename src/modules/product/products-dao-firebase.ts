import { where } from '@firebase/firestore';
import Container from '../../containers/container-firebase';
import { iDao } from '../../types/daos';
import { iProduct } from '../../types/models';
import { parseProduct } from '../../utils/parsers';

export default class ProductsDao implements iDao<iProduct> {
  static dao = new ProductsDao();
  container = new Container<iProduct>('products');

  constructor() {
    return ProductsDao.dao;
  }

  async save(product: iProduct) {
    const parsedProd = parseProduct(product);
    let success = false;
    if (parsedProd != null) success = await this.container.insert(parsedProd);
    return success;
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
