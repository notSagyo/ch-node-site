import { CartDtoOptional, CartProductDto } from '../../types/dtos';
import { ICartService } from '../../types/services';
import Cart from './cart';
import CartsDao from './carts-dao';

class CartService implements ICartService {
  // Cart Methods ============================================================//
  async createCart(cartDto: CartDtoOptional): Promise<Cart> {
    const cart = Cart.fromDto(cartDto);
    const success = await CartsDao.dao.save(cart);
    if (!success) throw new Error('Cart service: error saving cartDto');
    return cart;
  }

  async getCartById(id: string): Promise<Cart | null> {
    return await CartsDao.dao.getById(id);
  }

  async deleteCartById(cartId: string): Promise<boolean> {
    return await CartsDao.dao.deleteById(cartId);
  }

  async deleteAllCarts(): Promise<boolean> {
    return await CartsDao.dao.deleteAll();
  }

  // Cart Products Methods ===================================================//
  async getAllProducts(cartId: string): Promise<CartProductDto[]> {
    const cart = await CartsDao.dao.getById(cartId);
    if (!cart) throw new Error(`Cart service: error retrieving cart ${cartId}`);
    const items = cart.products;
    return items;
  }

  async addProductById(
    cartId: string,
    productId: string,
    quantity = 1
  ): Promise<boolean> {
    return await CartsDao.dao.addProductById(cartId, productId, quantity);
  }

  async removeProductById(cartId: string, productId: string): Promise<boolean> {
    return await CartsDao.dao.removeProductById(cartId, productId);
  }

  async removeAllProducts(cartId: string): Promise<boolean> {
    return await CartsDao.dao.updateById(cartId, { products: [] });
  }
}

const cartService = new CartService();

export default cartService;
