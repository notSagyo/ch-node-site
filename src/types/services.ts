import Cart from '../modules/cart/cart';
import Message from '../modules/chat/message';
import Product from '../modules/product/product';
import User from '../modules/user/user';
import {
  CartDtoPayload,
  CartProductDto,
  MessageDto,
  MessageDtoPayload,
  ProductDto,
  ProductDtoPayload,
  UserDto,
  UserDtoPayload,
} from './dtos';

export interface ICartService {
  // Cart methods
  createCart(cartDto: CartDtoPayload): Promise<Cart>;
  getAllCarts(): Promise<Cart[]>;
  getCartById(id: string): Promise<Cart | null>;
  deleteCartById(cartId: string): Promise<boolean>;
  deleteAllCarts(): Promise<boolean>;
  // Product methods
  getAllProducts(cartId: string): Promise<CartProductDto[]>;
  addProductById(cartId: string, itemId: string): Promise<boolean>;
  removeProductById(cartId: string, itemId: string): Promise<boolean>;
  removeAllProducts(cartId: string): Promise<boolean>;
}

export interface IProductService {
  createProduct(productDto: ProductDtoPayload): Promise<Product>;
  getAllProducts(productId: string): Promise<Product[]>;
  getProductById(id: string): Promise<Product | null>;
  deleteProductById(productId: string): Promise<boolean>;
  deleteAllProducts(): Promise<boolean>;
  updateProductById(
    productId: string,
    data: Partial<ProductDto>
  ): Promise<boolean>;
}

export interface IChatService {
  createMessage(messageDto: MessageDtoPayload): Promise<Message>;
  getAllMessages(): Promise<Message[]>;
  getMessageById(messageId: string): Promise<Message | null>;
  deleteMessageById(messageId: string): Promise<boolean>;
  deleteAllMessages(): Promise<boolean>;
  updateMessageById(
    messageId: string,
    data: Partial<MessageDto>
  ): Promise<boolean>;
}

export interface IUserService {
  createUser(userDto: UserDtoPayload): Promise<User>;
  getAllUsers(): Promise<User[]>;
  getUserByEmail(userEmail: string): Promise<User | null>;
  getUserById(userId: string): Promise<User | null>;
  deleteUserById(userId: string): Promise<boolean>;
  deleteAllUsers(): Promise<boolean>;
  updateUserById(userId: string, data: Partial<UserDto>): Promise<boolean>;
}
