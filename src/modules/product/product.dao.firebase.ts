import { where } from '@firebase/firestore';
import Container from '../../containers/container-firebase';
import { IDao } from '../../types/daos';
import { ProductDto } from '../../types/dtos';
import Product from './product';

export default class ProductDao implements IDao<Product> {
  static dao = new ProductDao();
  container = new Container<ProductDto>('products');

  constructor() {
    return ProductDao.dao;
  }

  async save(product: Product) {
    const dto = product.toDto();
    return await this.container.insert(dto);
  }

  async getById(id: string) {
    const res = await this.container.find(where('id', '==', id));
    const product = res[0] ? Product.fromDto(res[0]) : null;
    return product;
  }

  async getAll() {
    const productsDto = (await this.container.find('*')) || [];
    const products = productsDto.map((prod) => Product.fromDto(prod));
    return products;
  }

  async updateById(id: string, data: Partial<ProductDto>) {
    return await this.container.update(where('id', '==', id), data);
  }

  async deleteById(id: string) {
    return await this.container.delete(where('id', '==', id));
  }

  async deleteAll() {
    return await this.container.delete('*');
  }
}
