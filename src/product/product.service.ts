import { Injectable } from '@nestjs/common';
import { ProductDto } from 'src/types/dtos';
import { IProductService } from 'src/types/services';
import ProductDao from './dao/product.dao';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import Product, { parseProduct } from './entities/product.entity';

@Injectable()
export class ProductService implements IProductService {
  async createProduct(createProductDto: CreateProductDto): Promise<ProductDto> {
    const prod = Product.fromDto(createProductDto);
    const success = await ProductDao.dao.save(prod);
    if (!success) throw new Error('Product service: error saving productDto');
    return prod;
  }

  async getAllProducts() {
    return await ProductDao.dao.getAll();
  }

  async getProductById(id: string) {
    return await ProductDao.dao.getById(id);
  }

  async deleteProductById(id: string) {
    return await ProductDao.dao.deleteById(id);
  }

  async deleteAllProducts() {
    return await ProductDao.dao.deleteAll();
  }

  async updateProductById(id: string, updateProductDto: UpdateProductDto) {
    let success = false;

    const exists = (await this.getProductById(id)) != null;
    if (exists) success = await ProductDao.dao.updateById(id, updateProductDto);
    else {
      const parsedProd = parseProduct(updateProductDto);
      if (parsedProd)
        success = await ProductDao.dao.save(Product.fromDto(parsedProd));
    }

    return success;
  }
}
