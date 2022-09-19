import { CartDtoOptional, CartProductDto, ProductDto } from '../../types/dtos';
import { ICartService } from '../../types/services';
import productService from '../product/product.service';
import Cart from './cart';
import CartDao from './cart.dao';

class CartService implements ICartService {
  // Cart Methods ============================================================//
  async createCart(cartDto: CartDtoOptional): Promise<Cart> {
    const cart = Cart.fromDto(cartDto);
    const success = await CartDao.dao.save(cart);
    if (!success) throw new Error('Cart service: error saving cartDto');
    return cart;
  }

  async getAllCarts(): Promise<Cart[]> {
    return await CartDao.dao.getAll();
  }

  async getCartById(id: string): Promise<Cart | null> {
    return await CartDao.dao.getById(id);
  }

  async deleteCartById(cartId: string): Promise<boolean> {
    return await CartDao.dao.deleteById(cartId);
  }

  async deleteAllCarts(): Promise<boolean> {
    return await CartDao.dao.deleteAll();
  }

  // Cart Products Methods ===================================================//
  async getAllProducts(cartId: string): Promise<CartProductDto[]> {
    const cart = await CartDao.dao.getById(cartId);
    if (!cart) return [];
    const items = cart.products;
    return items;
  }

  async addProductById(
    cartId: string,
    productId: string,
    quantity = 1
  ): Promise<boolean> {
    return await CartDao.dao.addProductById(cartId, productId, quantity);
  }

  async removeProductById(cartId: string, productId: string): Promise<boolean> {
    return await CartDao.dao.removeProductById(cartId, productId);
  }

  async removeAllProducts(cartId: string): Promise<boolean> {
    return await CartDao.dao.updateById(cartId, { products: [] });
  }

  async cartProductsToProducts(cartProds: CartProductDto[]) {
    const promises = [];
    const products: ProductDto[] = [];

    for (let i = 0; i < cartProds.length; i++) {
      const cartProd = cartProds[i];
      promises.push(productService.getProductById(cartProd.id));
    }

    await Promise.allSettled(promises).then((results) =>
      results.forEach(
        (result) =>
          result.status === 'fulfilled' &&
          result.value &&
          products.push(result.value)
      )
    );

    return products;
  }
}

const cartService = new CartService();

export default cartService;
