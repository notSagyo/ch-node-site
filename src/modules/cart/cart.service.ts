import { CartDtoOptional, CartProductDto } from '../../types/dtos';
import { ICartService } from '../../types/services';
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

  getAllCarts(): Promise<Cart[]> {
    throw new Error('Method not implemented.');
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
    if (!cart) throw new Error(`Cart service: error retrieving cart ${cartId}`);
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
}

const cartService = new CartService();

export default cartService;
