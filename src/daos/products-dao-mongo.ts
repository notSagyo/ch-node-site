import Container from '../containers/container-mongo';
import { productsModel } from '../models/product';
import { iDao, iProduct } from '../types';
import { v4 } from 'uuid';

export default class ProductsDao implements iDao<iProduct>{
  container = new Container(productsModel);

  async save(product: iProduct): Promise<boolean> {
    const prodWithId = { ...product, id: v4() };
    return await this.container.insert(prodWithId);
  }

  async getById(id: string): Promise<iProduct | null> {
    const res = await this.container.find({ id });
    const product = res ? res[0] : null;
    return product;
  }

  async getAll(): Promise<iProduct[]> {
    return await this.container.find('*') || [];
  }

  async updateById(id: string, data: Partial<iProduct>): Promise<boolean> {
    return await this.container.update({ id }, data);
  }

  async deleteById(id: string): Promise<boolean> {
    return await this.container.delete({ id });
  }

  async deleteAll(): Promise<boolean> {
    return await this.container.delete('*');
  }
}

export const productsDao = new ProductsDao();
