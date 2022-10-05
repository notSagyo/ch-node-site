import Container from '../../containers/container-mongo';
import { IDao } from '../../types/daos';
import { ProductDto } from '../../types/dtos';
import Product from '../entities/product.entity';
import { productsModel } from '../models/product.model';

export default class ProductDao implements IDao<Product> {
  static dao = new ProductDao();
  container = new Container(productsModel);

  constructor() {
    return ProductDao.dao;
  }

  async save(product: Product) {
    const dto = product.toDto();
    return await this.container.insert(dto);
  }

  async getById(id: string): Promise<Product | null> {
    const res = await this.container.find({ id });
    const product = res[0] ? Product.fromDto(res[0]) : null;
    return product;
  }

  async getAll(): Promise<Product[]> {
    const productsDto = (await this.container.find('*')) || [];
    const products = productsDto.map((prod) => Product.fromDto(prod));
    return products;
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
