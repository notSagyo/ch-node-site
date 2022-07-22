import Container from '../containers/container-mongo';
import { productsModel } from '../models/product';
import { iProduct } from '../types/models';
import { iDao } from '../types/daos';
import { parseProduct } from '../utils/parsers';

export default class ProductsDao implements iDao<iProduct>{
  container = new Container(productsModel);

  async save(product: iProduct) {
    const parsedProd = parseProduct(product);
    let success = false;
    if (parsedProd != null)
      success = await this.container.insert(parsedProd);
    return success;
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
