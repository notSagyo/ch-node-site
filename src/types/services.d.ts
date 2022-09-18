import Cart from '../modules/cart/cart';
import { CartDtoOptional, CartProductDto } from './dtos';

export interface ICartService {
  // Cart methods
  createCart(cartDto: CartDtoOptional): Promise<Cart>;
  getCartById(id: string): Promise<Cart | null>;
  deleteCartById(cartId: string): Promise<boolean>;
  deleteAllCarts(): Promise<boolean>;
  // Product methods
  getAllProducts(cartId: string): Promise<CartProductDto[]>;
  addProductById(cartId: string, itemId: string): Promise<boolean>;
  removeProductById(cartId: string, itemId: string): Promise<boolean>;
  removeAllProducts(cartId: string): Promise<boolean>;
}
