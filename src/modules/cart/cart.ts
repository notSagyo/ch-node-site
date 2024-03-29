import { validate } from 'uuid';
import { CartDto, CartDtoPayload, CartProductDto } from '../../types/dtos';
import { IParser } from '../../types/types';
import { logger } from '../../utils/logger';

export default class Cart implements CartDto {
  products: CartProductDto[];
  timestamp: number;
  id: string;

  constructor(idV4: string, products: CartProductDto[], timestamp: number) {
    this.products = products;
    this.timestamp = timestamp;
    this.id = idV4;
  }

  static fromDto(dto: CartDtoPayload): Cart {
    const parsedCart = parseCart(dto);
    if (parsedCart == null) throw new Error('Cart: error parsing cart');
    return new Cart(parsedCart.id, parsedCart.products, parsedCart.timestamp);
  }

  toDto(): CartDto {
    const { id, products, timestamp } = this;
    return { id, products, timestamp };
  }
}

export const parseCart: IParser<CartDto> = (cart) => {
  if (cart == null) return null;

  let products: CartProductDto[] = [];
  let timestamp = Date.now();

  const isValidId = typeof cart?.id === 'string' && validate(cart.id);
  const isValidTimestamp =
    typeof cart?.timestamp === 'number' && !isNaN(cart.timestamp);
  const isValidProducts =
    Array.isArray(cart?.products) &&
    cart.products.length > 0 &&
    cart.products.every((prod) => parseCartProduct(prod) != null);

  if (!isValidId) {
    logger.error(`parseCart: ID ${cart.id} is not a valid ID`);
    return null;
  }
  isValidProducts && (products = cart.products as CartProductDto[]);
  isValidTimestamp && (timestamp = cart.timestamp as number);

  return { id: cart.id as string, timestamp, products };
};

export const parseCartProduct: IParser<CartProductDto> = (prod) => {
  const isValidCode = typeof prod?.code === 'string' && prod.code.length > 0;
  const isValidId = typeof prod?.id === 'string' && validate(prod.id);
  const isValidTimestamp =
    typeof prod?.timestamp === 'number' && prod.timestamp > 0;
  const isValidQuantity =
    typeof prod?.quantity === 'number' && prod.quantity > 0;

  if (!isValidId) return null;

  const quantity = isValidQuantity ? (prod.quantity as number) : 1;
  const timestamp = isValidTimestamp ? (prod.timestamp as number) : Date.now();
  const code = isValidCode ? (prod.code as string) : '-1';
  const id = prod.id as string;

  return { id, code, quantity, timestamp };
};
