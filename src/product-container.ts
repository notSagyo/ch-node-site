import { Container } from './container';
import { Product } from './product';

export default class ProductContainer extends Container<Product> {
  constructor(filePath: string) {
    super(filePath);
  }

  async save(prod: Product) {
    try {
      const newProd = Product.parseProduct(prod as unknown as Record<string, unknown>);
      if (!newProd)
        throw new Error('Error parsing product, malformed body');
      return await super.save(newProd);
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
