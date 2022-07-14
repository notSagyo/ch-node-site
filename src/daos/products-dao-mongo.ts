import Container from '../containers/container-mongo';
import { productsModel } from '../models/product';
import { iProduct } from '../types/models';
import { iDao } from '../types/daos';
import { v4 } from 'uuid';

export default class ProductsDao implements iDao<iProduct>{
  container = new Container(productsModel);

  async save(product: iProduct) {
    const prodWithId = { ...product, id: v4() };
    return await this.container.insert(prodWithId);
  }

  async getById(id: string) {
    const res = await this.container.find({ id });
    const product = res ? res[0] : null;
    return product;
  }

  async getAll() {
    return await this.container.find('*') || [];
  }

  async updateById(id: string, data: Partial<iProduct>) {
    return await this.container.update({ id }, data);
  }

  async deleteById(id: string) {
    return await this.container.delete({ id });
  }

  async deleteAll() {
    return await this.container.delete('*');
  }
}

export const productsDao = new ProductsDao();
