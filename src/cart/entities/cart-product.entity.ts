import { validate } from 'uuid';
import { CartProductDto } from '../../types/dtos';
import { IParser } from '../../types/types';
import { CreateCartProductDto } from '../dto/create-cart-product.dto';

export default class CartProduct implements CartProductDto {
  id: string;
  code: string;
  quantity: number;
  timestamp: number;

  constructor(idV4: string, quantity: number, code: string, timestamp: number) {
    this.id = idV4;
    this.code = code;
    this.quantity = quantity;
    this.timestamp = timestamp;
  }

  static fromDto(dto: CreateCartProductDto): CartProduct {
    const parsedCart = parseCartProduct(dto);
    if (parsedCart == null) throw new Error('Cart: error parsing cart');
    return new CartProduct(
      parsedCart.id,
      parsedCart.quantity,
      parsedCart.code,
      parsedCart.timestamp,
    );
  }

  toDto(): CartProductDto {
    const { id, quantity, code, timestamp } = this;
    return { id, quantity, code, timestamp };
  }
}

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
