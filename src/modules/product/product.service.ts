import { ProductDto, ProductDtoOptional } from '../../types/dtos';
import { IProductService } from '../../types/services';
import Product, { parseProduct } from './product';
import ProductDao from './product.dao';

class ProductService implements IProductService {
  async createProduct(productDto: ProductDtoOptional): Promise<Product> {
    const prod = Product.fromDto(productDto);
    const success = await ProductDao.dao.save(prod);
    if (!success) throw new Error('Product service: error saving productDto');
    return prod;
  }

  async getAllProducts(): Promise<Product[]> {
    return await ProductDao.dao.getAll();
  }

  async getProductById(id: string): Promise<Product | null> {
    return await ProductDao.dao.getById(id);
  }

  async deleteProductById(cartId: string): Promise<boolean> {
    return await ProductDao.dao.deleteById(cartId);
  }

  async deleteAllProducts(): Promise<boolean> {
    return await ProductDao.dao.deleteAll();
  }

  async updateProductById(
    productId: string,
    data: Partial<ProductDto>
  ): Promise<boolean> {
    let success = false;

    const exists = (await this.getProductById(productId)) != null;
    if (exists) success = await ProductDao.dao.updateById(productId, data);
    else {
      const parsedProd = parseProduct(data);
      if (parsedProd)
        success = await ProductDao.dao.save(Product.fromDto(parsedProd));
    }

    return success;
  }
}

const productService = new ProductService();

export default productService;
