import Container from '../../containers/container-mongo';
import { IDao } from '../../types/daos';
import { ProductDto } from '../../types/dtos';
import { parseProduct } from '../../utils/parsers';
import { productsModel } from './product-model';

export default class ProductsDao implements IDao<ProductDto> {
  static dao = new ProductsDao();
  container = new Container(productsModel);

  constructor() {
    return ProductsDao.dao;
  }

  async save(product: ProductDto) {
    const parsedProd = parseProduct(product);
    let success = false;
    if (parsedProd != null) success = await this.container.insert(parsedProd);
    return success;
  }

  async getById(id: string) {
    const res = await this.container.find({ id });
    const product = res ? res[0] : null;
    return product;
  }

  async getAll() {
    return (await this.container.find('*')) || [];
  }

  async updateById(id: string, data: Partial<ProductDto>) {
    return await this.container.update({ id }, data);
  }

  async deleteById(id: string) {
    return await this.container.delete({ id });
  }

  async deleteAll() {
    return await this.container.delete('*');
  }
}
